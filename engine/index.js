import defaultJSON from "./defaultJSON.js"
import Canvas from "./js/canvas.js";
import { Engine, Scene } from "./js/engine.js";
import Entity from "./js/entity.js";

const setCanvasSize = () => {
    document.getElementById("main").width = window.innerWidth;
    document.getElementById("main").height = window.innerHeight;
};

window.onload = () => {
    chrome.storage.sync.get("sceneData", (res) => {
        if (Object.keys(res).length === 0) {
            ready(defaultJSON);
            return;
        }

        ready(res.sceneData);
    })

    setCanvasSize();
    window.onresize = setCanvasSize;
}

const ready = async (json) => {
    let entities = await Scene.deserialize(json, "errorDiv", "errorMessage");

    let display = new Canvas("#main", [ 1, 1 ], [], "center", "#000000", "#FFFFFF").clear();
    let engine = new Engine(display, entities, "debugInfo");

    engine.loop(0);
}
