import { CGFappearance, CGFobject, CGFtexture } from "../lib/CGF.js";
import { MyEgg } from "./primitives/MyEgg.js";

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
    constructor(scene, slices, stacks, position = [0, 0, 0], rotation = 0) {
        super(scene);
        
        this.egg = new MyEgg(this.scene, slices, stacks);
        this.position = position;
        this.rotation = rotation;
    }

    display() {
        this.scene.pushMatrix();
        this.scene.eggMaterial.apply();
        this.scene.translate(this.position[0], this.position[1] + .5, this.position[2]);
        this.scene.rotate(Math.PI * .5, 1, 0, 0);
        this.scene.rotate(this.rotation, 0, 0, 1);
        this.egg.display();
        this.scene.popMatrix();
    }
}
