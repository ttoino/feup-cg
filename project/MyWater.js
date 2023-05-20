import { CGFobject, CGFappearance, CGFtexture, CGFshader } from '../lib/CGF.js';
import { MyPlane } from "./primitives/MyPlane.js";

/**
 * MyWater
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyWater extends CGFobject {
    /**
     * 
     * @param {CGFscene} scene 
     * @param {number} n
     * @param {number} scaleFactor
     */
    constructor(scene, n, scaleFactor, textureScale) {
        super(scene);

        //Initialize objects
        this.plane = new MyPlane(scene, n);

        this.shader = new CGFshader(
            scene.gl,
            "shaders/water.vert",
            "shaders/water.frag"
        );
        this.shader.applyUniforms({
            uScaleFactor: scaleFactor,
            uTextureScale: textureScale,
        });
    }

    display() {
        this.scene.setActiveShader(this.shader);
        this.shader.setUniformsValues({
            uTime: (this.scene.lastUpdateTime - this.scene.appStartTime)/10000.0,
        });

        this.scene.pushMatrix();
        this.scene.waterMaterial.apply();
        this.scene.translate(this.scene.camera.position[0], this.scene.waterPos, this.scene.camera.position[2]);
        this.scene.scale(this.scene.terrainSize * 2, this.scene.terrainSize * 2, this.scene.terrainSize * 2);
        this.scene.rotate(-Math.PI / 2.0, 1, 0, 0);
        this.plane.display();
        this.scene.popMatrix();

        this.scene.setActiveShader(this.scene.defaultShader);
    }
}
