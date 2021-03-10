// Oliver Kovacs 2021 - engine.js

import Matrix from "./matrix.js";
import Deserializer from "./deserialize.js";

Math.roundn = (number, n) => {
    let x = Math.pow(10, n);
    return Math.round(x * number) / x;
}

export class Engine {
    constructor(display, scene, stats) {
        this.display = display;
        this.scene = scene;

        this.ms = 0;
        this.frame_id = 0;
        this.frame_draws = 0;

        this.stats = stats ? document.querySelector(`#${stats}`) : false;

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
        this.now = Date.now();

        this.frame_id++;

        this.update();
        this.render();
    }

    update() {
        for (let i = 0; i < this.scene.length; i++) {
            for (let j = 0; j < this.scene[i].scripts.length; j++) {
                this.scene[i].scripts[j].update(this, i, j);
            }
        }

        if (!this.stats) return;
        this.fps = 1000 / this.dt;
        this.stats.innerHTML = `fps: ${Math.roundn(this.fps, 2)} dt: ${Math.roundn(this.dt, 2)}<br/>` +
            `entities: ${this.scene.length} draws: ${this.frame_draws}<br/>` +
            `sec: ${Math.round(this.ms / 1000)} frame: ${this.frame_id}<br/>`;
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
            this.display.circle(entity.points[i], 4, entity.renderer.vertex(this, entity_id, i), "fill");
            this.frame_draws++;
        }
    }

    renderEdges(entity, entity_id) {
        if (!entity.renderer.renderEdges) return;
        for (let i = 0; i < entity.geometry.edges.length; i++) {
            let a = entity.points[entity.geometry.edges[i][0]];
            let b = entity.points[entity.geometry.edges[i][1]];
            this.display.line(a, b, entity.renderer.edge(this, entity_id, i));
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
            this.display.polygon(vertices, entity.renderer.face(this, entity_id, i));
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

    static async deserialize (json, errorDiv, errorP) {
        let deserializer = new Deserializer(json);

        let valid = deserializer.validate();
        if (valid !== true) {
            document.getElementById(errorDiv).style.display = "block";
            document.getElementById(errorP).innerHTML = valid;
        }

        return await deserializer.generate();
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
