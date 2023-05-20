import { CGFobject, CGFappearance } from "../../lib/CGF.js";
import { MyCone } from "../primitives/MyCone.js";
import { MySphere } from "../primitives/MySphere.js";

export class MyBirdHead extends CGFobject {
    constructor(scene, headColor) {
        super(scene);

        this.lEye = new MySphere(this.scene, 5, 5);
        this.rEye = new MySphere(this.scene, 5, 5);

        this.beak = new MyCone(this.scene, 20, 5);

        this.head = new MySphere(this.scene, 10, 10);
    }

    displayEyes() {
        this.scene.birdEyeMaterial.apply();

        this.scene.pushMatrix();
        this.scene.scale(0.3, 0.3, 0.3);

        const p = 1.7;

        this.scene.pushMatrix();
        this.scene.translate(p, p, p);
        this.scene.rotate(-Math.PI/3, 0, 1, 0);
        this.lEye.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-p, p, p);
        this.scene.rotate(-2 * Math.PI / 3, 0, 1, 0);
        this.rEye.display();
        this.scene.popMatrix();

        this.scene.popMatrix();
    }

    displayBeak() {
        this.scene.birdBeakMaterial.apply();

        this.scene.pushMatrix();
        this.scene.translate(0, 0, 0.9);
        this.scene.rotate(Math.PI / 2, 1, 0, 0);
        this.scene.scale(0.4, 1, 0.4);
        this.beak.display();
        this.scene.popMatrix();
    }

    display() {
        this.scene.birdHeadMaterial.apply();
        this.head.display();

        this.displayEyes();

        this.displayBeak();
    }

    enableNormalViz() {
        this.lEye.enableNormalViz();
        this.rEye.enableNormalViz();
        this.beak.enableNormalViz();
        this.head.enableNormalViz();
    }

    disableNormalViz() {
        this.lEye.disableNormalViz();
        this.rEye.disableNormalViz();
        this.beak.disableNormalViz();
        this.head.disableNormalViz();
    }
}