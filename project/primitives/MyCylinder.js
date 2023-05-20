import { CGFobject } from "../../lib/CGF.js";

/**
 * MyCylinder
 * @constructor
 * @param scene - Reference to MyScene object
 * @param slices - number of divisions around the Y axis
 * @param stacks - number of divisions along the Y axis
 */
export class MyCylinder extends CGFobject {
    /**
     * 
     * @param {CGFscene} scene 
     * @param {number} slices 
     * @param {number} stacks 
     */
    constructor(scene, slices, stacks) {
        super(scene);
        this.slices = slices;
        this.stacks = stacks;
        this.initBuffers();
    }

    initBuffers() {
        this.vertices = [
            0, 0, 0, // Initial vertex
            0, 0, 1, // Last vertex
        ];
        this.indices = [];
        this.normals = [
            0, 0, -1,
            0, 0, 1,
        ];

        const alpha = (2 * Math.PI) / this.slices;

        // Add first face
        for (let i = 0; i < this.slices; i++) {
            const angle = i * alpha;
            const sa = Math.sin(angle);
            const ca = Math.cos(angle);

            this.vertices.push(ca, sa, 0);
            this.indices.push(i + 2, 0, (i + 1) % this.slices + 2);
            this.normals.push(0, 0, -1);
        }

        const h = 1/this.stacks;
        for (let slice = 0; slice < this.slices; ++slice) {
            const iOffset = this.slices + 2;
            const angle = slice * alpha;
            const sa = Math.sin(angle);
            const ca = Math.cos(angle);

            const normals = [ca, sa, 0];
            for (let stack = 0; stack <= this.stacks; ++stack) {
                this.vertices.push(ca, sa, stack*h);
                this.normals.push(...normals);
            }

            for (let stack = 0; stack < this.stacks; ++stack) {
                this.indices.push(
                    iOffset + (this.stacks + 1) * slice + stack,
                    iOffset + (this.stacks + 1) * ((slice + 1) % this.slices) + stack + 1,
                    iOffset + (this.stacks + 1) * slice + stack + 1,
                    
                    iOffset + (this.stacks + 1) * slice + stack,
                    iOffset + (this.stacks + 1) * ((slice + 1) % this.slices) + stack,
                    iOffset + (this.stacks + 1) * ((slice + 1) % this.slices) + stack + 1,
                );
            }
        }

        const iOffset = this.slices + 2 + this.slices * (this.stacks + 1);
        // Add last face
        for (let i = 0; i < this.slices; i++) {
            const angle = i * alpha;
            const sa = Math.sin(angle);
            const ca = Math.cos(angle);

            this.vertices.push(ca, sa, 1);
            this.indices.push(1, i + iOffset, (i + 1) % this.slices + iOffset);
            this.normals.push(0, 0, 1);
        }

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
}
