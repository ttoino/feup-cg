import {CGFobject} from '../lib/CGF.js';
/**
 * MyDiamond
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyDiamond extends CGFobject {
    constructor(scene) {
        super(scene);
        this.initBuffers();
    }
    
    initBuffers() {
        this.vertices = [
            -1, 0, 0,   // A
            0, -1, 0,   // B
            0, 1, 0,    // C
            1, 0, 0     // D
        ];

        //Counter-clockwise reference of vertices
        this.indices = [
            0, 1, 2,    // A B C
            1, 3, 2     // B D C
        ];

        this.texCoords = [
            0, 0.5,
            0.25, 0.75,
            0.25, 0.25,
            0.5, 0.5
        ];

        this.updateTexCoordsGLBuffers();

        //The defined indices (and corresponding vertices)
        //will be read in groups of three to draw triangles
        this.primitiveType = this.scene.gl.TRIANGLES;

        this.initGLBuffers();
    }
}

