import { CGFobject } from "../lib/CGF.js";
import { MyWing } from "./MyWing.js";
import { MyBirdBody } from "./MyBirdBody.js"

/**
 * MySphere
 * @constructor
 * @param scene - Reference to MyScene object
 * @param slices - number of divisions around the Y axis
 * @param stacks - number of divisions along the Y axis
 */
export class MyBird extends CGFobject {
    /**
     *
     * @param {CGFscene} scene
     */
    constructor(scene) {
        super(scene);
        this.initBuffers();
        this.lWing = new MyWing(this.scene);
        this.rWing = new MyWing(this.scene);

        this.body = new MyBirdBody(this.scene);
    }

    displayWings() {
        this.scene.pushMatrix();
        this.scene.translate(0.5, 0, 0);
        this.lWing.display();
        this.scene.popMatrix();
        
        this.scene.pushMatrix();
        this.scene.scale(-1, 1, 1);
        this.scene.translate(0.5, 0, 0);
        this.rWing.display();
        this.scene.popMatrix();

    }

    enableNormalViz() {
        this.lWing.enableNormalViz();
        this.rWing.enableNormalViz();
        this.body.enableNormalViz();
    }

    disableNormalViz() {
        this.lWing.disableNormalViz();
        this.rWing.disableNormalViz();
        this.body.disableNormalViz();
    }

    displayBody() {
        this.scene.pushMatrix();
        this.scene.translate(0, 0, 0.5);
        this.body.display();
        this.scene.popMatrix();
    }

    display() {
        this.displayWings();
        this.displayBody();
    }
}
