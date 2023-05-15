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

        this.appearance = new CGFappearance(this.scene);
        this.appearance.setAmbient(0.3, 0.3, 0.3, 1);
        this.appearance.setDiffuse(0.7, 0.7, 0.7, 1);
        this.appearance.setTexture(
            new CGFtexture(this.scene, "images/egg.jpg")
        );
    }

    display() {
        this.appearance.apply();
        super.egg.display();
    }
}
