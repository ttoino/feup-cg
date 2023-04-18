import { CGFobject, CGFappearance } from "../lib/CGF.js";
import { MyCone } from "./MyCone.js";
import { MySphere } from "./MySphere.js";
import { MyUnitCubeQuad } from "./MyUnitCubeQuad.js";

export class MyBirdHead extends CGFobject {
    constructor(scene, headColor) {
        super(scene);

        this.lEye = new MySphere(this.scene, 10, 10, false, false);
        this.rEye = new MySphere(this.scene, 10, 10, false, false);

        this.beak = new MyCone(this.scene, 25, 20);

        this.head = new MySphere(this.scene, 10, 10, false, false);

        /////////////////////////////////////////////////////

        this.eyeMaterial = new CGFappearance(this.scene);

        this.eyeMaterial.setAmbient(1, 1, 1, 1);
        this.eyeMaterial.setDiffuse(1, 1, 1, 1);
        this.eyeMaterial.setSpecular(1, 1, 1, 1);
        this.eyeMaterial.setShininess(250.0);

        //////////////////////////////////////////////////////

        this.breakMaterial = new CGFappearance(this.scene);

        this.breakMaterial.setAmbient(0.996, 0.745, 0, 1);
        this.breakMaterial.setDiffuse(0.996, 0.745, 0, 1);
        this.breakMaterial.setSpecular(0.996, 0.745, 0, 1);
        this.breakMaterial.setShininess(100.0);

        //////////////////////////////////////////////////////

        this.headMaterial = new CGFappearance(this.scene);
        
        this.headMaterial.setAmbient(...headColor, 1);
        this.headMaterial.setDiffuse(...headColor, 1);
        this.headMaterial.setSpecular(...headColor, 1);
        this.headMaterial.setShininess(100.0);
    }

    displayEyes() {

        this.eyeMaterial.apply();

        this.scene.pushMatrix();
        this.scene.scale(0.3, 0.3, 0.3);

        this.scene.pushMatrix();
        this.scene.translate(1.9, 1.9, 1.9);
        this.lEye.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-1.9, 1.9, 1.9);
        this.rEye.display();
        this.scene.popMatrix();

        this.scene.popMatrix();
    }

    displayBeak() {
        this.breakMaterial.apply();

        this.scene.pushMatrix();
        this.scene.translate(0, 0, 0.9);
        this.scene.rotate(Math.PI / 2, 1, 0, 0);
        this.scene.scale(0.4, 1, 0.4);
        this.beak.display();
        this.scene.popMatrix();
    }

    display() {

        this.headMaterial.apply();
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