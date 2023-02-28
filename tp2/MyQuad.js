import {CGFobject} from '../lib/CGF.js';
/**
 * MyTriangle
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyQuad extends CGFobject {
    constructor(scene) {
        super(scene);
        this.initBuffers();
    }
    
    initBuffers() {
        this.vertices = [
            -0.5, 0.5, 0,   // A
            -0.5, -0.5, 0,  // B
            0.5, -0.5, 0,   // C
            0.5, 0.5, 0
        ];

        //Counter-clockwise reference of vertices
        this.indices = [
            0, 1, 2,    // A B C
            0, 2, 3
        ];

        //The defined indices (and corresponding vertices)
        //will be read in groups of three to draw triangles
        this.primitiveType = this.scene.gl.TRIANGLES;

        this.initGLBuffers();
    }
}

