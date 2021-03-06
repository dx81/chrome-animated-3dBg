import defaultJSON from "./defaultJSON.js"
import Canvas from "./js/canvas.js";
import Geometry from "./js/geometry.js";
import { Engine, Entity } from "./js/engine.js";

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
}

const ready = (json) => {
    let display = new Canvas("#main", "", [ 1, 1 ], [ 1200, 600 ], "center").clear("#000000");

    window.onresize = () => {
        document.getElementById("main").width = window.innerWidth;
        document.getElementById("main").height = window.innerHeight;
        display.o = [ display.canvas.width / 2, display.canvas.height / 2 ];
    }

    let engine = new Engine(display, []);

    //engine.scene.push(new Entity({ scale: [ 100, 100, 100 ] }, Geometry.DODECAHEDRON, { renderFaces: 1 }));

    engine.scene.push(new Entity({ position: [ 100, 0, 0 ], rotation: [ Math.PI / 4, 0, 0 ], scale: [ 100, 100, 100 ] }, Geometry.CUBE, { renderFaces: 1 }));
    engine.scene.push(new Entity({ position: [ 0, 100, 0 ], rotation: [ 0, Math.PI / 4, 0 ], scale: [ 100, 100, 100 ] }, Geometry.CUBE, { renderFaces: 1 }));
    engine.scene.push(new Entity({ position: [ 0, 0, 100 ], rotation: [ 0, 0, Math.PI / 4 ], scale: [ 100, 100, 100 ] }, Geometry.CUBE, { renderFaces: 1 }));
    engine.loop(0);
}