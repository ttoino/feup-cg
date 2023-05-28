import { CGFobject } from "../../lib/CGF.js";
import { MyBirdWing } from "./MyBirdWing.js";
import { MyBirdBody } from "./MyBirdBody.js"
import { MyBirdHead } from "./MyBirdHead.js"
import { MyBirdLeg } from "./MyBirdLeg.js";
import { dist } from "../MyMath.js";

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
    constructor(scene, startingX = 0, startingY = 0, startingZ = 0, birdSpeed = 0, startingYRotation = 0) {
        super(scene);

        this.initBuffers();

        this.lWing = new MyBirdWing(this.scene);
        this.rWing = new MyBirdWing(this.scene, true);

        this.lLeg = new MyBirdLeg(this.scene);
        this.rLeg = new MyBirdLeg(this.scene);

        this.body = new MyBirdBody(this.scene);

        this.head = new MyBirdHead(this.scene);

        this.xPos = startingX;
        this.yPos = startingY;
        this.zPos = startingZ;

        this.startingXPos = startingX;
        this.startingYPos = startingY;
        this.startingZPos = startingZ;

        this.scaleFactor = 1;
        this.speedFactor = 1;

        this.birdYaw = startingYRotation;

        this.startingYRotation = startingYRotation;

        this.birdRoll = 0;
        this.desiredBirdRoll = 0;
        this.turning = false;

        this.birdPitch = 0;
        this.changingHeight = false;

        this.birdSpeed = birdSpeed;
        this.lastUpdate = -1;

        this.egg = undefined;

        this.pickingEgg = false;
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
        this.scene.rotate(Math.PI / 8, 0, 0, 1);
        this.scene.translate(0, -1, 0);
        this.lLeg.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.rotate(-Math.PI / 8, 0, 0, 1);
        this.scene.translate(0, -1, 0);
        this.rLeg.display();
        this.scene.popMatrix();
    }

    startPickup() {
        this.pickingEgg = true;
    }

    dropEgg() {
        const distToNest = dist([this.xPos, this.yPos, this.zPos], this.scene.nest.position);

        if (distToNest < 10 && this.egg) {

            this.egg.position = [this.xPos, this.yPos - this.scaleFactor, this.zPos];

            this.scene.nest.addEgg(this.egg);
            this.egg = undefined;
        }
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
        if (!this.pickingEgg)
            this.birdYaw += amount * 0.03 * Math.max(this.birdSpeed, 50) * this.speedFactor;
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

    animatePickup(delta) {
        if (this.animationStartingHeight == null || this.animationStartingHeight == undefined) {
            this.animationStartingHeight = this.yPos;
            this.heightDiff = this.yPos - Math.max(this.scene.getHeight(this.xPos, this.zPos), this.scene.minPos);
        }

        if (this.animationTime == null || this.animationTime == undefined) this.animationTime = 0;
    
        this.startingYPos = this.animationStartingHeight + this.heightDiff * (((Math.cos(Math.PI * this.animationTime) + 1) / 2) - 1);

        if (this.startingYPos < Math.max(this.scene.getHeight(this.xPos, this.zPos), this.scene.minPos) + 3) {
            // we are near the ground

            if (!this.egg) {
                const i = this.scene.eggs.findIndex((egg) => dist(egg.position, [this.xPos, this.yPos, this.zPos]) < 5);
        
                if (i !== -1) {
                    this.egg = this.scene.eggs[i];
                    this.scene.eggs.splice(i, 1);
                }
            }
        }

        if (this.animationTime >= 2) {
            delete this.animationTime;
            delete this.animationStartingHeight;
            delete this.heightDiff;

            this.pickingEgg = false;
            return;
        }
        
        this.animationTime += delta;
    }

    update(timeSinceAppStart) {
        if (this.lastUpdate === -1) {
            this.lastUpdate = timeSinceAppStart;
        } else {
            this.startingYPos = Math.max(this.startingYPos, this.scene.getHeight(this.xPos, this.zPos) + 3, this.scene.minPos);

            const delta = timeSinceAppStart - this.lastUpdate;
            this.lastUpdate = timeSinceAppStart;

            const displacement = this.birdSpeed * delta * 0.5  * this.speedFactor;

            this.zPos += displacement * Math.cos(this.birdYaw);
            this.xPos += displacement * Math.sin(this.birdYaw);
            this.yPos = this.startingYPos + ((this.turning || this.pickingEgg) ? 0 : 1) * 0.1 * Math.sin(timeSinceAppStart * Math.PI * 1.5);

            if (this.egg)
                this.egg.position = [0, 0, 0];

            this.lWing.turning = this.turning;
            this.rWing.turning = this.turning;

            if (this.pickingEgg) {
                // need to change yPos to reflect the animation
                this.animatePickup(delta);
            } else {
                if (this.droppingEgg) {
    
                }
                
                this.updateRoll();
                this.updatePitch();
            }

            this.lWing.update(timeSinceAppStart);
            this.rWing.update(timeSinceAppStart);
        }
    }

    display() {
        this.scene.pushMatrix();

        this.scene.translate(this.xPos, this.yPos, this.zPos);
        this.scene.scale(this.scaleFactor, this.scaleFactor, this.scaleFactor);
        this.scene.rotate(this.birdYaw, 0, 1, 0);
        this.scene.rotate(this.birdRoll, 0, 0, 1);
        this.scene.rotate(this.birdPitch, 1, 0, 0);

        if (this.egg) {

            this.scene.pushMatrix();

            this.scene.translate(0, -1, 0)

            this.egg.display();
            this.scene.popMatrix();
        }

        this.displayWings();
        this.displayBody();
        this.displayHead();
        this.displayLegs();

        this.scene.popMatrix();
    }
}
