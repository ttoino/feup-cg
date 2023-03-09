import { CGFobject } from '../lib/CGF.js';
import { MyDiamond } from './MyDiamond.js';
import { MyParallelogram } from './MyParallelogram.js';
import { MyTriangle } from './MyTriangle.js';
import { MyTriangleBig } from './MyTriangleBig.js';
import { MyTriangleSmall } from './MyTriangleSmall.js';

/**
 * MyTriangle
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyTangram extends CGFobject {
    constructor(scene) {
        super(scene);

        this.normals = [];

        //Initialize objects
        this.diamond = new MyDiamond(scene);
        this.triangle = new MyTriangle(scene);
        this.parallelogram = new MyParallelogram(scene);
        this.triangleSmall = new MyTriangleSmall(scene);
        this.triangleBig = new MyTriangleBig(scene);
    }

    display() {
        this.scene.pushMatrix()
        this.scene.multMatrix([
            1,  0,  0,  0,
            0,  1,  0,  0,
            0,  0,  1,  0,
            -1, 0,  0,  1,
        ]);
        this.diamond.display()
        this.scene.popMatrix()

        this.scene.pushMatrix()
        this.scene.rotate(Math.PI, 0, 1, 0);
        this.scene.rotate(Math.PI/3, 0, 0, 1);
        this.parallelogram.display()
        this.scene.popMatrix()

        this.scene.pushMatrix()
        this.scene.translate(1, 0, 0);
        this.triangleSmall.display()
        this.scene.popMatrix()

        this.scene.pushMatrix()
        this.scene.translate(-2, -1, 0);
        this.scene.rotate(-Math.PI/2, 0, 0, 1);
        this.triangleSmall.display()
        this.scene.popMatrix()

        this.scene.pushMatrix()
        this.scene.translate(1, -1, 0);
        this.scene.rotate(Math.PI, 0, 0, 1);
        this.triangle.display()
        this.scene.popMatrix()

        this.scene.pushMatrix()
        this.scene.translate(0, -2, 0);
        this.scene.rotate(-Math.PI/2, 0, 0, 1);
        this.triangleBig.display()
        this.scene.popMatrix()

        this.scene.pushMatrix()
        this.scene.translate(0, -2, 0);
        this.scene.rotate(Math.PI/2, 0, 0, 1);
        this.triangleBig.display()
        this.scene.popMatrix()
    }

    /**
     * Called when user interacts with GUI to change object's complexity.
     * @param {integer} complexity - changes number of nDivs
     */
    updateBuffers(complexity) {}

    enableNormalViz() {
        this.diamond.enableNormalViz();
        this.parallelogram.enableNormalViz();
        this.triangle.enableNormalViz();
        this.triangleBig.enableNormalViz();
        this.triangleSmall.enableNormalViz();
    }

    disableNormalViz() {
        this.diamond.disableNormalViz();
        this.parallelogram.disableNormalViz();
        this.triangle.disableNormalViz();
        this.triangleBig.disableNormalViz();
        this.triangleSmall.disableNormalViz();
    }

}

