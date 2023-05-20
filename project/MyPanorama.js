import { CGFobject, CGFappearance, CGFtexture } from '../lib/CGF.js';
import { MySphere } from "./primitives/MySphere.js";

/**
 * MyPanorama
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyPanorama extends CGFobject {
    /**
     * 
     * @param {CGFscene} scene 
     */
    constructor(scene) {
        super(scene);

        //Initialize objects
        this.sphere = new MySphere(scene, 50, 50, true);
    }

    display() {
        this.scene.panoramaMaterial.apply();

        this.scene.pushMatrix();
        
        this.scene.translate(this.scene.camera.position[0], this.scene.terrainPos, this.scene.camera.position[2]);
        this.scene.scale(this.scene.terrainSize, this.scene.terrainSize, this.scene.terrainSize);
        
        this.sphere.display();

        this.scene.popMatrix();
    }
}
