
// Oliver Kovacs
// lib - random.ts

export default class Random {

    static random = Math.random;

    static int(min = 0, max = 1) {
        return Math.floor(this.random() * (max - min)) + min;
    }

    static float(min = 0, max = 1) {
        return this.random() * (max - min) + min;
    }

    static hex(min, max) {
        return this.int(min, max).toString(16);
    }

    static string(string, length) {
        return Array.from({ length }, () => string[this.int(0, string.length - 1)]).join("");
    }

    static gaussian() {
        return this.bm()[0];
    }

    static bm() {
        let u1 = 0, u2 = 0;
        while (u1 === 0) u1 = this.random();
        while (u2 === 0) u2 = this.random();
        const R = Math.sqrt(-2.0 * Math.log(u1));
        const x = 2.0 * Math.PI * u2;
        return [R * Math.cos(x), R * Math.sin(x)];
    }

    static gaussianSkewed(mean, scale, skew = 0) {
        const [u0, v] = this.bm();
        if (skew === 0) {
            return mean + scale * u0;
        }
        const x = skew / Math.sqrt(1 + skew * skew);
        const u1 = x * u0 + Math.sqrt(1 - x * x) * v;
        const z = u0 >= 0 ? u1 : -u1;
        return mean + scale * z;
    }

    static test(rng, min = 0, max = 1, n = 100, p = 1) {
        let array = Array((max - min) * Math.pow(10, p)).fill(0);
        for (let i = 0; i < n; i++) {
            let num = (parseFloat(rng().toFixed(p)) - min) * Math.pow(10, p);
            if (num >= 0 && num < array.length) {
                array[num]++;
            }
        }
        return array.map(element => element / array.reduce((prev, curr) => prev += curr));
    }
}