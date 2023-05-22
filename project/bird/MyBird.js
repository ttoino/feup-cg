import { CGFobject } from "../../lib/CGF.js";
import { MyBirdWing } from "./MyBirdWing.js";
import { MyBirdBody } from "./MyBirdBody.js"
import { MyBirdHead } from "./MyBirdHead.js"
import { MyBirdLeg } from "./MyBirdLeg.js";

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
    constructor(scene, startingX = 0, startingY = 0, startingZ = 0, birdSpeed = 0, startingYRotation = 0, eggs = []) {
        super(scene);

        this.initBuffers();
        const birdColor = [150/255, 75/255, 0/255]

        this.lWing = new MyBirdWing(this.scene, birdColor);
        this.rWing = new MyBirdWing(this.scene, birdColor);

        this.lLeg = new MyBirdLeg(this.scene);
        this.rLeg = new MyBirdLeg(this.scene);

        this.body = new MyBirdBody(this.scene, birdColor);

        this.head = new MyBirdHead(this.scene, birdColor);

        this.xPos = startingX;
        this.yPos = startingY;
        this.zPos = startingZ;

        this.startingXPos = startingX;
        this.startingYPos = startingY;
        this.startingZPos = startingZ;

        this.birdYaw = startingYRotation;

        this.startingYRotation = startingYRotation;

        this.birdRoll = 0;
        this.desiredBirdRoll = 0;
        this.turning = false;

        this.birdPitch = 0;
        this.changingHeight = false;

        this.birdSpeed = birdSpeed;
        this.lastUpdate = -1;

        this.hasEgg = false;
        this.eggs = eggs;
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
        this.lLeg.enableNormalViz();
        this.rLeg.enableNormalViz();
        this.body.enableNormalViz();
        this.head.enableNormalViz();
    }

    disableNormalViz() {
        this.lWing.disableNormalViz();
        this.rWing.disableNormalViz();
        this.lLeg.disableNormalViz();
        this.rLeg.disableNormalViz();
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

    displayLegs() {
        this.scene.pushMatrix();
        this.scene.rotate(Math.PI/8, 0, 0, 1);
        this.scene.translate(0, -1, 0);
        this.lLeg.display();
        this.scene.popMatrix();
        
        this.scene.pushMatrix();
        this.scene.rotate(-Math.PI/8, 0, 0, 1);
        this.scene.translate(0, -1, 0);
        this.rLeg.display();
        this.scene.popMatrix();
    }

    accelerate(amount) {
        this.birdSpeed += amount;

        if (this.birdSpeed < 0) {
            this.birdSpeed = 0;
        }
    }
    
    lift(amount) {
        this.desiredBirdPitch = Math.PI / 5 * (amount < 0 ? 1 : -1) * Math.abs(Math.tanh(this.birdSpeed));
        this.startingYPos += amount * Math.abs(Math.atan(this.birdSpeed / 10)) * 3;
        this.changingHeight = true;
    }

    turn(amount) {
        this.birdYaw += amount * 0.03 * Math.max(this.birdSpeed, 50);
        this.desiredBirdRoll = Math.PI / 4 * (amount < 0 ? 1 : -1);
        this.turning = true;
    }

    reset() {
        this.birdSpeed = 0;
        this.xPos = this.startingXPos;
        this.yPos = this.startingYPos;
        this.zPos = this.startingZPos;
        this.birdYaw = this.startingYRotation;
        this.desiredBirdRoll = 0;
        this.turning = false;
    }

    updateRoll() {
        if (this.turning) {
            const delta = this.desiredBirdRoll - this.birdRoll;
            this.birdRoll += delta * 0.1;
            if (Math.abs(delta) < 0.01) {
                this.birdRoll = this.desiredBirdRoll;
            }
        } else {
            const delta = 0 - this.birdRoll;
            this.birdRoll += delta * 0.1;
            if (Math.abs(this.birdRoll) < 0.01) {
                this.birdRoll = 0;
            }
        }
        this.turning = false;
    }

    updatePitch() {
        if (this.changingHeight) {
            const delta = this.desiredBirdPitch - this.birdPitch;
            this.birdPitch += delta * 0.1;
            if (Math.abs(delta) < 0.01) {
                this.birdPitch = this.desiredBirdPitch;
            }
        } else {
            const delta = 0 - this.birdPitch;
            this.birdPitch += delta * 0.1;
            if (Math.abs(this.birdPitch) < 0.01) {
                this.birdPitch = 0;
            }
        }
        this.changingHeight = false;
    }

    update(timeSinceAppStart) {
        if (this.lastUpdate === -1) {
            this.lastUpdate = timeSinceAppStart;
        } else {

            const delta = timeSinceAppStart - this.lastUpdate;
            this.lastUpdate = timeSinceAppStart;

            const displacement = this.birdSpeed * delta * 0.5

            this.zPos += displacement * Math.cos(this.birdYaw);
            this.xPos += displacement * Math.sin(this.birdYaw);
            this.yPos = this.startingYPos + (this.turning ? 0 : 1) * 0.1 * Math.sin(timeSinceAppStart * Math.PI * 1.5);

            this.lWing.turning = this.turning;
            this.rWing.turning = this.turning;

            this.updateRoll();
            this.updatePitch();

            this.lWing.update(timeSinceAppStart);
            this.rWing.update(timeSinceAppStart);
        }
    }

    display() {
        this.scene.pushMatrix();
        this.scene.translate(this.xPos, this.yPos, this.zPos);
        this.scene.rotate(this.birdYaw, 0, 1, 0);
        this.scene.rotate(this.birdRoll, 0, 0, 1);
        this.scene.rotate(this.birdPitch, 1, 0, 0);

        this.displayWings();
        this.displayBody();
        this.displayHead();
        this.displayLegs();

        this.scene.popMatrix();
    }
}
