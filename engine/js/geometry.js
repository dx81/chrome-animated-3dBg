// Oliver Kovacs 2021 - geometry.js

import Matrix from "./matrix.js";

export default class Geometry {

    static get EMPTY() {
        return {
            vertices: [],

            edges: [],
    
            faces: [],
        };
    }

    static get TETRAHEDRON() {
        return {
            vertices: [
                [      0,    0, 0.425 ],
                [  0.577,    0, -0.33 ],
                [ -0.289,  0.5, -0.33 ],
                [ -0.289, -0.5, -0.33 ],
            ],
    
            edges: [
                [ 0, 1 ],
                [ 0, 2 ],
                [ 0, 3 ],
                [ 1, 2 ],
                [ 1, 3 ],
                [ 2, 3 ],
            ],
    
            faces: [
                [ 0, 1, 2 ],
                [ 0, 1, 3 ],
                [ 0, 2, 3 ],
                [ 1, 3, 2 ],
            ],
        };
    }

    static get CUBE() {
        return {
            vertices: [
                [ -0.5, -0.5, -0.5 ],
                [  0.5, -0.5, -0.5 ],
                [  0.5,  0.5, -0.5 ],
                [ -0.5,  0.5, -0.5 ],
                [ -0.5, -0.5,  0.5 ],
                [  0.5, -0.5,  0.5 ],
                [  0.5,  0.5,  0.5 ],
                [ -0.5,  0.5,  0.5 ],
            ],
    
            edges: [
                [ 0, 1 ],
                [ 4, 5 ],
                [ 0, 4 ],
                [ 1, 2 ],
                [ 5, 6 ],
                [ 1, 5 ],
                [ 2, 3 ],
                [ 6, 7 ],
                [ 2, 6 ],
                [ 3, 0 ],
                [ 7, 4 ],
                [ 3, 7 ],
            ],
    
            faces: [
                [ 0, 1, 2, 3 ],
                [ 4, 5, 6, 7 ],
                [ 0, 1, 5, 4 ],
                [ 1, 2, 6, 5 ],
                [ 2, 3, 7, 6 ],
                [ 3, 0, 4, 7 ],
            ],
        };
    }

    static get OCTAHEDRON() {
        return {
            vertices: Matrix.scalar([
                [    0,    0, -0.7072 ],
                [    0,    0,  0.7072 ],
                [ -0.5, -0.5,       0 ],
                [  0.5, -0.5,       0 ],
                [  0.5,  0.5,       0 ],
                [ -0.5,  0.5,       0 ],
            ], 0.5 / 0.7072),
    
            edges: [
                [ 2, 3 ],
                [ 3, 4 ],
                [ 4, 5 ],
                [ 5, 2 ],
                [ 0, 2 ],
                [ 0, 3 ],
                [ 0, 4 ],
                [ 0, 5 ],
                [ 1, 2 ],
                [ 1, 3 ],
                [ 1, 4 ],
                [ 1, 5 ],
            ],
    
            faces: [
                [ 0, 2, 3 ],
                [ 0, 3, 4 ],
                [ 0, 4, 5 ],
                [ 0, 5, 2 ],
                [ 1, 2, 3 ],
                [ 1, 3, 4 ],
                [ 1, 4, 5 ],
                [ 1, 5, 2 ],
            ],
        };
    }

    static get DODECAHEDRON() {
        return {
            vertices: Matrix.scalar([
                [     -1,     -1,     -1 ],
                [      1,     -1,     -1 ],
                [     -1,      1,     -1 ],
                [      1,      1,     -1 ],
                [     -1,     -1,      1 ],
                [      1,     -1,      1 ],
                [     -1,      1,      1 ],
                [      1,      1,      1 ],
                [      0, -1.618, -0.618 ],
                [      0,  1.618, -0.618 ],
                [      0, -1.618,  0.618 ],
                [      0,  1.618,  0.618 ],
                [ -0.618,      0, -1.618 ],
                [  0.618,      0, -1.618 ],
                [ -0.618,      0,  1.618 ],
                [  0.618,      0,  1.618 ],
                [ -1.618, -0.618,      0 ],
                [  1.618, -0.618,      0 ],
                [ -1.618,  0.618,      0 ],
                [  1.618,  0.618,      0 ],
            ],  0.5 / 1.618),
    
            edges: [
                [   8, 10 ],
                [   9, 11 ],
                [  12, 13 ],
                [  14, 15 ],
                [  16, 18 ],
                [  17, 19 ],
    
    
                [ 0,  8 ],
                [ 0, 12 ],
                [ 0, 16 ],
    
                [ 1,  8 ],
                [ 1, 13 ],
                [ 1, 17 ],
    
                [ 2,  9 ],
                [ 2, 12 ],
                [ 2, 18 ],
    
                [ 3,  9 ],
                [ 3, 13 ],
                [ 3, 19 ],
    
    
                [ 4, 10 ],
                [ 4, 14 ],
                [ 4, 16 ],
    
                [ 5, 10 ],
                [ 5, 15 ],
                [ 5, 17 ],
    
                [ 6, 11 ],
                [ 6, 14 ],
                [ 6, 18 ],
    
                [ 7, 11 ],
                [ 7, 15 ],
                [ 7, 19 ],
            ],
    
            faces: [
                [  8, 10, 4, 16, 0 ],
                [  8, 10, 5, 17, 1 ],
    
                [  9, 11, 6, 18, 2 ],
                [  9, 11, 7, 19, 3 ],
    
                [ 12, 13, 1,  8, 0 ],
                [ 12, 13, 3,  9, 2 ],
    
                [ 14, 15, 5, 10, 4 ],
                [ 14, 15, 7, 11, 6 ],
    
                [ 16, 18, 6, 14, 4 ],
                [ 16, 18, 2, 12, 0 ],
    
                [ 17, 19, 7, 15, 5 ],
                [ 17, 19, 3, 13, 1 ],
            ],
        };
    }

    static get ICOSAHEDRON() {
        return {

            vertices: Matrix.scalar([
                [      0,     -1, -1.618 ],
                [      0,      1, -1.618 ],
                [      0,     -1,  1.618 ],
                [      0,      1,  1.618 ],
                [ -1.618,      0,     -1 ],
                [ -1.618,      0,      1 ],
                [  1.618,      0,     -1 ],
                [  1.618,      0,      1 ],
                [     -1, -1.618,      0 ],
                [      1, -1.618,      0 ],
                [     -1,  1.618,      0 ],
                [      1,  1.618,      0 ],
            ], 0.5 / 1.618),

            edges: [
                [  0,  1 ],
                [  2,  3 ],
                [  4,  5 ],
                [  6,  7 ],
                [  8,  9 ],
                [ 10, 11 ],

                [ 0,  8 ],
                [ 0,  9 ],
                [ 1, 10 ],
                [ 1, 11 ],

                [ 2,  8 ],
                [ 2,  9 ],
                [ 3, 10 ],
                [ 3, 11 ],

                [ 4, 0 ],
                [ 4, 1 ],
                [ 5, 2 ],
                [ 5, 3 ],

                [ 6, 0 ],
                [ 6, 1 ],
                [ 7, 2 ],
                [ 7, 3 ],

                [ 8, 4 ],
                [ 8, 5 ],
                [ 9, 6 ],
                [ 9, 7 ],

                [ 10, 4 ],
                [ 10, 5 ],
                [ 11, 6 ],
                [ 11, 7 ],
            ],

            faces: [
                [ 0, 4, 8 ],
                [ 0, 6, 9 ],
                [ 3, 7, 11 ],
                [ 3, 5, 10 ],

                [ 1, 4, 10 ],
                [ 1, 6, 11 ],
                [ 2, 7,  9 ],
                [ 2, 5,  8 ],

                [ 0,  8,  9 ],
                [ 2,  8,  9 ],
                [ 1, 10, 11 ],
                [ 3, 10, 11 ],

                [ 4, 0, 1 ],
                [ 6, 0, 1 ],
                [ 5, 2, 3 ],
                [ 7, 2, 3 ],

                [  8, 4, 5 ],
                [ 10, 4, 5 ],
                [  9, 6, 7 ],
                [ 11, 6, 7 ],
            ],
        };
    }

    static get cube_faces_triangles() {
        return [
            [ 0, 1, 3 ],
            [ 4, 5, 7 ],
            [ 0, 1, 4 ],
            [ 1, 2, 5 ],
            [ 2, 3, 6 ],
            [ 3, 0, 7 ],
        ];
    }

    static get dodecahedron_faces_cube() {
        return [
            [ 0, 1, 3, 2 ],
            [ 4, 5, 7, 6 ],
            [ 0, 1, 5, 4 ],
            [ 1, 3, 7, 5 ],
            [ 3, 2, 6, 7 ],
            [ 2, 0, 4, 6 ],
        ];
    }

    static get icosahedron_faces_rectangles() {
        return [
            [ 0, 1,  3,  2 ],
            [ 4, 5,  7,  6 ],
            [ 8, 9, 11, 10 ],
        ];
    }

    static addVertexToEdge(geometry, vertex, edge) {
        let adjacentFaces = [];
        for (let i = 0; i < geometry.faces.length; i++) {
            if (geometry.faces[i].indexOf(geometry.edges[edge][0]) != -1 && geometry.faces[i].indexOf(geometry.edges[edge][1]) != -1) {
                adjacentFaces.push(i);
            }
        }
        console.log(adjacentFaces);
        let edges = [];
        let faces = [];
        for (let i = 0; i < adjacentFaces.length; i++) {
            for (let j = 0; j < geometry.faces[adjacentFaces[i]].length; j++) {
                edges.push([ geometry.faces[adjacentFaces[i]][j], geometry.vertices.length ]);
                if (geometry.edges[edge].indexOf(geometry.faces[adjacentFaces[i]][j]) != -1 &&
                    geometry.edges[edge].indexOf(geometry.faces[adjacentFaces[i]][(j + 1) % geometry.faces[adjacentFaces[i]].length]) != -1) {
                    continue;
                }
                faces.push([ geometry.faces[adjacentFaces[i]][j], geometry.vertices.length, geometry.faces[adjacentFaces[i]][(j + 1) % geometry.faces[adjacentFaces[i]].length] ]);
            }
        }
        for (let i = 0; i < adjacentFaces.length; i++) {
            console
            geometry.faces.splice(adjacentFaces[i], 1);
        }
        geometry.edges.splice(edge, 1);
        return {
            vertices: [ ...geometry.vertices, vertex ],
            edges: [ ...geometry.edges, ...edges ],
            faces: [ ...geometry.faces, ...faces ],
        };
    }

    static addVertexToFace(geometry, vertex, face) {
        let edges = [];
        let faces = [];
        for (let i = 0; i < geometry.faces[face].length; i++) {
            edges[i] = [ geometry.faces[face][i], geometry.vertices.length ];
            faces[i] = [ geometry.faces[face][i], geometry.vertices.length, geometry.faces[face][(i + 1) % geometry.faces[face].length] ];
        }
        geometry.faces.splice(face, 1);
        return {
            vertices: [ ...geometry.vertices, vertex ],
            edges: [ ...geometry.edges, ...edges ],
            faces: [ ...geometry.faces, ...faces ],
        };
    }

    static addDiagonalsToFace(geometry, face) {
        let edges = [];
        for (let i = 0; i < geometry.faces[face].length - 3; i++) {
            edges.push([ geometry.faces[face][0], geometry.faces[face][ i + 2 ] ]);
        }
        for (let i = 1; i < geometry.faces[face].length - 2; i++) {
            for (let j = i; j < geometry.faces[face].length - 2; j++) {
                edges.push([ geometry.faces[face][i], geometry.faces[face][j + 2] ]);
            }
        }
        return {
            vertices: geometry.vertices,
            edges: [ ...geometry.edges, ...edges ],
            faces: geometry.faces,
        };
    }

    static CUBOID_Faces = (() => {
        let out = []; let iter = { length: 4 };
        out.push(Array.from(iter, (_, i) => i));
        out.push(Array.from(iter, (_, i) => i + 4));
        Array.from(iter, _ => "").forEach((_, i) => {
            out.push([ i, (i + 1) % 4, ((i + 1) % 4) + 4, i + 4 ]);
        });
        return out;
    })();

    static construct_regular_convex(vertex_count, radius = 1, phase = 0) {
        let out = [];
        for (let i = 0; i < vertex_count; i++) {
            let theta = i * 2 * Math.PI / vertex_count + phase;
            out[i] = [ radius * Math.cos(theta), radius * Math.sin(theta) ];
        }
        return out;
    }

    static octahedron_type_edges(vertex_count) {
        let out = [];
        for (let i = 0; i < vertex_count; i++) {
            out[i] = [ i + 2, ((i + 1) % vertex_count) + 2];
            out[i + vertex_count] = [ 0, i + 2 ];
            out[i + 2 * vertex_count] = [ 1, i + 2 ];
        }
        return out;
    }

    static octahedron_type_faces(vertex_count) {
        let out = [];
        for (let i = 0; i < vertex_count; i++) {
            out[i] = [ 0, i + 2, ((i + 1) % vertex_count) + 2 ];
            out[i + vertex_count] = [ 1, i + 2, ((i + 1) % vertex_count) + 2 ];
        }
        return out;
    }

    static cuboid_type_edges(vertex_count) {
        let out = [];
        for (let i = 0; i < vertex_count; i++) {
            out[i] = [ i, ((i + 1) % vertex_count)];
            out[i + vertex_count] = [ i + vertex_count, ((i + 1) % vertex_count) + vertex_count];
            out[i + 2 * vertex_count] = [ i, i + vertex_count ];
        }
        return out;
    }

    static cuboid_type_faces(vertex_count) {
        let out = [];
        let out1 = [];
        let out2 = [];
        for (let i = 0; i < vertex_count; i++) {
            out[i] = [ i, (i + 1) % vertex_count, ((i + 1) % vertex_count) + vertex_count, i + vertex_count];
            out1[i] = i;
            out2[i] = i + vertex_count;
        }
        out[vertex_count] = out1;
        out[1 + vertex_count] = out2;
        return out;
    }
}

//for (let i = 0; i < 4; i++) {
//    let a = 2 * (i % 2) - 1;
//    let b = 2 * Math.floor(i / 2) - 1;
//    const phi = (1 + Math.sqrt(5)) / 2;
//    const iphi = 1 / phi;
//    Geometry.DODECAHEDRON.Vertices[i + 0 * 4] = [        a,        b,       -1 ];
//    Geometry.DODECAHEDRON.Vertices[i + 1 * 4] = [        a,        b,        1 ];
//    Geometry.DODECAHEDRON.Vertices[i + 2 * 4] = [        0,  a * phi, b * iphi ];
//    Geometry.DODECAHEDRON.Vertices[i + 3 * 4] = [ a * iphi,        0,  b * phi ];
//    Geometry.DODECAHEDRON.Vertices[i + 4 * 4] = [  a * phi, b * iphi,        0 ];
//}

//for (let i = 0; i < 2; i++) {
//    Geometry.DODECAHEDRON.Edge[i * 1] = [ 2 * 4 + 2 * i, 2 * 4 + 2 * i + 1 ];
//    Geometry.DODECAHEDRON.Edge[i * 2] = [ 3 * 4 + 2 * i, 3 * 4 + 2 * i + 1 ];
//    Geometry.DODECAHEDRON.Edge[i * 3] = [ 4 * 4 + 2 * i, 4 * 4 + 2 * i + 1 ]
//    Geometry.DODECAHEDRON.Edge[i * 1] = [ 2 * 4 + i, 2 * 4 + i + 1 ];
//    Geometry.DODECAHEDRON.Edge[i * 2] = [ 3 * 4 + i, 3 * 4 + i + 1 ];
//    Geometry.DODECAHEDRON.Edge[i * 3] = [ 4 * 4 + i, 4 * 4 + i + 1 ];
//}

//console.log((() => {
//    const out = []
//    const phi = (1 + Math.sqrt(5)) / 2;
//
//    let base = Array.from({ length: 4 }, (_, i) => [ 0, 2 * (i % 2) - 1, (2 * Math.floor(i / 2) - 1) * phi ]);
//    base.forEach(([ x, y, z ], i) => {
//        console.log(x, y, z, i)
//        out[i + 0 * 4] = [ x, y, z ];
//        out[i + 1 * 4] = [ z, x, y ];
//        out[i + 2 * 4] = [ y, z, x ];
//    });
//    console.log(out)
//    return out;
//})())

// cube faces triangles
//return this.CUBOID_Faces.map(face => [ face [0], face[1] , face[3], face[2] ]);
//return this.CUBE.faces.map(face => [ face [0], face[1] , face[3] ]);