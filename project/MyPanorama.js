import { CGFobject, CGFappearance, CGFtexture } from '../lib/CGF.js';
import { MySphere } from "./MySphere.js";

/**
 * MyTriangle
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyPanorama extends CGFobject {
    /**
     * 
     * @param {CGFscene} scene 
     * @param {CGFtexture} texture 
     */
    constructor(scene, texture) {
        super(scene);

        //Initialize objects
        this.sphere = new MySphere(scene, 50, 50, true);

        this.material = new CGFappearance(scene);
        this.material.setEmission(1, 1, 1, 1);
        this.material.setTexture(texture);
    }

    display() {
        this.material.apply();

        this.scene.pushMatrix();        
        
        this.scene.translate(...this.scene.camera.position);
        this.scene.scale(200, 200, 200);
        
        this.sphere.display();

        this.scene.popMatrix();
    }
}

