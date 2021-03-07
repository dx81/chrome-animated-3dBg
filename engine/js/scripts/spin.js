
export function update([ rotation = [ 1, 1, 1 ] ], engine, entity_id, script_id) {
    this.transform.rotation[0] += rotation[0] * engine.dt * 0.001;
    this.transform.rotation[1] += rotation[1] * engine.dt * 0.001;
    this.transform.rotation[2] += rotation[2] * engine.dt * 0.001;
};