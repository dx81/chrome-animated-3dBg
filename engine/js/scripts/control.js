const base_movement_speed = 0.002;
const base_rotation_speed = 0.002;

export function update([ movement = 1, rotation = 1 ], engine, entity_id, script_id) {
    let { kb } = engine;
    this.transform.position[0] -= kb.KeyA * movement * base_movement_speed * engine.dt;
    this.transform.position[0] += kb.KeyD * movement * base_movement_speed * engine.dt;
    this.transform.position[1] -= kb.KeyW * movement * base_movement_speed * engine.dt;
    this.transform.position[1] += kb.KeyS * movement * base_movement_speed * engine.dt;

    this.transform.offset[0] -= kb.ArrowLeft  * movement * base_movement_speed * engine.dt;
    this.transform.offset[0] += kb.ArrowRight * movement * base_movement_speed * engine.dt;
    this.transform.offset[1] -= kb.ArrowUp    * movement * base_movement_speed * engine.dt;
    this.transform.offset[1] += kb.ArrowDown  * movement * base_movement_speed * engine.dt;

    for (let i = 0; i < Math.min(this.transform.rotation.length, 10); i++) {
        let offset = kb.ShiftRight * 20 + kb.AltLeft * 10;
        let direction = kb.ShiftLeft ? -1 : 1;
        this.transform.rotation[((i + 9) % 10) + offset] += kb[`Digit${i}`] * direction * rotation * base_rotation_speed * engine.dt;
    }
}