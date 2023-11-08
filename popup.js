const url = 'https://corsproxy.io/?' + encodeURIComponent('https://www.freiraum.rest/garching/wochenkarte/');
fetch(url /*, options */)
.then((response) => response.text())
.then((text) => {
    html = new DOMParser().parseFromString(text, "text/html")
    document.getElementById("content").innerHTML = html.querySelector("#menuplanThisWeek table").innerHTML;
    document.getElementById("content").querySelector("button").style.display = "none"
})
.catch((error) => {
        console.warn(error);
});