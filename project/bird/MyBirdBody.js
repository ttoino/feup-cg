import { CGFobject, CGFappearance } from '../../lib/CGF.js';
import { MyEgg } from '../primitives/MyEgg.js';

/**
 * MyTriangleSmall
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyBirdBody extends CGFobject {
    constructor(scene) {
        super(scene);

        this.body = new MyEgg(this.scene, 20, 20);
    }

    enableNormalViz() {
        this.body.enableNormalViz();
    }
    
    disableNormalViz() {
        this.body.disableNormalViz();
    }

    display() {
        this.scene.birdBodyMaterial.apply();

        this.scene.pushMatrix();
        this.scene.rotate(4 * Math.PI / 3, 1, 0, 0);
        // TODO: make more horizontal
        this.scene.scale(1.5, 1.5, 1.5);
        this.body.display();
        this.scene.popMatrix();
    }
}

