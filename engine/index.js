import defaultJSON from "./defaultJSON.js"
import Canvas from "./js/canvas.js";
import Geometry from "./js/geometry.js";
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
    //NOTE: entities are still empty, creation is not implemented
    let entities = await Scene.deserialize(json, "errorDiv", "errorMessage");

    let display = new Canvas("#main", [ 1, 1 ], [], "center", "#000000", "#FFFFFF").clear();
    let engine = new Engine(display, entities);

    //engine.scene.push(new Entity({ scale: [ 100, 100, 100 ] }, Geometry.DODECAHEDRON, { renderFaces: 1 }));

    // engine.scene.push(await new Entity({ position: [ 100, 0, 0 ], rotation: [ Math.PI / 4, 0, 0 ], scale: [ 100, 100, 100 ] }, Geometry.CUBE, { useShaders: 1, shaderPath: "rgb.js" }, [ "spin.js" ]));
    // engine.scene.push(await new Entity({ position: [ 0, 100, 0 ], rotation: [ 0, Math.PI / 4, 0 ], scale: [ 100, 100, 100 ] }, Geometry.CUBE, { useShaders: 1, shaderPath: "rgb.js" }, [ "spin.js" ]));
    // engine.scene.push(await new Entity({ position: [ 0, 0, 100 ], rotation: [ 0, 0, Math.PI / 4 ], scale: [ 100, 100, 100 ] }, Geometry.CUBE, { useShaders: 1, shaderPath: "rgb.js" }, [ "spin.js" ]));

    /*let geometry = { ...Geometry.CUBE, faces: Geometry.cube_faces_triangles }

    let geometry = { ...Geometry.CUBE, faces: Geometry.cube_faces_triangles }
    let path = "spin.js"; let args = [ [ 1, 1/3, 0 ] ];

    engine.scene.push(await new Entity({ position: [ 0, 0, 0 ], scale: [ 100, 100, 100 ] }, geometry, { shaderPath: "rgb.js" }, [ { path, args } ]));
    engine.scene.push(await new Entity({ position: [ 0, 100, 0 ], scale: [ 100, 100, 100 ] }, geometry, { shaderPath: "rgb.js" }, [ { path, args } ]));
    engine.scene.push(await new Entity({ position: [ 0, -100, 0 ], scale: [ 100, 100, 100 ] }, geometry, { shaderPath: "rgb.js" }, [ { path, args } ]));
    engine.scene.push(await new Entity({ position: [ -300, 0, 0 ], scale: [ 100, 100, 100 ] }, geometry, { shaderPath: "rgb.js" }, [ { path, args } ]));
    engine.scene.push(await new Entity({ position: [ -300, 100, 0 ], scale: [ 100, 100, 100 ] }, geometry, { shaderPath: "rgb.js" }, [ { path, args } ]));
    engine.scene.push(await new Entity({ position: [ -300, -100, 0 ], scale: [ 100, 100, 100 ] }, geometry, { shaderPath: "rgb.js" }, [ { path, args } ]));
    engine.scene.push(await new Entity({ position: [ 300, 0, 0 ], scale: [ 100, 100, 100 ] }, geometry, { shaderPath: "rgb.js" }, [ { path, args } ]));
    engine.scene.push(await new Entity({ position: [ 300, 100, 0 ], scale: [ 100, 100, 100 ] }, geometry, { shaderPath: "rgb.js" }, [ { path, args } ]));
    engine.scene.push(await new Entity({ position: [ 300, -100, 0 ], scale: [ 100, 100, 100 ] }, geometry, { shaderPath: "rgb.js" }, [ { path, args } ]));

    console.log(Scene.serialize(engine.scene));*/
    engine.loop(0);
}
