import defaultJSON from "./defaultJSON.js"

window.onload = () => {
    chrome.storage.sync.get("sceneData", (res) => {
        if (Object.keys(res).length === 0) {
            ready(defaultJSON);
            return;
        }

        ready(res.sceneData);
    })

    document.getElementById("main").width = window.innerWidth;
    document.getElementById("main").height = window.innerHeight;

    window.onresize = () => {
        document.getElementById("main").width = window.innerWidth;
        document.getElementById("main").height = window.innerHeight;
    }
}

const ready = (json) => {
    console.log(json);
}