import { CGFobject } from "../lib/CGF.js";

/**
 * MySphere
 * @constructor
 * @param scene - Reference to MyScene object
 * @param slices - number of divisions around the Y axis
 * @param stacks - number of divisions along the Y axis
 */
export class MyWing extends CGFobject {
    /**
     *
     * @param {CGFscene} scene
     */
    constructor(scene) {
        super(scene);
        this.initBuffers();
    }

    initBuffers() {

        const junctionVertexes = [
            1, 0.2, 0,
            1, 0.2, 1,
        ]

        const vertexBase = [
            0, 0, 0, // 0
            0, 0, 1, // 1
            ...junctionVertexes,
            2, -0.1, 0.5, // 4

        ]

        this.vertices = [
            // upside
            ...vertexBase,

            // downside
            ...vertexBase,

            ...junctionVertexes,

            ...junctionVertexes,
        ];

        const indexBase = [
            0, 1, 2,
            2, 1, 3,
            2, 3, 4,

            5, 2, 1,
            2, 3, 1,
            2, 4, 3,
        ]

        this.indices = [
            ...indexBase,
            ...indexBase.map(x => x + 5),

            0, 1, 10,
            10, 1, 11,

            0, 1, 12,
            12, 1, 13,

        ]

        const arm = [-1, 3, 0];
        const tipNormal = [-arm[0], arm[1], arm[2]];
        const normalLen = Math.sqrt(arm.reduce((a, b) => a + b * b, 0))

        this.normals = [
            ...arm.map(x => -x / normalLen),
            ...arm.map(x => -x / normalLen),
            ...tipNormal.map(x => -x / normalLen),
            ...tipNormal.map(x => -x / normalLen),
            ...tipNormal.map(x => -x / normalLen),
            ...arm.map(x => x / normalLen),
            ...arm.map(x => x / normalLen),
            ...tipNormal.map(x => x / normalLen),
            ...tipNormal.map(x => x / normalLen),
            ...tipNormal.map(x => x / normalLen),

            ...arm.map(x => x / normalLen),
            ...arm.map(x => x / normalLen),
            ...arm.map(x => -x / normalLen),
            ...arm.map(x => -x / normalLen),

        ]

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
}
