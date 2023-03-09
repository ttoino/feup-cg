import {CGFobject} from '../lib/CGF.js';
/**
 * MyParallelogram
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyParallelogram extends CGFobject {
    constructor(scene) {
        super(scene);
        this.initBuffers();
    }
    
    initBuffers() {
        this.vertices = [
            1, 1, 0,    // A1
            0, 0, 0,    // B1
            2, 0, 0,    // C1
            3, 1, 0,    // D1

            1, 1, 0,    // A2
            0, 0, 0,    // B2
            2, 0, 0,    // C2
            3, 1, 0,    // D2
        ];

        //Counter-clockwise reference of vertices
        this.indices = [
            0, 1, 2,    //1 A B C
            0, 2, 3,    //1 A C D

            6, 5, 4,    //2 C B A
            7, 6, 4,    //2 D C A
        ];

        this.normals = [
            0, 0, 1,
            0, 0, 1,
            0, 0, 1,
            0, 0, 1,
            0, 0, -1,
            0, 0, -1,
            0, 0, -1,
            0, 0, -1,
        ];

        //The defined indices (and corresponding vertices)
        //will be read in groups of three to draw triangles
        this.primitiveType = this.scene.gl.TRIANGLES;

        this.initGLBuffers();
    }
}

