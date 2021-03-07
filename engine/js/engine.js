// Oliver Kovacs 2021 - engine.js

import Matrix from "./matrix.js";
import Deserializer from "./deserialize.js";

export class Engine {
    constructor(display, scene) {
        this.display = display;
        this.scene = scene;

        this.ms = 0;
        this.frame_id = 0;
        this.frame_draws = 0;

        this.PROJECTION_MATRIX = Engine.ORTHOGRAPHIC_PROJECTION_MATRIX;
    }

    static ORTHOGRAPHIC_PROJECTION_MATRIX = [
        [ 1, 0 ],
        [ 0, 1 ],
        [ 0, 0 ]
    ];

    loop (ts) {
        window.requestAnimationFrame(ts => this.loop(ts));
        this.dt = (ts - this.ms);
        this.ms = ts;

        this.frame_id++;

        this.update();
        this.render();
    }

    update() {
        for (let i = 0; i < this.scene.length; i++) {
            for (let j = 0; j < this.scene[i].scripts.length; j++) {
                this.scene[i].scripts[j].update(this);
            }
        }
    }

    render() {
        this.display.clear();
        this.frame_draws = 0;

        for (let i = 0; i < this.scene.length; i++) {
            this.renderEntity(this.scene[i], i);
        }
    }

    renderEntity(entity, id) {
        
        if (!entity.renderer.render) return;

        entity.update();

        for (let i = 0; i < entity.coords.length; i++) {
            entity.points[i] = Matrix.multiply(this.PROJECTION_MATRIX, entity.coords[i])[0];
        }

        this.renderFaces(entity, id);
        this.renderEdges(entity, id);
        this.renderVertices(entity, id);
    }

    renderVertices(entity, entity_id) {
        if (!entity.renderer.renderVertices) return;
        for (let i = 0; i < entity.points.length; i++) {
            this.display.circle(entity.points[i], 3, entity.renderer.vertexShader(this, entity_id, i), "fill");
            this.frame_draws++;
        }
    }

    renderEdges(entity, entity_id) {
        if (!entity.renderer.renderEdges) return;
        for (let i = 0; i < entity.geometry.edges.length; i++) {
            let a = entity.points[entity.geometry.edges[i][0]];
            let b = entity.points[entity.geometry.edges[i][1]];
            this.display.line(a, b, entity.renderer.edgeShader(this, entity_id, i));
            this.frame_draws++;
        }
    }

    renderFaces(entity, entity_id) {
        if (!entity.renderer.renderFaces) return;
        for (let i = 0; i < entity.geometry.faces.length; i++) {
            let vertices = [];
            for (let j = 0; j < entity.geometry.faces[i].length; j++) {
                vertices[j] = entity.points[entity.geometry.faces[i][j]];
            }
            this.display.polygon(vertices, entity.renderer.faceShader(this, entity_id, i));
            this.frame_draws++;
        }
    }



    toHexColor(r, g, b) {
        return `#${this.toHex(r)}${this.toHex(g)}${this.toHex(b)}`;
    }

    toHex(int) {
        return Math.round(int).toString(16).padStart(2, "0");
    }
}

export class Scene {

    static async deserialize (json) {

    }

    static serialize(scene, spaces = 0) {
        let json = [];
        for (let i = 0; i < scene.length; i++) {
            let entity = { ...scene[i] };
            entity.coords = undefined;
            entity.points = undefined;
            json[i] = entity;
        }
        return JSON.stringify(json, null, spaces);
    }
}
