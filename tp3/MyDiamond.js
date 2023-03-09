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

        this.normals = [];

        //The defined indices (and corresponding vertices)
        //will be read in groups of three to draw triangles
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

