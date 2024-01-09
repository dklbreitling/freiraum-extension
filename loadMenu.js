const LOCAL_STORAGE_KEY = "freiraum_extension_cachedMenu";
document.addEventListener("DOMContentLoaded", loadMenu);

async function loadMenu() {
    const html = new DOMParser().parseFromString(await getThisWeeksMenu(), "text/html");
    insertMenuIntoDOM(html);
    stickyTitle();
    highlightToday();
}

function stickyTitle() {
    const title = document.getElementById("title");
    title.style.position = "absolute";
    title.style.top = "0";
    title.style.left = "0";
    title.style.paddingLeft = "12px";
    const weeklyMenu = document.querySelector(".freiraumWeeklyMenu");
    weeklyMenu.style.paddingTop += title.offsetHeight + 10;
    window.addEventListener("scroll", moveTitle);
}

const moveTitle = () => {
    const title = document.getElementById("title");
    title.style.left = window.scrollX + 'px';
};

async function getThisWeeksMenu() {
    const object = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    let refresh = false;

    if (!object)
        refresh = true;
    else {
        const then = new Date(object.timestamp);
        const now = new Date();

        if (!areSameDay(then, now))
            refresh = true;
    }

    if (!refresh)
        return object.value;

    html = await fetchMenu();
    storeMenu(html);
    return html;
}

async function fetchMenu() {
    const url = "https://corsproxy.io/?" + encodeURIComponent("https://www.freiraum.rest/garching/wochenkarte/");
    const response = await fetch(url /*, options */);
    const text = await response.text();
    return text;
}

function insertMenuIntoDOM(html) {
    const content = document.getElementById("content");
    content.innerHTML = html.querySelector("#menuplanThisWeek table").innerHTML;
    document.getElementById("title").innerHTML = html.querySelector(".freiraumText .container-fluid.container-xxl").innerHTML;
    content.querySelector("button").style.display = "none";
}

function highlightToday() {
    const day = new Date().getDay() - 1; /* 0 is Sunday, minus 1 to index */
    if (day >= 0 && day < 5) {
        /* Only if today is a weekday. */
        todayEl = content.querySelectorAll(".td_day")[day];
        todayEl.classList.add("today");
        const rect = todayEl.getBoundingClientRect();
        /* Only scroll if not visible. */
        if (!(rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)))
            todayEl.scrollIntoView({ behavior: "instant", block: "end", inline: "end" });
    }
}

function storeMenu(html) { localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify({ value: html, timestamp: new Date() })); }
function areSameDay(then, now) { return then.getDate() == now.getDate() && then.getMonth() == now.getMonth() && then.getFullYear() == now.getFullYear(); }
