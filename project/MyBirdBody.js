import { CGFobject } from '../lib/CGF.js';
import { MyUnitCubeQuad } from './MyUnitCubeQuad.js';
/**
 * MyTriangleSmall
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyBirdBody extends CGFobject {
    constructor(scene) {
        super(scene);
        this.body = new MyUnitCubeQuad(this.scene);
    }

    enableNormalViz() {
        this.body.enableNormalViz();
    }
    
    disableNormalViz() {
        this.body.disableNormalViz();
    }

    display() {
        this.body.display();
    }
}

