const url = "https://corsproxy.io/?" + encodeURIComponent("https://www.freiraum.rest/garching/wochenkarte/");
fetch(url /*, options */)
    .then((response) => response.text())
    .then((text) => {
        const html = new DOMParser().parseFromString(text, "text/html");
        const content = document.getElementById("content");
        content.innerHTML = html.querySelector("#menuplanThisWeek table").innerHTML;
        content.querySelector("button").style.display = "none";
        const day = new Date().getDay() - 1; // 0 is Sunday, minus 1 to index
        console.log("day is " + day);
        if (day >= 0 && day < 5) {
            /* should be weekday */
            content.querySelectorAll(".td_day")[day].classList.add("today");
        }
    })
    .catch((error) => {
        console.warn(error);
    });
