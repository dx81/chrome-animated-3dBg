// Oliver Kovacs 2021 - engine.js

import Vector from "./vector.js";
import Matrix from "./matrix.js";

export class Engine {
    constructor(display, scene) {
        this.display = display;
        this.scene = scene;

        this.ms = 0;
        this.frame_id = 0;
        this.frame_draws = 0;

        //this.stats = document.querySelector("#stats");

        this.PROJECTION_MATRIX = this.constructor.ORTHOGRAPHIC_PROJECTION_MATRIX;
    }

    static ORTHOGRAPHIC_PROJECTION_MATRIX = new Matrix(...[
        [ 1, 0 ],
        [ 0, 1 ],
        [ 0, 0 ]
    ]);

    loop (ts) {
        window.requestAnimationFrame(ts => this.loop(ts));
        this.dt = (ts - this.ms);
        this.ms = ts;

        this.frame_id++;

        this.update();
        this.render();
    }

    update() {
        //this.stats.innerHTML = `dt: ${Math.round(this.dt)} fps: ${Math.round(1000 / this.dt)} entities: ${this.scene.length} draws: ${this.frame_draws}`;

        //this.scene[0].vertices = this.scene[0].vertices.map((vertex, i) => i < 8 ? Vector.scalar(vertex, 1.01) : vertex);

        for (let i = 0; i < this.scene.length; i++) {
            this.scene[i].transform.rotation[0] += this.dt / 1000;
            this.scene[i].transform.rotation[1] += this.dt / 3000;
        }
    }

    render() {
        this.display.clear("#000000");
        this.frame_draws = 0;

        for (let i = 0; i < this.scene.length; i++) {
            this.renderEntity(this.scene[i], i);
        }
    }

    renderEntity(entity, id) {
        
        if (!entity.renderer.render) return;

        entity.update();

        for (let i = 0; i < entity.coords.length; i++) {
            entity.points[i] = Matrix.invertXY(Matrix.multiply(this.PROJECTION_MATRIX, entity.coords[i]))[0];
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

export class Scene extends Array {
    constructor(scene, color = "#000000") {
        super(...scene);
        this.color = color;
    }
}

export class Entity {

    static transform = {
        position: [ 0, 0, 0 ],
        rotation: [ 0, 0, 0 ],
        scale: [ 1, 1, 1 ],
        offset: [ 0, 0, 0 ],
    };

    static geometry = {
        vertices: [],
        edges: [],
        faces: [],
        baseModel: undefined,
    };

    static renderer = {
        vertexShader: () => { },
        edgeShader: () => { },
        faceShader: () => { },
        vertexColor: "#FFFFFF",
        edgeColor: "#FFFFFF",
        faceColor: "#FFFFFF",
        render: true,
        renderVertices: true,
        renderEdges: true,
        renderFaces: true,
        useShaders: true,
    };

    constructor(transform, geometry, renderer, meta) {
        this.transform = { ...Entity.transform, ...transform };
        this.geometry = { ...Entity.geometry, ...geometry };
        this.renderer = { ...Entity.renderer, ...renderer };
        this.meta = meta;
        this.coords = [];
        this.points = [];
    }

    update() {

        let cos_x = Math.cos(this.transform.rotation[0]);
        let sin_x = Math.sin(this.transform.rotation[0]);
        let rotation_matrix_x = new Matrix(...[
            [ 1,      0,     0 ],
            [ 0,  cos_x, sin_x ],
            [ 0, -sin_x, cos_x ],
        ]);

        let cos_y = Math.cos(this.transform.rotation[1]);
        let sin_y = Math.sin(this.transform.rotation[1]);
        let rotation_matrix_y = new Matrix(...[
            [ cos_y, 0, -sin_y ],
            [     0, 1,      0 ],
            [ sin_y, 0,  cos_y ],
        ]);

        let cos_z = Math.cos(this.transform.rotation[2]);
        let sin_z = Math.sin(this.transform.rotation[2]);
        let rotation_matrix_z = new Matrix(...[
            [  cos_z, sin_z, 0 ],
            [ -sin_z, cos_z, 0 ],
            [      0,     0, 1 ],
        ]);

        for (let i = 0; i < this.geometry.vertices.length; i++) {
            let vertex = [ Vector.add(Vector.multiply(this.geometry.vertices[i], this.transform.scale), this.transform.offset) ];
            vertex = Matrix.invertXY(Matrix.multiply(rotation_matrix_x, vertex));
            vertex = Matrix.invertXY(Matrix.multiply(rotation_matrix_y, vertex));
            vertex = Matrix.invertXY(Matrix.multiply(rotation_matrix_z, vertex));
            this.coords[i] = [ Vector.add(vertex[0], this.transform.position) ];
        }
    }
}