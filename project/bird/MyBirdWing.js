import { CGFobject, CGFappearance, CGFshader } from "../../lib/CGF.js";

/**
 * MySphere
 * @constructor
 * @param scene - Reference to MyScene object
 * @param slices - number of divisions around the Y axis
 * @param stacks - number of divisions along the Y axis
 */
export class MyBirdWing extends CGFobject {
    /**
     *
     * @param {CGFscene} scene
     */
    constructor(scene, wingColor) {
        super(scene);

        this.outterWing = new CGFobject(this.scene);
        this.innerWing = new CGFobject(this.scene);
        
        this.innerWingRotation = -Math.PI / 7;
        this.outterWingRotation = Math.PI / 17;

        this.turning = false;

        this.initBuffers();
    }

    initBuffers() {
        this.innerWing.vertices = [
            0, 0, 0.1,
            0, 0, 1,
            1, 0, 0,
            1, 0, 1,

            0, 0, 0.1,
            0, 0, 1,
            1, 0, 0,
            1, 0, 1,
        ];

        this.innerWing.indices = [
            0, 1, 2,
            2, 1, 3,

            4, 6, 5,
            6, 7, 5,
        ];

        this.innerWing.normals = [
            0, 1, 0,
            0, 1, 0,
            0, 1, 0,
            0, 1, 0,

            0, -1, 0,
            0, -1, 0,
            0, -1, 0,
            0, -1, 0,
        ];

        this.innerWing.texCoords = [
            0, 0.1,
            0, 1,
            1, 0,
            1, 1,

            0, 0.1,
            0, 1,
            1, 0,
            1, 1,
        ]
        
        this.innerWing.primitiveType = this.scene.gl.TRIANGLES;
        this.innerWing.initGLBuffers();

        this.outterWing.vertices = [
            0, 0, 0,
            0, 0, 1,
            0.9, 0, 0.7,

            0, 0, 0,
            0, 0, 1,
            0.9, 0, 0.7,
        ];

        this.outterWing.indices = [
            0, 1, 2,

            3, 5, 4,
        ];

        this.outterWing.normals = [
            0, 1, 0,
            0, 1, 0,
            0, 1, 0,

            0, -1, 0,
            0, -1, 0,
            0, -1, 0,
        ];

        this.outterWing.texCoords = [
            0, 0,
            0, 1,
            .9, .7,

            0, 0,
            0, 1,
            .9, .7,
        ];
        
        this.outterWing.primitiveType = this.scene.gl.TRIANGLES;
        this.outterWing.initGLBuffers();
    }

    enableNormalViz() {
        this.innerWing.enableNormalViz();
        this.outterWing.enableNormalViz();
    }

    disableNormalViz() {
        this.innerWing.disableNormalViz();
        this.outterWing.disableNormalViz();
    }

    update(t) {
        if (t % 4 < 1 && !this.turning) {
            this.innerWingRotation = -Math.PI / 10 + Math.sin(-t * Math.PI * 3) * 1.8 * Math.PI / 7;
            this.outterWingRotation = -Math.PI / 34 + Math.sin(-t * Math.PI * 3) * 1.2 * Math.PI / 17;
        }
    }

    display() {
        this.scene.birdWingMaterial.apply();
        
        this.scene.pushMatrix()
        
        this.scene.rotate(this.outterWingRotation, 0, 0, 1);

        this.innerWing.display();
        
        this.scene.pushMatrix()
        this.scene.translate(1, 0, 0); // we can simply translate because the axis are rotated
        this.scene.rotate(this.innerWingRotation, 0, 0, 1);
        this.outterWing.display();
        this.scene.popMatrix();

        this.scene.popMatrix();
    }
}
