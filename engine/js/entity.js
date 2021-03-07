import Matrix from "./matrix.js";
import Vector from "./vector.js";

export default class Entity {

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
        vertexShader: () => "#FFFFFF",
        edgeShader: () => "#FFFFFF",
        faceShader: () => "#FFFFFF",
        vertexColor: "#FFFFFF",
        edgeColor: "#FFFFFF",
        faceColor: "#FFFFFF",
        render: true,
        renderVertices: true,
        renderEdges: true,
        renderFaces: true,
        useShaders: true,
        shaderPath: undefined,
    };

    constructor(transform, geometry, renderer, scripts, meta) {
        this.transform = { ...Entity.transform, ...transform };
        this.geometry = { ...Entity.geometry, ...geometry };
        this.renderer = { ...Entity.renderer, ...renderer };
        this.scripts = [];
        this.meta = meta;
        this.coords = [];
        this.points = [];

        return new Promise((resolve, reject) => {
            this.importScripts(scripts).then(_ => {
                if (!renderer.shaderPath) {
                    resolve(this);
                }
                if (typeof renderer.shaderPath == "string") {
                    renderer.shaderPath = {
                        vertexShader: renderer.shaderPath,
                        edgeShader: renderer.shaderPath,
                        faceShader: renderer.shaderPath,
                    }
                }
                this.importShaders(renderer.shaderPath).then(_ => {
                    resolve(this);
                });
            });
        });
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

    async importScripts(sources) {
        await Promise.all(sources.map(async (path, i) => {
            let script = await import(path);
            let assign = {}
            for (let key in script) {
                assign[key] = script[key].bind(this);
            }
            this.scripts[i] = { ...assign, path };
        }));
    }

    async importShaders(path) {
        await Promise.all(Object.entries(path).map(async ([ shader, shaderPath ]) => {
            this.renderer[shader] = (await import(shaderPath))[shader];
        }));
    }
}