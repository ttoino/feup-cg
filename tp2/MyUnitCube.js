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
        this.vertices = [
            0.5, 0.5, 0.5, // A
            0.5, 0.5, -0.5, // B
            0.5, -0.5, 0.5, // C
            0.5, -0.5, -0.5, // D
            -0.5, 0.5, 0.5, // E
            -0.5, 0.5, -0.5, // F
            -0.5, -0.5, 0.5, // G
            -0.5, -0.5, -0.5, // G
        ];

        //Counter-clockwise reference of vertices
        this.indices = [      
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
        ];

        // The defined indices (and corresponding vertices)
        // will be read in groups of three to draw triangles
        this.primitiveType = this.scene.gl.TRIANGLES;

        this.initGLBuffers();
    }
}

