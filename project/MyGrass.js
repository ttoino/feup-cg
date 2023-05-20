import { CGFappearance, CGFobject, CGFscene, CGFtexture } from "../lib/CGF.js";
import { MyBillboard } from "./MyBillboard.js";

/**
 * MyGrass
 * @constructor
 * @param {CGFscene} scene - Reference to MyScene object
 * @param {number} x
 * @param {number} y
 * @param {number} z
 */
export class MyGrass extends CGFobject {
    /**
     * @param {CGFscene} scene
     * @param {number} x
     * @param {number} y
     * @param {number} z
     */
    constructor(scene, x, y, z) {
        super(scene);

        this.billboard = new MyBillboard(scene, 1, x, y, z);
    }

    display() {
        this.scene.pushMatrix();
        this.scene.translate(...this.billboard.position)
        this.scene.scale(4, 4, 4);
        this.scene.translate(0, 0.5, 0);
        this.scene.translate(
            -this.billboard.position[0],
            -this.billboard.position[1],
            -this.billboard.position[2]
        );
        this.scene.grassMaterial.apply();
        this.billboard.display();
        this.scene.popMatrix();
    }
}
