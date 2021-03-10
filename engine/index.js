import defaultJSON from "./defaultJSON.js"
import Canvas from "./js/canvas.js";
import { Engine, Scene } from "./js/engine.js";
import Entity from "./js/entity.js";
import Geometry from "./js/geometry.js";
import { _, D, T, Q } from "./js/utils.js";

const setCanvasSize = () => {
    document.getElementById("main").width = window.innerWidth;
    document.getElementById("main").height = window.innerHeight;
};

window.onload = async () => {
    let drawDebug = await new Promise((resolve) => {
        chrome.storage.local.get("showDebug", (res) => {
            if (Object.keys(res).length === 0) {
                chrome.storage.local.set({showDebug : false});
                res = false;
            }

            resolve(res.showDebug);
        });
    });

    chrome.storage.local.get("sceneData", (res) => {
        //console.log(res);

        if (Object.keys(res).length === 0) {
            ready(defaultJSON, drawDebug);
            return;
        }

        ready(res.sceneData, drawDebug);
    })

    setCanvasSize();
    window.onresize = setCanvasSize;
}

const ready = async (json, drawDebug) => {
    let entities = await Scene.deserialize(json, "errorDiv", "errorMessage");

    let display = new Canvas("#main", [ 1, 1 ], [], "center", "#000000", "#FFFFFF").clear();
    let engine = new Engine(display, entities, drawDebug ? "debugInfo" : false);
    
    engine.loop(0);
}
