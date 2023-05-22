import { CGFobject } from '../../lib/CGF.js';
import { MyCylinder } from "../primitives/MyCylinder.js"

export class MyBirdLeg extends CGFobject {
    constructor(scene) {
        super(scene)

        this.footBase = new CGFobject(this.scene);
        this.footMast = new MyCylinder(this.scene, 10, 4);

        this.sideToeLengthForward = 0.3;
        this.middleToeLengthForward = 0.5;
        this.footWidenessBack = 0.3;
        this.footWidenessFront = 0.5;
        this.backToeLengthForward = 0.3;

        this.initBuffers();
    }

    initBuffers() {

        const footVertexBase = [
            -this.footWidenessBack / 2, 0, -0.1,                        // 0
            -this.footWidenessFront / 2, 0, this.sideToeLengthForward,  // 1
            -0.05, 0, (this.middleToeLengthForward - this.sideToeLengthForward) / 1.2,                                              // 2
            0, 0, this.middleToeLengthForward,                          // 3
            0.05, 0, (this.middleToeLengthForward - this.sideToeLengthForward) / 1.2,                                               // 4
            this.footWidenessFront / 2, 0, this.sideToeLengthForward,   // 5
            this.footWidenessBack / 2, 0, -0.1,                         // 6
            0, 0, -this.backToeLengthForward,                           // 7
        ];

        this.footBase.vertices = [
            ...footVertexBase,
            ...footVertexBase,
            // ...this.vertexBase,
        ];

        const footIndexBase = [

            // foot base
            0, 2, 1,
            2, 4, 3,
            4, 6, 5,
            0, 6, 2,
            6, 4, 2,
            0, 7, 6, // back toe

            // foot base
            10, 8, 9,
            12, 10, 11,
            14, 12, 13,
            14, 8, 10,
            12, 14, 10,
            15, 8, 14, // back toe
        ];

        this.footBase.indices = [
            ...footIndexBase,
            // ...this.indexBase,
        ];

        this.footBase.normals = [
            0, -1, 0,
            0, -1, 0,
            0, -1, 0,
            0, -1, 0,
            0, -1, 0,
            0, -1, 0,
            0, -1, 0,
            0, -1, 0,

            0, 1, 0,
            0, 1, 0,
            0, 1, 0,
            0, 1, 0,
            0, 1, 0,
            0, 1, 0,
            0, 1, 0,
            0, 1, 0,
        ]

        this.footBase.primitiveType = this.scene.gl.TRIANGLES;
        this.footBase.initGLBuffers();
    }

    enableNormalViz() {
        this.footBase.enableNormalViz();
        this.footMast.enableNormalViz();
    }

    disableNormalViz() {
        this.footBase.disableNormalViz();
        this.footMast.disableNormalViz();
    }

    display() {

        this.scene.birdLegMaterial.apply();

        this.footBase.display();

        this.scene.pushMatrix();
        this.scene.rotate(Math.PI / 2, 1, 0, 0);
        this.scene.translate(0, 0, -1);
        this.scene.scale(0.09, 0.09, 1);
        this.footMast.display();
        this.scene.popMatrix();
    }
}