import { CGFobject, CGFappearance, CGFtexture } from '../lib/CGF.js';
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

        //Initialize objects
        this.diamond = new MyDiamond(scene);
        this.triangle = new MyTriangle(scene);
        this.parallelogram = new MyParallelogram(scene);
        this.triangleSmall = new MyTriangleSmall(scene);
        this.triangleBig = new MyTriangleBig(scene);

        this.tangramMaterial = new CGFappearance(scene);
        this.tangramMaterial.setAmbient(0.1, 0.1, 0.1, 1);
        this.tangramMaterial.setDiffuse(0.9, 0.9, 0.9, 1);
        this.tangramMaterial.setSpecular(0.1, 0.1, 0.1, 1);
        this.tangramMaterial.setShininess(10.0);
        this.tangramMaterial.loadTexture('images/tangram.png');
    }

    display() {

        this.tangramMaterial.apply();

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

        this.triangleSmall.texCoords = [
            0.5, 0.5,
            0.25, 0.75,
            0.75, 0.75,
        ];
        this.triangleSmall.updateTexCoordsGLBuffers();
        this.scene.pushMatrix()
        this.scene.translate(1, 0, 0);
        this.triangleSmall.display()
        this.scene.popMatrix()

        this.triangleSmall.texCoords = [
            0.25, 0.25,
            0, 0,
            0, 0.5,
        ];
        this.triangleSmall.updateTexCoordsGLBuffers();
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

        this.triangleBig.texCoords = [
            0.5, 0.5,
            1, 0,
            0, 0,
        ];
        this.triangleBig.updateTexCoordsGLBuffers();
        this.scene.pushMatrix()
        this.scene.translate(0, -2, 0);
        this.scene.rotate(-Math.PI/2, 0, 0, 1);
        this.triangleBig.display()
        this.scene.popMatrix()

        this.triangleBig.texCoords = [
            0.5, 0.5,
            1, 1,
            1, 0,
        ];
        this.triangleBig.updateTexCoordsGLBuffers();
        this.scene.pushMatrix()
        this.scene.translate(0, -2, 0);
        this.scene.rotate(Math.PI/2, 0, 0, 1);
        this.triangleBig.display()
        this.scene.popMatrix()
    }
}

