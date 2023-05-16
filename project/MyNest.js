import { CGFappearance, CGFobject } from "../lib/CGF.js";

/**
 * MyNest
 * @constructor
 * @param scene - Reference to MyScene object
 * @param slices - number of divisions around the Y axis
 * @param stacks - number of divisions along the Y axis
 */
export class MyNest extends CGFobject {
    /**
     *
     * @param {CGFscene} scene
     * @param {number} slices
     * @param {number} stacks
     * @param {CGFtexture} texture
     */
    constructor(scene, slices, stacks, innerRadius, texture) {
        super(scene);
        this.slices = slices;
        this.stacks = stacks;
        this.innerRadius = innerRadius;
        this.material = new CGFappearance(scene);
        this.material.setTexture(texture);
        this.initBuffers();
    }

    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];

        const verticesPerSlice = (this.stacks + 1) * 2 + 3;

        const dtheta = (Math.PI * 0.5) / this.slices;
        const dphi = (Math.PI * 0.5) / this.stacks;

        for (let slice = 0; slice <= this.slices * 4; ++slice) {
            const theta = slice * dtheta;
            const ct = Math.cos(theta);
            const st = Math.sin(theta);

            for (let stack = 0; stack <= this.stacks; ++stack) {
                const phi = -Math.PI * 0.5 - stack * dphi;
                const cp = Math.cos(phi);
                const sp = Math.sin(phi);

                this.vertices.push(ct * cp, sp, st * cp);
                this.vertices.push(this.innerRadius * ct * cp, this.innerRadius * sp, this.innerRadius * st * cp);
                this.normals.push(ct * cp, sp, st * cp);
                this.normals.push(-ct * cp, -sp, -st * cp);
                this.texCoords.push(
                    1 - slice / (this.slices * 4),
                    1 - stack / (this.stacks * 2),
                    1 - slice / (this.slices * 4),
                    1 - stack / (this.stacks * 2),
                );

                if (slice > 0 && stack > 0) {
                    this.indices.push(
                        slice * verticesPerSlice + stack * 2,
                        (slice - 1) * verticesPerSlice + stack * 2 - 2,
                        (slice - 1) * verticesPerSlice + stack * 2,
                        slice * verticesPerSlice + stack * 2,
                        slice * verticesPerSlice + stack * 2 - 2,
                        (slice - 1) * verticesPerSlice + stack * 2 - 2,
                    );
                    this.indices.push(
                        slice * verticesPerSlice + stack * 2 + 1,
                        (slice - 1) * verticesPerSlice + stack * 2 + 1,
                        (slice - 1) * verticesPerSlice + stack * 2 - 1,
                        slice * verticesPerSlice + stack * 2 + 1,
                        (slice - 1) * verticesPerSlice + stack * 2 - 1,
                        slice * verticesPerSlice + stack * 2 - 1,
                    );
                }
            }

            this.vertices.push(ct, 0, st);
            this.vertices.push((this.innerRadius + 1) / 2 * ct, 0, (this.innerRadius + 1) / 2 * st);
            this.vertices.push(this.innerRadius * ct, 0, this.innerRadius * st);

            this.normals.push(0, 1, 0);
            this.normals.push(0, 1, 0);
            this.normals.push(0, 1, 0);

            this.texCoords.push(1 - slice / (this.slices * 4), 0.5);
            this.texCoords.push(1 - slice / (this.slices * 4), 0.6);
            this.texCoords.push(1 - slice / (this.slices * 4), 0.5);

            if (slice > 0) {
                this.indices.push(
                    slice * verticesPerSlice - 2,
                    (slice + 1) * verticesPerSlice - 2,
                    (slice + 1) * verticesPerSlice - 3,
                    slice * verticesPerSlice - 2,
                    (slice + 1) * verticesPerSlice - 3,
                    slice * verticesPerSlice - 3
                );
                this.indices.push(
                    slice * verticesPerSlice - 1,
                    (slice + 1) * verticesPerSlice - 1,
                    (slice + 1) * verticesPerSlice - 2,
                    slice * verticesPerSlice - 1,
                    (slice + 1) * verticesPerSlice - 2,
                    slice * verticesPerSlice - 2
                );
            }
        }

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }

    display() {
        this.material.apply();
        super.display();
    }
}
