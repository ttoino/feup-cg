import { CGFobject, CGFappearance } from '../lib/CGF.js';
import { MyCylinder } from './MyCylinder.js';
import { MySphere } from './MySphere.js';
import { MyUnitCubeQuad } from './MyUnitCubeQuad.js';
/**
 * MyTriangleSmall
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyBirdBody extends CGFobject {
    constructor(scene, bodyColor) {
        super(scene);

        this.front = new MySphere(this.scene, 10, 10, false, false);
        this.middle = new MyCylinder(this.scene, 50, 50)
        this.back = new MySphere(this.scene, 10, 10, false, false);

        this.bodyMaterial = new CGFappearance(this.scene);
        
        this.bodyMaterial.setAmbient(...bodyColor, 1);
        this.bodyMaterial.setDiffuse(...bodyColor, 1);
        this.bodyMaterial.setSpecular(0, 0, 0, 0);
        this.bodyMaterial.setShininess(10.0);
    }

    enableNormalViz() {
        this.front.enableNormalViz();
        this.middle.enableNormalViz();
        this.back.enableNormalViz();
    }
    
    disableNormalViz() {
        this.front.disableNormalViz();
        this.middle.disableNormalViz();
        this.back.disableNormalViz();
    }

    display() {
        this.bodyMaterial.apply();

        this.scene.pushMatrix();
        this.scene.translate(0, 0, 0.5)
        this.front.display();
        this.scene.popMatrix();
        
        this.scene.pushMatrix();
        this.scene.translate(0, 0, -0.5)
        this.scene.scale(1.0001, 1.0001, 1.0001)
        this.middle.display();
        this.scene.popMatrix();
        
        this.scene.pushMatrix();
        this.scene.translate(0, 0, -0.5)
        this.back.display();
        this.scene.popMatrix();
    }
}

