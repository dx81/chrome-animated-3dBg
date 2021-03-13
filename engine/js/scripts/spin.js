
export function update([ rotation = Array(this.transform.rotation.length).fill(1) ], engine, entity_id, script_id) {
    for (let i = 0; i < this.transform.rotation.length; i++) {
        this.transform.rotation[i] += rotation[i] * engine.dt * 0.001;
    }
}