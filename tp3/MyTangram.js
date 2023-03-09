import { CGFobject, CGFappearance } from '../lib/CGF.js';
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
    
        this.yellow = new CGFappearance(this.scene);
        this.yellow.setAmbient(.5, .5, 0, 1.0);
        this.yellow.setDiffuse(.5, .5, 0, 1.0);
        this.yellow.setSpecular(1, 1, 0, 1.0);
        this.yellow.setShininess(8.0);

        this.green = new CGFappearance(this.scene);
        this.green.setAmbient(0, .5, 0, 1.0);
        this.green.setDiffuse(0, .5, 0, 1.0);
        this.green.setSpecular(0, 1, 0, 1.0);
        this.green.setShininess(8.0);

        this.red = new CGFappearance(this.scene);
        this.red.setAmbient(.5, 0, 0, 1.0);
        this.red.setDiffuse(.5, 0, 0, 1.0);
        this.red.setSpecular(1, 0, 0, 1.0);
        this.red.setShininess(8.0);

        this.blue = new CGFappearance(this.scene);
        this.blue.setAmbient(0, 0, .5, 1.0);
        this.blue.setDiffuse(0, 0, .5, 1.0);
        this.blue.setSpecular(0, 0, 1, 1);
        this.blue.setShininess(8.0);

        this.orange = new CGFappearance(this.scene);
        this.orange.setAmbient(.5, .26, 0, 1.0);
        this.orange.setDiffuse(.5, .26, 0, 1.0);
        this.orange.setSpecular(1, 45, 0, 1);
        this.orange.setShininess(8.0);

        this.pink = new CGFappearance(this.scene);
        this.pink.setAmbient(.5, .355, .375, 1.0);
        this.pink.setDiffuse(.5, .355, .375, 1.0);
        this.pink.setSpecular(1, .71, .75, 1);
        this.pink.setShininess(8.0);

        this.purple = new CGFappearance(this.scene);
        this.purple.setAmbient(.465, .25, .465, 1.0);
        this.purple.setDiffuse(.465, .25, .465, 1.0);
        this.purple.setSpecular(.93, .5, .93, 1);
        this.purple.setShininess(8.0);
    
    }

    display() {

        if (this.scene.useCustom){
            this.scene.customMaterial.apply();
        } else {
            this.green.apply();
        }
        this.scene.pushMatrix()
        this.scene.multMatrix([
            1,  0,  0,  0,
            0,  1,  0,  0,
            0,  0,  1,  0,
            -1, 0,  0,  1,
        ]);
        this.diamond.display()
        this.scene.popMatrix()

        this.yellow.apply();
        this.scene.pushMatrix()
        this.scene.rotate(Math.PI, 0, 1, 0);
        this.scene.rotate(Math.PI/3, 0, 0, 1);
        this.parallelogram.display()
        this.scene.popMatrix()

        this.purple.apply();
        this.scene.pushMatrix()
        this.scene.translate(1, 0, 0);
        this.triangleSmall.display()
        this.scene.popMatrix()

        this.red.apply();
        this.scene.pushMatrix()
        this.scene.translate(-2, -1, 0);
        this.scene.rotate(-Math.PI/2, 0, 0, 1);
        this.triangleSmall.display()
        this.scene.popMatrix()

        this.pink.apply();
        this.scene.pushMatrix()
        this.scene.translate(1, -1, 0);
        this.scene.rotate(Math.PI, 0, 0, 1);
        this.triangle.display()
        this.scene.popMatrix()

        this.blue.apply();
        this.scene.pushMatrix()
        this.scene.translate(0, -2, 0);
        this.scene.rotate(-Math.PI/2, 0, 0, 1);
        this.triangleBig.display()
        this.scene.popMatrix()

        this.orange.apply();
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

