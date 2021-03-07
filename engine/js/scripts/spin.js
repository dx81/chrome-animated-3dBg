
export function update(engine) {
    this.transform.rotation[0] += engine.dt / 1090;
    this.transform.rotation[1] += engine.dt / 3090;
};