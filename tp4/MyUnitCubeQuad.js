import { CGFappearance, CGFobject } from '../lib/CGF.js';
import { MyQuad } from './MyQuad.js';
/**
 * MyTriangleSmall
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyUnitCubeQuad extends CGFobject {
    constructor(scene, top, front, right, back, left, bottom) {
        super(scene);
        this.quad = new MyQuad(this.scene);

        this.top = this.createMaterial(scene, top);
        this.front = this.createMaterial(scene, front);
        this.right = this.createMaterial(scene, right);
        this.back = this.createMaterial(scene, back);
        this.left = this.createMaterial(scene, left);
        this.bottom = this.createMaterial(scene, bottom);
    }

    createMaterial(scene, texture) {
        const material = new CGFappearance(scene);
        material.setAmbient(0.1, 0.1, 0.1, 1);
        material.setDiffuse(0.9, 0.9, 0.9, 1);
        material.setSpecular(0.1, 0.1, 0.1, 1);
        material.setShininess(10.0);
        material.loadTexture(texture);
        return material;
    }

    displayQuad() {
        this.scene.pushMatrix();
        this.scene.translate(0, 0, 0.5);
        this.quad.display();
        this.scene.popMatrix();
    }

    apply(material) {
        material.apply();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
    }

    display() {

        // super.display();

        this.apply(this.front);
        this.displayQuad();
        this.scene.rotate(Math.PI / 2, 0, 1, 0);
        this.apply(this.right);
        this.displayQuad();
        this.scene.rotate(Math.PI / 2 , 0, 1, 0);
        this.apply(this.back);
        this.displayQuad();
        this.scene.rotate(Math.PI / 2, 0, 1, 0);
        this.apply(this.left);
        this.displayQuad();
        this.scene.rotate(Math.PI / 2, 0, 1, 0);
        this.scene.rotate(Math.PI / 2 , 1, 0, 0);
        this.apply(this.bottom);
        this.displayQuad()
        this.scene.rotate(Math.PI, 1, 0, 0);
        this.apply(this.top);
        this.displayQuad()
    }
}

