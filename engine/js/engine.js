// Oliver Kovacs 2021 - engine.js

import Matrix from "./matrix.js";
import Vector from "./vector.js";
import Rotate from "./rotate.js";
import Deserializer from "./deserialize.js";
import Geometry from "./geometry.js";
import { D } from "./utils.js";

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

    static Rotate = Rotate;

    static PROJECTION_MATRIX(dimension, scale) {
        let out = [];
        for (let x = 0; x < dimension; x++) {
            out[x] = [];
            for (let y = 0; y < dimension - 1; y++) {
                out[x][y] = x === y ? scale : 0;
            }
        }
        return out;
    }

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

        this.rotate(entity);

        let distance = 1.7;
        for (let i = 0; i < entity.coords.length; i++) {

            let dimension = Geometry.getDimension(entity.geometry);
            for (let d = dimension; d > 2; d--) {
                let w = 1 / (distance + entity.coords[i][0][d - 1]);
                // w = 1;
                entity.coords[i] = Matrix.multiply(Engine.PROJECTION_MATRIX(d, w), entity.coords[i]);
            }
            entity.points[i] = Vector.scalar(entity.coords[i][0], 2000);
        }

        this.renderFaces(entity, id);
        this.renderEdges(entity, id);
        this.renderVertices(entity, id);
    }

    renderVertices(entity, entity_id) {
        if (!entity.renderer.renderVertices) return;
        for (let i = 0; i < entity.points.length; i++) {
            this.display.circle(entity.points[i], 1, entity.renderer.vertex(this, entity_id, i), "fill");
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

    rotate(entity) {

        let dimension = Geometry.getDimension(entity.geometry);
        let rotations = Rotate.rotations(dimension);
        let rotation_matrices = [];

        for (let i = 0; i < rotations.length; i++) {
            rotation_matrices[i] = Rotate.matrix(...rotations[i], dimension, entity.transform.rotation[i])
        }

        for (let i = 0; i < entity.geometry.vertices.length; i++) {

            let vertex = [ Vector.add(Vector.multiply(entity.geometry.vertices[i], entity.transform.scale), entity.transform.offset) ];

            for (let j = 0; j < rotation_matrices.length; j++) {
                vertex = Matrix.multiply(rotation_matrices[j], vertex);
            }

            entity.coords[i] = [ Vector.add(vertex[0], entity.transform.position) ];
        }

        console.log()

        //if (Geometry.getDimension(entity.geometry) === 4) {
        //    return this.rotate4d(entity);
        //}
        //this.rotate3d(entity);
    }

    rotate3d(entity) {
        const rotation_matrix_x = Engine.Rotate.x(entity.transform.rotation[0]);
        const rotation_matrix_y = Engine.Rotate.y(entity.transform.rotation[1]);
        const rotation_matrix_z = Engine.Rotate.z(entity.transform.rotation[2]);

        for (let i = 0; i < entity.geometry.vertices.length; i++) {
            let vertex = [ Vector.add(Vector.multiply(entity.geometry.vertices[i], entity.transform.scale), entity.transform.offset) ];
            vertex = Matrix.multiply(rotation_matrix_x, vertex);
            vertex = Matrix.multiply(rotation_matrix_y, vertex);
            vertex = Matrix.multiply(rotation_matrix_z, vertex);
            entity.coords[i] = [ Vector.add(vertex[0], entity.transform.position) ];
        }
    }

    rotate4d(entity) {

        const rotation_matrix_xy = Engine.Rotate.xy(entity.transform.rotation[0]);
        const rotation_matrix_xz = Engine.Rotate.xz(entity.transform.rotation[1]);
        const rotation_matrix_xw = Engine.Rotate.xw(entity.transform.rotation[2]);
        const rotation_matrix_yz = Engine.Rotate.yz(entity.transform.rotation[3]);
        const rotation_matrix_yw = Engine.Rotate.yw(entity.transform.rotation[4]);
        const rotation_matrix_zw = Engine.Rotate.zw(entity.transform.rotation[5]);
        
        for (let i = 0; i < entity.geometry.vertices.length; i++) {
            let vertex = [ Vector.add(Vector.multiply(entity.geometry.vertices[i], entity.transform.scale), entity.transform.offset) ];
            vertex = Matrix.multiply(rotation_matrix_xy, vertex);
            vertex = Matrix.multiply(rotation_matrix_xz, vertex);
            vertex = Matrix.multiply(rotation_matrix_xw, vertex);
            vertex = Matrix.multiply(rotation_matrix_yz, vertex);
            vertex = Matrix.multiply(rotation_matrix_yw, vertex);
            vertex = Matrix.multiply(rotation_matrix_zw, vertex);
            entity.coords[i] = [ Vector.add(vertex[0], entity.transform.position) ];
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
