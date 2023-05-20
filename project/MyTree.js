import { CGFappearance, CGFobject, CGFscene, CGFtexture } from "../lib/CGF.js";
import { MyBillboard } from "./MyBillboard.js";

/**
 * MyTree
 * @constructor
 * @param {CGFscene} scene - Reference to MyScene object
 * @param {CGFtexture} texture
 * @param {number} x
 * @param {number} y
 * @param {number} z
 */
export class MyTree extends CGFobject {
    /**
     * @param {CGFscene} scene
     * @param {CGFtexture} texture
     * @param {number} x
     * @param {number} y
     * @param {number} z
     */
    constructor(scene, x, y, z) {
        super(scene);

        this.billboard = new MyBillboard(scene, 1, x, y, z);
        this.billboardL = new MyBillboard(scene, 1, x, y, z, Math.PI / 3);
        this.billboardR = new MyBillboard(scene, 1, x, y, z, -Math.PI / 3);
    }

    display() {
        this.scene.pushMatrix();
        this.scene.translate(...this.billboard.position)
        this.scene.scale(10, 17.35, 10);
        this.scene.translate(0, 0.5, 0);
        this.scene.translate(
            -this.billboard.position[0],
            -this.billboard.position[1],
            -this.billboard.position[2]
            );
        this.scene.treeMaterial.apply();
        this.billboard.display();
        this.billboardL.display();
        this.billboardR.display();
        this.scene.popMatrix();
    }
}
