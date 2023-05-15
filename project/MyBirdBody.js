import { CGFobject, CGFappearance } from '../lib/CGF.js';
import { MyEgg } from './MyEgg.js';

/**
 * MyTriangleSmall
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyBirdBody extends CGFobject {
    constructor(scene, bodyColor) {
        super(scene);

        this.body = new MyEgg(this.scene, 50, 50);

        this.bodyMaterial = new CGFappearance(this.scene);
        
        this.bodyMaterial.setAmbient(...bodyColor, 1);
        this.bodyMaterial.setDiffuse(...bodyColor, 1);
        this.bodyMaterial.setSpecular(0, 0, 0, 0);
        this.bodyMaterial.setShininess(10.0);
    }

    enableNormalViz() {
        this.body.enableNormalViz();
    }
    
    disableNormalViz() {
        this.body.disableNormalViz();
    }

    display() {
        this.bodyMaterial.apply();

        this.scene.pushMatrix();
        this.scene.rotate(4 * Math.PI / 3, 1, 0, 0);
        // TODO: make more horizontal
        this.scene.scale(1.5, 1.5, 1.5);
        this.body.display();
        this.scene.popMatrix();
    }
}

