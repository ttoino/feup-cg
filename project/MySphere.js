import { CGFobject } from "../lib/CGF.js";

/**
 * MySphere
 * @constructor
 * @param scene - Reference to MyScene object
 * @param slices - number of divisions around the Y axis
 * @param stacks - number of divisions along the Y axis
 */
export class MySphere extends CGFobject {
    /**
     *
     * @param {CGFscene} scene
     * @param {number} slices
     * @param {number} stacks
     */
    constructor(scene, slices, stacks, inverted = false, textured = true) {
        super(scene);
        this.slices = slices;
        this.stacks = stacks;
        this.inverted = inverted;
        this.textured = textured;
        this.initBuffers();
    }

    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];

        if (this.textured)
            this.texCoords = [];

        const dtheta = (Math.PI * 0.5) / this.slices;
        const dphi = (Math.PI * 0.5) / this.stacks;

        for (let slice = 0; slice <= this.slices * 4; ++slice) {
            const theta = slice * dtheta;
            const ct = Math.cos(theta);
            const st = Math.sin(theta);

            for (let stack = 0; stack <= this.stacks * 2; ++stack) {
                const phi = -Math.PI * 0.5 - stack * dphi;
                const cp = Math.cos(phi);
                const sp = Math.sin(phi);

                this.vertices.push(ct * cp, sp, st * cp);
                this.normals.push(ct * cp, sp, st * cp);
                if (this.textured)
                    this.texCoords.push(
                        1 - slice / (this.slices * 4),
                        1 - stack / (this.stacks * 2)
                    );

                if (slice > 0 && stack > 0) {
                    if (this.inverted)
                        this.indices.push(
                            slice * (this.stacks * 2 + 1) + stack,
                            (slice - 1) * (this.stacks * 2 + 1) + stack,
                            (slice - 1) * (this.stacks * 2 + 1) + stack - 1,
                            slice * (this.stacks * 2 + 1) + stack,
                            (slice - 1) * (this.stacks * 2 + 1) + stack - 1,
                            slice * (this.stacks * 2 + 1) + stack - 1
                        );
                    else
                        this.indices.push(
                            slice * (this.stacks * 2 + 1) + stack,
                            (slice - 1) * (this.stacks * 2 + 1) + stack - 1,
                            (slice - 1) * (this.stacks * 2 + 1) + stack,
                            slice * (this.stacks * 2 + 1) + stack,
                            slice * (this.stacks * 2 + 1) + stack - 1,
                            (slice - 1) * (this.stacks * 2 + 1) + stack - 1
                        );
                }
            }
        }

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
}
