// Oliver Kovacs 2020 - matrix.js

import Vector from "./vector.js";

export default class Matrix extends Array {
    constructor(...args) {
        super(...args);
    }

    static multiply(mat1, mat2, out = []) {
        for (let x = 0; x < mat2.length; x++) {
            out[x] = [];
            for (let y = 0; y < mat1[0].length; y++) {
                out[x][y] = Vector.dot(Matrix.sliceY(mat1, y), Matrix.sliceX(mat2, x));
            }
        }
        return out;
    }

    static scalar(mat, scalar, out = []) {
        for (let x = 0; x < mat.length; x++) {
            out[x] = [];
            for (let y = 0; y < mat[0].length; y++) {
                out[x][y] = mat[x][y] * scalar;
            }
        }
        return out;
    }

    static sliceX(mat, x) {
        return mat[x];
    }

    static sliceY(mat, y, out = []) {
        for (let i = 0; i < mat.length; i++) {
            out[i] = mat[i][y];
        }
        return out;
    }

    static invertXY(mat, out = []) {
        for (let y = 0; y < mat[0].length; y++) {
            out[y] = [];
            for (let x = 0; x < mat.length; x++) {
                out[y][x] = mat[x][y];
            }
        }
        return out;
    }
}
