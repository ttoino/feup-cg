import { CGFobject } from '../lib/CGF.js';
import { MyQuad } from './MyQuad.js';
/**
 * MyTriangleSmall
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyUnitCubeQuad extends CGFobject {
    constructor(scene) {
        super(scene);
        this.quad = new MyQuad(this.scene);
    }

    displayQuad() {
        this.scene.pushMatrix();
        this.scene.translate(0, 0, 0.5);
        this.quad.display();
        this.scene.popMatrix();
    }

    display() {

        // super.display();

        this.displayQuad();
        this.scene.rotate(Math.PI / 2, 1, 0, 0);
        this.displayQuad();
        this.scene.rotate(Math.PI / 2 , 1, 0, 0);
        this.displayQuad();
        this.scene.rotate(Math.PI / 2, 1, 0, 0);
        this.displayQuad();
        this.scene.rotate(Math.PI / 2 , 0, 1, 0);
        this.displayQuad()
        this.scene.rotate(Math.PI , 0, 1, 0);
        this.displayQuad()
    }
}

