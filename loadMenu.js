const url = "https://corsproxy.io/?" + encodeURIComponent("https://www.freiraum.rest/garching/wochenkarte/");
fetch(url /*, options */)
    .then((response) => response.text())
    .then((text) => {
        const html = new DOMParser().parseFromString(text, "text/html");
        const content = document.getElementById("content");
        content.innerHTML = html.querySelector("#menuplanThisWeek table").innerHTML;
        document.getElementById("title").innerHTML = html.querySelector(".freiraumText .container-fluid.container-xxl").innerHTML;
        content.querySelector("button").style.display = "none";
        const day = 3;//new Date().getDay() - 1; // 0 is Sunday, minus 1 to index
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
    })
    .catch((error) => {
        console.warn(error);
    });
