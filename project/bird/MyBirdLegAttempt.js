import { CGFobject, CGFappearance } from '../../lib/CGF.js';
import { MyCone } from "../primitives/MyCone.js"

export class MyBirdLeg extends CGFobject {
    constructor(scene) {
        super(scene)

        this.sideToeLengthForward = 0.55;
        this.middleToeLengthForward = 0.8;
        this.footWidenessBack = 0.3;
        this.footWidenessFront = 0.5;
        this.footHeight = 0.25;
        this.footBlockness = 0.2;
        this.backToeLengthForward = 0.5;
        this.backToeElevation = 0.1;
        this.legHeight = 1;
        this.legTopWideness = 0.07;

        this.initBuffers();
    }

    initBuffers() {

        this.vertexBase = [
            -this.footWidenessBack / 2, 0, -0.1,                        // 0
            -this.footWidenessFront / 2, 0, this.sideToeLengthForward,  // 1
            -0.05, 0, 0.4,                                              // 2
            0, 0, this.middleToeLengthForward,                          // 3
            0.05, 0, 0.4,                                               // 4
            this.footWidenessFront / 2, 0, this.sideToeLengthForward,   // 5
            this.footWidenessBack / 2, 0, -0.1,                         // 6
            0, this.footHeight, this.footBlockness,                     // 7
            0, this.backToeElevation, -this.backToeLengthForward,       // 8
            0, this.footHeight, -0.5 * (1 - this.backToeLengthForward), // 9
            0, this.legHeight, 0.04,                                    // 10
            -this.legTopWideness, this.legHeight, -0.1,                 // 11
            this.legTopWideness, this.legHeight, -0.1,                  // 12
        ];

        this.vertices = [
            ...this.vertexBase,
            // ...this.vertexBase,
        ];

        this.indexBase = [

            // foot base
            0, 2, 1,
            2, 4, 3,
            4, 6, 5,
            0, 6, 2,
            6, 4, 2,
            0, 8, 6, // back toe

            // toe sides
            0, 1, 7,
            1, 2, 7,
            2, 3, 7,
            3, 4, 7,
            4, 5, 7,
            5, 6, 7,
            0, 9, 8,
            9, 6, 8,

            // leg
            7, 6, 10,
            0, 7, 10,
            6, 12, 10,
            0, 10, 11,
            9, 12, 6,
            0, 11, 9,
            11, 12, 9,
        ];

        this.indices = [
            ...this.indexBase,
            // ...this.indexBase,
        ];

        this.normalBase = [
            0, -1, 0,
            0, -1, 0,
            0, -1, 0,
            0, -1, 0,
            0, -1, 0,
            0, -1, 0,
            0, -1, 0,
            0, 1, 0,
            0, -Math.cos(Math.atan(this.footHeight/this.backToeLengthForward)), -Math.sin(Math.atan(this.footHeight/this.backToeLengthForward)),
            0, 1, 0,
            0, 1, 0,
            0, 1, 0,
            0, 1, 0,
        ];

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }

    display() {

        this.scene.birdLegMaterial.apply();

        this.scene.pushMatrix();
        this.scene.translate(1, 1, 1);
        super.display();
        this.scene.popMatrix();

    }
}