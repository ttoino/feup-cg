import { CGFobject } from "../../lib/CGF.js";
import { MyQuad } from "../primitives/MyQuad.js";

/**
 * MyBillboard
 * @constructor
 * @param scene - Reference to MyScene object
 * @param {number} n - Number of divisions in the billboard
 * @param {boolean} x
 * @param {boolean} y
 * @param {boolean} z
 */
export class MyBillboard extends CGFobject {
    /**
     * @param scene
     * @param {number} n
     * @param {number} x
     * @param {number} y
     * @param {number} z
     * @param {number} angle
     */
    constructor(scene, n, x, y, z, angle = 0) {
        super(scene);

        //Initialize objects
        this.plane = new MyQuad(scene, n);

        this.position = vec3.fromValues(x, y, z);
        this.normal = vec3.fromValues(0, 0, 1);
        this.angle = angle;
    }

    display() {
        this.scene.pushMatrix();

        this.scene.translate(...this.position);

        const vec = vec3.create();
        vec3.sub(vec, this.scene.camera.position, this.position);
        vec[1] = 0;
        vec3.normalize(vec, vec);
        const axis = vec3.create();
        vec3.cross(axis, this.normal, vec);
        vec3.normalize(axis, axis);
        const angle = Math.acos(vec3.dot(this.normal, vec)) + this.angle;
        this.scene.rotate(angle, ...axis);

        this.plane.display();

        this.scene.popMatrix();
    }
}