import {CGFobject} from '../lib/CGF.js';
/**
 * MyTriangleBig
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyTriangleBig extends CGFobject {
    constructor(scene) {
        super(scene);
        this.initBuffers();
    }
    
    initBuffers() {
        this.vertices = [
            0, 2, 0,   // A
            -2, 0, 0,  // B
            2, 0, 0,   // C
        ];

        //Counter-clockwise reference of vertices
        this.indices = [
            0, 1, 2,    // A B C
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

