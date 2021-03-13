export default class Rotate {
    
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
