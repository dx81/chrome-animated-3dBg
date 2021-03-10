import Matrix from "./matrix.js";
import Vector from "./vector.js";
import Geometry from "./geometry.js";

export default class Entity {

    static get transform() {
        return {
            position: [ 0, 0, 0 ],
            rotation: [ 0, 0, 0 ],
            scale: [ 100, 100, 100 ],
            offset: [ 0, 0, 0 ],
        };
    }

    static get geometry() {
        return {
            vertices: [],
            edges: [],
            faces: [],
        };
    }

    static get renderer() {
        return {
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
            shaders: {},
        };
    }

    static shaderTypes = [ "vertex", "edge", "face" ];

    constructor(transform, geometry, renderer, scripts = [], meta) {
        if (typeof geometry === "string") geometry = Geometry[geometry.toUpperCase()] || Geometry.EMPTY;
        this.transform = { ...Entity.transform, ...transform };
        this.geometry = { ...Entity.geometry, ...geometry };
        this.renderer = { ...Entity.renderer, ...renderer };
        this.scripts = [];
        this.meta = meta;
        this.coords = [];
        this.points = [];

        return new Promise(resolve => {
            this.importScripts(scripts).then(() => {
                this.importShaders(this.renderer.shaders).then(resolve);
            });
        });
    }

    update() {

        let cos_x = Math.cos(this.transform.rotation[0]);
        let sin_x = Math.sin(this.transform.rotation[0]);
        let rotation_matrix_x = [
            [ 1,      0,     0 ],
            [ 0,  cos_x, sin_x ],
            [ 0, -sin_x, cos_x ],
        ];

        let cos_y = Math.cos(this.transform.rotation[1]);
        let sin_y = Math.sin(this.transform.rotation[1]);
        let rotation_matrix_y = [
            [ cos_y, 0, -sin_y ],
            [     0, 1,      0 ],
            [ sin_y, 0,  cos_y ],
        ];

        let cos_z = Math.cos(this.transform.rotation[2]);
        let sin_z = Math.sin(this.transform.rotation[2]);
        let rotation_matrix_z = [
            [  cos_z, sin_z, 0 ],
            [ -sin_z, cos_z, 0 ],
            [      0,     0, 1 ],
        ];

        for (let i = 0; i < this.geometry.vertices.length; i++) {
            let vertex = [ Vector.add(Vector.multiply(this.geometry.vertices[i], this.transform.scale), this.transform.offset) ];
            vertex = Matrix.multiply(rotation_matrix_x, vertex);
            vertex = Matrix.multiply(rotation_matrix_y, vertex);
            vertex = Matrix.multiply(rotation_matrix_z, vertex);
            this.coords[i] = [ Vector.add(vertex[0], this.transform.position) ];
        }
    }

    async importScripts(scripts) {
        if (!Array.isArray(scripts)) {
            scripts = [ scripts ];
        }
        for (let i = 0; i < scripts.length; i++) {
            if (typeof scripts[i] == "string") {
                scripts[i] = { path: scripts[i], args: [] };
                continue;
            }
            if (!scripts[i].args) {
                scripts[i].args = [];
            }
            scripts[i].args = scripts[i].args.map(arg => arg === null ? undefined : arg);
        }
        await Promise.all(scripts.map(async ({ path, args }, index) => {
            this.scripts[index] = {
                ...Object.fromEntries(Object.entries(await import(`./scripts/${path}.js`))
                    .map(([ key, method ]) => [ key, method.bind(this, args || []) ])),
                path,
                args,
            };
        }));
        return this;
    }

    async importShaders(shaders) {
        if (typeof shaders == "string") {
            this.renderer.shaders = {};
            shaders = { path: shaders, args: [] };
        }
        if (shaders.path) {
            shaders = Object.fromEntries(Entity.shaderTypes.map(shaderType => [ shaderType, shaders ]));
        }
        await Promise.all(Object.entries(shaders).map(async ([ shaderType, shaderData ]) => {
            if (typeof shaderData == "string") {
                shaderData = { path: shaderData, args: [] }
            }
            else if (!shaderData.args) {
                shaderData.args = [];
            }
            shaderData.args = shaderData.args.map(arg => arg === null ? undefined : arg);
            this.renderer[shaderType] = (await import(`./shaders/${shaderData.path}.js`))[shaderType].bind(this, shaderData.args);
            this.renderer.shaders[shaderType] = shaderData;
        }));
        return this;
    }
}