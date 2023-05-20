import { CGFappearance, CGFobject, CGFtexture } from "../lib/CGF.js";
import { MyEgg } from "./MyEgg.js";

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
        
        this.egg = new MyEgg(this.scene, slices, stacks);
    }

    display() {
        this.scene.eggMaterial.apply();
        this.egg.display();
    }
}
