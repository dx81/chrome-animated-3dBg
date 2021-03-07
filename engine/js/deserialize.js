import Entity from "./entity.js";
import { Diverse, Nullable, StringAbstract, NumberAbstract, ArrayAbstract, BooleanAbstract, ObjectAbstract, AnyAbstract} from "./abstract.js";

const newLineChar = "<br/>";

const layout2 = new ArrayAbstract(null,
    new ObjectAbstract({
        transform : new ObjectAbstract({
            position : new ArrayAbstract(3, new NumberAbstract()),
            rotation : new ArrayAbstract(3, new NumberAbstract()),
            scale : new ArrayAbstract(3, new NumberAbstract()),
            offset : new ArrayAbstract(3, new NumberAbstract())
        }),
        geometry : new Diverse(
            new StringAbstract(),
            new ObjectAbstract({
                vertices : new ArrayAbstract(null,
                    new ArrayAbstract(3, new NumberAbstract())
                ),
                edges : new ArrayAbstract(null,
                    new ArrayAbstract(2, new NumberAbstract())
                ),
                faces : new ArrayAbstract(null,
                    new ArrayAbstract(null, new NumberAbstract())
                )
            }
        )),
        renderer : new ObjectAbstract({
            vertexColor : new Nullable(
                new StringAbstract(/^#[a-zA-Z0-9]{6}$/)
            ),
            edgeColor : new Nullable(
                new StringAbstract(/^#[a-zA-Z0-9]{6}$/)
            ),
            faceColor : new Nullable(
                new StringAbstract(/^#[a-zA-Z0-9]{6}$/)),
            render : new Nullable(new BooleanAbstract(true)
            ),
            renderVertices : new Nullable(
                new BooleanAbstract(true)
            ),
            renderEdges : new Nullable(
                new BooleanAbstract(true)
            ),
            renderFaces : new Nullable(
                new BooleanAbstract(true)
            ),
            useShaders : new Nullable(
                new BooleanAbstract(true)
            ),
            shaderPath : new Nullable(
                new ObjectAbstract({
                    vertexShader : new StringAbstract(),
                    edgeShader : new StringAbstract(),
                    faceShader : new StringAbstract()
                })
            )
        }),
        scripts : new Nullable(
            new ArrayAbstract(null,
                new ObjectAbstract({
                    path : new StringAbstract(),
                    args : new Nullable(
                        new ArrayAbstract(null, new AnyAbstract())
                    )
                }
            ))
        )
    }
));

export default class Deserializer {
    constructor (json) {
        this.json = json;
        this.validationPassed = false;
    }

    validate () {
        let valid = layout2.validate(this.json);

        if (!valid) {
            return layout2.error(this.json).join(newLineChar);
        } else {
            this.validationPassed = true;
        }

        return valid;
    }

    async generate () {
        if (!this.validationPassed) return [];

        let entities = [];
        for (let key in this.json) {
            let source = this.json[key];

            entities.push(await new Entity(source.transform, source.geometry, source.renderer, source.scripts));
        }

        return entities;
    }
}
