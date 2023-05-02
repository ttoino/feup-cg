import { CGFappearance, CGFobject, CGFtexture } from "../lib/CGF.js";

/**
 * MyBirdEgg
 * @constructor
 * @param scene - Reference to MyScene object
 * @param slices - number of divisions around the Y axis
 * @param stacks - number of divisions along the Y axis
 */
export class MyBirdEgg extends CGFobject {
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

        this.appearance = new CGFappearance(this.scene);
        this.appearance.setAmbient(0.3, 0.3, 0.3, 1);
        this.appearance.setDiffuse(0.7, 0.7, 0.7, 1);
        this.appearance.setTexture(
            new CGFtexture(this.scene, "images/egg.jpg")
        );

        this.initBuffers();
    }

    display() {
        this.appearance.apply();
        super.display();
    }

    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];

        const dtheta = Math.PI / this.slices;
        const dt = Math.PI / this.stacks;

        const s = 1.2;
        const k = 0.97;
        const b = 2.02;

        for (let slice = 0; slice <= this.slices * 4; ++slice) {
            const theta = slice * dtheta;
            const ctheta = Math.cos(theta);
            const stheta = Math.sin(theta);

            for (let stack = 0; stack <= this.stacks; ++stack) {
                const t = dt * stack;
                const ct = Math.cos(t);
                const st = Math.sin(t);

                const x =
                    (1 / (2 * Math.sqrt(1 + k * k))) *
                    (((k * k - 1) / k) * b +
                        ((k * k + 1) / k) * Math.sqrt(b * b - 4 * k * ct));
                const y = (2 * st) / (b + Math.sqrt(b * b - 4 * k * ct));

                this.vertices.push(y * stheta * s, 2 - x, y * ctheta * s);
                this.texCoords.push(theta / (2 * Math.PI), t / Math.PI);

                if (slice > 0 && stack > 0)
                    this.indices.push(
                        slice * (this.stacks + 1) + stack,
                        (slice - 1) * (this.stacks + 1) + stack - 1,
                        (slice - 1) * (this.stacks + 1) + stack,
                        slice * (this.stacks + 1) + stack,
                        slice * (this.stacks + 1) + stack - 1,
                        (slice - 1) * (this.stacks + 1) + stack - 1
                    );
            }
        }

        let sumX = 0;
        let sumY = 0;
        let sumZ = 0;

        for (let i = 0; i < this.vertices.length; i += 3) {
            sumX += this.vertices[i];
            sumY += this.vertices[i + 1];
            sumZ += this.vertices[i + 2];
        }

        const avgX = sumX / (this.vertices.length / 3);
        const avgY = sumY / (this.vertices.length / 3);
        const avgZ = sumZ / (this.vertices.length / 3);

        for (let i = 0; i < this.vertices.length; i += 3) {
            this.vertices[i] -= avgX;
            this.vertices[i + 1] -= avgY;
            this.vertices[i + 2] -= avgZ;

            const norm = Math.sqrt(
                this.vertices[i] * this.vertices[i] +
                    this.vertices[i + 1] * this.vertices[i + 1] +
                    this.vertices[i + 2] * this.vertices[i + 2]
            );

            this.normals.push(
                this.vertices[i] / norm,
                this.vertices[i + 1] / norm,
                this.vertices[i + 2] / norm
            );
        }

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
}
