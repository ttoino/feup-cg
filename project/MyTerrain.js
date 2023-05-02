import { CGFobject, CGFappearance, CGFtexture, CGFshader } from '../lib/CGF.js';
import { MyPlane } from "./MyPlane.js";

/**
 * MyTriangle
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyTerrain extends CGFobject {
    /**
     * 
     * @param {CGFscene} scene 
     * @param {number} n
     * @param {CGFtexture} texture 
     * @param {CGFtexture} heightMap
     * @param {CGFtexture} altimetry
     */
    constructor(scene, n, scaleFactor, texture, heightMap, altimetry) {
        super(scene);

        //Initialize objects
        this.plane = new MyPlane(scene, n);

        this.material = new CGFappearance(scene);
        this.material.setTexture(texture);

        this.shader = new CGFshader(
            scene.gl,
            "shaders/terrain.vert",
            "shaders/terrain.frag"
        );
        this.shader.applyUniforms({
            uScaleFactor: scaleFactor,
            uHeightSampler: 1,
            uAltimetrySampler: 2,
        });

        this.texture = texture;
        this.heightMap = heightMap;
        this.altimetry = altimetry;
    }

    display() {
        this.material.apply();
        this.scene.setActiveShader(this.shader);

        this.texture.bind(0);
        this.heightMap.bind(1);
        this.altimetry.bind(2);

        this.scene.pushMatrix();
        this.plane.display();
        this.scene.popMatrix();

        this.scene.setActiveShader(this.scene.defaultShader);
    }
}
