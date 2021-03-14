import defaultJSON from "./defaultJSON.js"
import Vector from "./js/vector.js";
import Canvas from "./js/canvas.js";
import { Engine, Scene } from "./js/engine.js";
import Entity from "./js/entity.js";
import Geometry from "./js/geometry.js";
import { _, D, T, Q, S, N } from "./js/utils.js";

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
    //let { entities, options } = await Scene.deserialize(json, "errorDiv", "errorMessage");

    let { entities, options } = await Scene.deserialize({ entities : json.entities.map(e => { return { ...e, ...{ transform: { ...e.transform, ... {
        scale: Q(0.5),
        position: Vector.scalar(e.transform.position, 1/300),
    } } } } } ), options : json.options }, "errorDiv", "errorMessage");

    let display = new Canvas("#main", [ 1, 1 ], [], "center", "#000000", "#FFFFFF").clear();
    let engine = new Engine(display, entities, drawDebug ? "debugInfo" : false, options);

    const add = async (pos, rot, rotd, dim) => {
        engine.scene.push(await new Entity({
            position: pos,
            rotation: rot,
            offset: N(0, dim),
            scale: N(0.5, dim),
        },
        { ...Geometry.HYPERCUBE(dim) }, { useShaders: 1, renderVertices: 0, shaders: {
        vertex: "rgb",
        edge: { path: "parallel", args: [ _, _, _ ] },
        face: "rgb",
    } }, [
        { path: "spin", args: [ rotd ] },
        "control"
    ]));
    }
    let i = 7;
    let axis_count = (i * (i - 1)) / 2;
    await add(N(0, i), N(0, axis_count), N(0.0, axis_count), i);

    console.log(Scene.serialize(engine.scene));

    engine.loop(0);
}
