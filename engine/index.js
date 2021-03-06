import defaultJSON from "./defaultJSON.js"

window.onload = () => {
    chrome.storage.sync.get("sceneData", (res) => {
        if (Object.keys(res).length === 0) {
            ready(defaultJSON);
            return;
        }

        ready(res.sceneData);
    })


    let ctx = document.getElementById("main").getContext("2d");
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
}

const ready = (json) => {
    console.log(json);
}