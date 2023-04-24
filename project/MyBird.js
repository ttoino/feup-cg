import { CGFobject } from "../lib/CGF.js";
import { MyWing } from "./MyWing.js";
import { MyBirdBody } from "./MyBirdBody.js"
import { MyBirdHead } from "./MyBirdHead.js"

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
        const birdColor = [0.2823529, 0.149, 0.05098]

        this.lWing = new MyWing(this.scene, birdColor);
        this.rWing = new MyWing(this.scene, birdColor);

        this.body = new MyBirdBody(this.scene, birdColor);

        this.head = new MyBirdHead(this.scene, birdColor);
    }

    displayWings() {
        this.scene.pushMatrix();
        this.scene.translate(0.45, 0.25, 0);
        this.lWing.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-0.45, 0.25, 0);
        this.scene.scale(-1, 1, 1);
        this.rWing.display();
        this.scene.popMatrix();
    }

    enableNormalViz() {
        this.lWing.enableNormalViz();
        this.rWing.enableNormalViz();
        this.body.enableNormalViz();
        this.head.enableNormalViz();
    }

    disableNormalViz() {
        this.lWing.disableNormalViz();
        this.rWing.disableNormalViz();
        this.body.disableNormalViz();
        this.head.disableNormalViz();
    }

    displayBody() {
        this.scene.pushMatrix();
        this.scene.translate(0, 0, 0.5);
        this.scene.scale(0.7, 0.7, 0.7);
        this.body.display();
        this.scene.popMatrix();
    }

    displayHead() {
        this.scene.pushMatrix();
        this.scene.translate(0, 0.5, 1.4);
        this.scene.scale(0.4, 0.4, 0.4)
        this.head.display();
        this.scene.popMatrix();
    }

    display() {
        this.displayWings();
        this.displayBody();
        this.displayHead();
    }
}
