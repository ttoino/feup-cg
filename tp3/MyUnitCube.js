import { CGFobject } from '../lib/CGF.js';
/**
 * MyTriangleSmall
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyUnitCube extends CGFobject {
    constructor(scene) {
        super(scene);
        this.initBuffers();
    }
    initBuffers() {
        const baseVertices = [
            0.5, 0.5, 0.5, // A1
            0.5, 0.5, -0.5, // B1
            0.5, -0.5, 0.5, // C1
            0.5, -0.5, -0.5, // D1
            -0.5, 0.5, 0.5, // E1
            -0.5, 0.5, -0.5, // F1
            -0.5, -0.5, 0.5, // G1
            -0.5, -0.5, -0.5,
        ];

        const baseIndices = [            
            // right
            0, 2, 1,
            1, 2, 3,

            // left
            4, 5, 6,
            5, 7, 6,

            // front
            0, 4, 6,
            0, 6, 2,

            // back
            1, 7, 5,
            1, 3, 7,

            // top
            0, 1, 4,
            1, 5, 4,

            // back
            2, 6, 7,
            2, 7, 3,
        ]

        this.vertices = [];
        this.indices = [];

        for (let i = 0; i < 3; i++) {
            this.vertices = [...this.vertices, ...baseVertices];
            this.indices = [...this.indices, ...baseIndices.map((idx) => idx + i*(baseVertices.length/3 /*3 coords per vertex*/ ))]
        }

        this.normals = [
            1, 0, 0,
            1, 0, 0,
            1, 0, 0,
            1, 0, 0,
            -1, 0, 0,
            -1, 0, 0,
            -1, 0, 0,
            -1, 0, 0,

            0, 1, 0,
            0, 1, 0,
            0, -1, 0,
            0, -1, 0,
            0, 1, 0,
            0, 1, 0,
            0, -1, 0,
            0, -1, 0,

            0, 0, 1,
            0, 0, -1,
            0, 0, 1,
            0, 0, -1,
            0, 0, 1,
            0, 0, -1,
            0, 0, 1,
            0, 0, -1,

        ]

        // The defined indices (and corresponding vertices)
        // will be read in groups of three to draw triangles
        this.primitiveType = this.scene.gl.TRIANGLES;

        this.initGLBuffers();
    }

    /**
 * Called when user interacts with GUI to change object's complexity.
 * @param {integer} complexity - changes number of nDivs
 */
    updateBuffers(complexity) {
        this.nDivs = 1 + Math.round(9 * complexity); //complexity varies 0-1, so nDivs varies 1-10
        this.patchLength = 1.0 / this.nDivs;

        // reinitialize buffers
        this.initBuffers();
        this.initNormalVizBuffers();
    }
}

