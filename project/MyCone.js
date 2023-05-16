import { CGFobject } from "../lib/CGF.js";

/**
 * MyCone
 * @constructor
 * @param scene - Reference to MyScene object
 * @param slices - number of divisions around the Y axis
 * @param stacks - number of divisions along the Y axis
 */
export class MyCone extends CGFobject {
    constructor(scene, slices, stacks) {
        super(scene);
        this.slices = slices;
        this.stacks = stacks;
        this.initBuffers();
    }

    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];

        var ang = 0;
        var alphaAng = (2 * Math.PI) / this.slices;

        for (var i = 0; i <= this.slices; i++) {
            this.vertices.push(Math.cos(ang), 0, -Math.sin(ang));
            this.indices.push(i, i + 1, this.slices + 1);
            this.normals.push(
                Math.cos(ang),
                Math.cos(Math.PI / 4.0),
                -Math.sin(ang)
            );
            this.texCoords.push(i/this.slices, 0);
            ang += alphaAng;
        }
        this.vertices.push(0, 1, 0);
        this.normals.push(0, 1, 0);
        this.texCoords.push(0.5, 1);

        /* for (let i = 0; i < this.slices; i++) {
            const angle = i * alphaAng;
            const sa = Math.sin(angle);
            const ca = Math.cos(angle);

            this.vertices.push(ca, sa, 0);
            this.indices.push(i + 2, 0, (i + 1) % this.slices + 2);
            this.normals.push(0, 0, -1);
        } */

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }

    /**
     * Called when user interacts with GUI to change object's complexity.
     * @param {integer} complexity - changes number of slices
     */
    updateBuffers(complexity) {
        this.slices = 3 + Math.round(9 * complexity); //complexity varies 0-1, so slices varies 3-12

        // reinitialize buffers
        this.initBuffers();
        this.initNormalVizBuffers();
    }
}
