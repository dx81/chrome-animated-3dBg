import Matrix from "./matrix.js";

export default class Rotate {

    static matrix(axis1, axis2, dimension, angle) {
        let out = Matrix.identity(dimension);
        let cos = Math.cos(angle);
        let sin = Math.sin(angle);
        out[axis1][axis1] =  cos;
        out[axis1][axis2] = -sin;
        out[axis2][axis1] =  sin;
        out[axis2][axis2] =  cos;
        return out;
    }

    static name(index) {
        return String.fromCharCode(88 + (index < 3 ? index : 2 - index));
    }

    static rotations(dimension) {
        let out = [];
        for (let i = 0; i < dimension - 1; i++) {
            for (let j = i + 1; j < dimension; j++) {
                out.push([i, j])
            }
        }
        return out;
    }
    
    static x(angle) {
        let cos = Math.cos(angle);
        let sin = Math.sin(angle);
        return [
            [ 1,   0,    0 ],
            [ 0, cos, -sin ],
            [ 0, sin,  cos ],
        ];
    }

    static y(angle) {
        let cos = Math.cos(angle);
        let sin = Math.sin(angle);
        return [
            [  cos, 0, sin ],
            [    0, 1,   0 ],
            [ -sin, 0, cos ],
        ];
    }

    static z(angle) {
        let cos = Math.cos(angle);
        let sin = Math.sin(angle);
        return [
            [ cos, -sin, 0 ],
            [ sin,  cos, 0 ],
            [   0,    0, 1 ],
        ];
    }

    static xy(angle) {
        let cos = Math.cos(angle);
        let sin = Math.sin(angle);
        return [
            [ cos, -sin, 0, 0 ],
            [ sin,  cos, 0, 0 ],
            [   0,    0, 1, 0 ],
            [   0,    0, 0, 1 ],
        ];
    }

    static xz(angle) {
        let cos = Math.cos(angle);
        let sin = Math.sin(angle);
        return [
            [ cos, 0, -sin, 0 ],
            [   0, 1,    0, 0 ],
            [ sin, 0,  cos, 0 ],
            [   0, 0,    0, 1 ],
        ];
    }

    static xw(angle) {
        let cos = Math.cos(angle);
        let sin = Math.sin(angle);
        return [
            [ cos, 0, 0, -sin ],
            [   0, 1, 0,    0 ],
            [   0, 0, 1,    0 ],
            [ sin, 0, 0,  cos ],
        ];
    }

    static yz(angle) {
        let cos = Math.cos(angle);
        let sin = Math.sin(angle);
        return [
            [ 1,   0,    0, 0 ],
            [ 0, cos, -sin, 0 ],
            [ 0, sin,  cos, 0 ],
            [ 0,   0,    0, 1 ],
        ];
    }

    static yw(angle) {
        let cos = Math.cos(angle);
        let sin = Math.sin(angle);
        return [
            [ 1,   0, 0,    0 ],
            [ 0, cos, 0, -sin ],
            [ 0,   0, 1,    0 ],
            [ 0, sin, 0,  cos ],
        ];
    }

    static zw(angle) {
        let cos = Math.cos(angle);
        let sin = Math.sin(angle);
        return [
            [ 1, 0,   0,    0 ],
            [ 0, 1,   0,    0 ],
            [ 0, 0, cos, -sin ],
            [ 0, 0, sin,  cos ],
        ];
    }
}
