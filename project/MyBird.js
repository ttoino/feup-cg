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
    constructor(scene, startingX = 0, startingY = 0, startingZ = 0, birdSpeed = 5) {
        super(scene);

        this.initBuffers();
        const birdColor = [0.2823529, 0.149, 0.05098]

        this.lWing = new MyWing(this.scene, birdColor);
        this.rWing = new MyWing(this.scene, birdColor);

        this.body = new MyBirdBody(this.scene, birdColor);

        this.head = new MyBirdHead(this.scene, birdColor);

        this.xPos = startingX;
        this.yPos = startingY;
        this.zPos = startingZ;

        this.birdSpeed = birdSpeed;
    }

    displayWings() {
        this.scene.pushMatrix();
        this.scene.translate(0.4, 0.25, -.1);
        this.lWing.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-0.4, 0.25, -.1);
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
        this.scene.translate(0, 0.45, 1.3);
        this.scene.scale(0.4, 0.4, 0.4)
        this.head.display();
        this.scene.popMatrix();
    }

    update(timeSinceAppStart) {
        this.yPos = 0.5*Math.sin(timeSinceAppStart*Math.PI*1.5);
    }

    display() {
        this.scene.pushMatrix();
        this.scene.translate(this.xPos, this.yPos, this.zPos);

        this.displayWings();
        this.displayBody();
        this.displayHead();

        this.scene.popMatrix();
    }
}
