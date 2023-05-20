import {
    CGFscene,
    CGFcamera,
    CGFaxis,
    CGFappearance,
    CGFtexture,
    CGFshader,
} from "../lib/CGF.js";
import { MyBird } from "./bird/MyBird.js";
import { MyBirdEgg } from "./MyBirdEgg.js";
import { MyNest } from "./MyNest.js";
import { MyPanorama } from "./MyPanorama.js";
import { MyTerrain } from "./MyTerrain.js";
import { MyTree } from "./billboards/MyTree.js";
import { lerp2 } from "./MyMath.js";
import { MyGrass } from "./billboards/MyGrass.js";
import { MyWater } from "./MyWater.js";

/**
 * MyScene
 * @constructor
 */
export class MyScene extends CGFscene {
    constructor() {
        super();
    }

    init(application) {
        super.init(application);

        this.defaultShader = new CGFshader(
            this.gl,
            "shaders/my-phong.vert",
            "shaders/my-phong.frag"
        );
        this.gl.activeTexture(this.gl.TEXTURE0);
        this.gl.uniform1i(this.activeShader.uniforms.uSampler, 0);
        this.setActiveShader(this.defaultShader);

        this.initLights();

        //Background color
        this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

        this.gl.clearDepth(100.0);
        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.enable(this.gl.CULL_FACE);
        this.gl.depthFunc(this.gl.LEQUAL);

        // Constants
        this.terrainSize = 400;
        this.terrainPos = -100;
        this.terrainScaleFactor = 0.2;
        this.waterPos =
            this.terrainPos +
            (this.terrainSize * this.terrainScaleFactor * 75) / 255;
        this.numTrees = 200;
        this.numGrass = 500;
        this.numEggs = 10;

        this.minPos =
            this.terrainPos +
            (this.terrainSize * this.terrainScaleFactor * 80) / 255;
        this.maxPos =
            this.terrainPos +
            (this.terrainSize * this.terrainScaleFactor * 150) / 255;

        this.initMaterials();

        this.initObjects();

        this.initCameras();

        //Objects connected to MyInterface
        this.displayAxis = true;
        this.scaleFactor = 1;

        this.enableTextures(true);

        this.enableNormalViz = false;

        this.setUpdatePeriod(5);
        this.lastUpdateTime = -1;

        this.appStartTime = Date.now();

        this.thirdPersonCamera = false;
    }

    defaultMaterial() {
        const material = new CGFappearance(this);
        material.setAmbient(1, 1, 1, 1);
        material.setDiffuse(1, 1, 1, 1);
        material.setSpecular(1, 1, 1, 1);
        material.setShininess(10.0);
        return material;
    }

    initMaterials() {
        this.eggMaterial = this.defaultMaterial();
        this.eggMaterial.loadTexture("images/egg.jpg");

        this.panoramaMaterial = this.defaultMaterial();
        this.panoramaMaterial.setAmbient(0, 0, 0, 0);
        this.panoramaMaterial.setDiffuse(0, 0, 0, 0);
        this.panoramaMaterial.setSpecular(0, 0, 0, 0);
        this.panoramaMaterial.setShininess(0);
        this.panoramaMaterial.setEmission(1, 1, 1, 1);
        this.panoramaMaterial.loadTexture("images/sky.png");

        this.birdBodyMaterial = this.defaultMaterial();
        this.birdBodyMaterial.setAmbient(150 / 255, 75 / 255, 0, 1);
        this.birdBodyMaterial.setDiffuse(150 / 255, 75 / 255, 0, 1);
        this.birdBodyMaterial.setSpecular(150 / 255, 75 / 255, 0, 1);
        this.birdBodyMaterial.loadTexture("images/bird/body.png");

        this.birdHeadMaterial = this.defaultMaterial();
        this.birdHeadMaterial.setAmbient(150 / 255, 75 / 255, 0, 1);
        this.birdHeadMaterial.setDiffuse(150 / 255, 75 / 255, 0, 1);
        this.birdHeadMaterial.setSpecular(150 / 255, 75 / 255, 0, 1);
        this.birdHeadMaterial.loadTexture("images/bird/head.png");

        this.birdWingMaterial = this.defaultMaterial();
        this.birdWingMaterial.setAmbient(150 / 255, 75 / 255, 0, 1);
        this.birdWingMaterial.setDiffuse(150 / 255, 75 / 255, 0, 1);
        this.birdWingMaterial.setSpecular(150 / 255, 75 / 255, 0, 1);
        this.birdWingMaterial.loadTexture("images/bird/wing.png");

        this.birdBeakMaterial = this.defaultMaterial();
        this.birdBeakMaterial.setAmbient(1, 0.8, 0, 1);
        this.birdBeakMaterial.setDiffuse(1, 0.8, 0, 1);
        this.birdBeakMaterial.loadTexture("images/bird/beak.png");

        this.birdEyeMaterial = this.defaultMaterial();
        this.birdEyeMaterial.loadTexture("images/bird/eye.png");

        this.nestMaterial = this.defaultMaterial();
        this.nestMaterial.loadTexture("images/nest.jpg");

        this.treeMaterial = this.defaultMaterial();
        this.treeMaterial.loadTexture("images/tree.png");

        this.grassMaterial = this.defaultMaterial();
        this.grassMaterial.loadTexture("images/grass.png");

        this.waterMaterial = this.defaultMaterial();
        this.waterMaterial.loadTexture("images/water.jpg");
        this.waterMaterial.setTextureWrap("REPEAT", "REPEAT");

        this.terrainHeightMap = new CGFtexture(
            this,
            "images/terrain/heightmap.jpg"
        );
        this.terrainHeightMap.image.addEventListener(
            "load",
            this.onHeightMapLoad.bind(this)
        );

        this.appearance = this.defaultMaterial();
    }

    initObjects() {
        this.axis = new CGFaxis(this);
        this.terrain = new MyTerrain(
            this,
            128,
            this.terrainScaleFactor,
            new CGFtexture(this, "images/terrain/terrain.jpg"),
            this.terrainHeightMap,
            new CGFtexture(this, "images/terrain/altimetry.png")
        );
        this.water = new MyWater(this, 256, 0.001, 20);
        this.panorama = new MyPanorama(this);
        this.nest = new MyNest(this, 5, 5, 0.9);
        this.bird = new MyBird(this);
        this.birdInitialYPos = this.bird.yPos;

        if (this.heightMap) {
            this.initBillboards();
            this.initEggs();
            this.initNestPos();
        } else {
            this.billboards = [];
            this.eggs = [];
            this.nestPosition = [0, 0, 0];
        }
    }

    initNestPos() {
        this.nestPosition = [0, -10000, 0];

        while (this.nestPosition[1] < this.minPos) {
            this.nestPosition[0] = (Math.random() - 0.5) * this.terrainSize;
            this.nestPosition[2] = (Math.random() - 0.5) * this.terrainSize;
            this.nestPosition[1] = this.getHeight(
                this.nestPosition[0],
                this.nestPosition[2]
            );
        }

        this.bird.xPos = this.nestPosition[0];
        this.bird.zPos = this.nestPosition[2];
        this.bird.yPos = this.nestPosition[1] + 3;
    }

    initEggs() {
        this.eggs = [];

        for (let i = 0; i < this.numEggs; ) {
            const x = (Math.random() - 0.5) * this.terrainSize;
            const z = (Math.random() - 0.5) * this.terrainSize;
            const y = this.getHeight(x, z);
            const rotation = Math.random() * 2 * Math.PI;

            if (y < this.minPos) continue;

            this.eggs.push(new MyBirdEgg(this, 10, 10, [x, y, z], rotation));
            i++;
        }
    }

    initBillboards() {
        this.billboards = [];
        for (let i = 0; i < this.numTrees; ) {
            const x = (Math.random() - 0.5) * this.terrainSize;
            const z = (Math.random() - 0.5) * this.terrainSize;
            const y = this.getHeight(x, z);

            if (y < this.minPos || y > this.maxPos) continue;

            this.billboards.push(new MyTree(this, x, y, z));
            i++;
        }
        for (let i = 0; i < this.numGrass; ) {
            const x = (Math.random() - 0.5) * this.terrainSize;
            const z = (Math.random() - 0.5) * this.terrainSize;
            const y = this.getHeight(x, z);

            if (y < this.minPos || y > this.maxPos) continue;

            this.billboards.push(new MyGrass(this, x, y, z));
            i++;
        }
    }

    checkKeys() {
        if (this.gui.isKeyPressed("KeyW")) {
            this.bird.accelerate(0.5);
        } else if (this.gui.isKeyPressed("KeyS")) {
            this.bird.accelerate(-0.5);
        }

        if (this.gui.isKeyPressed("KeyF")) {
            this.thirdPersonCamera = false;
        } else if (this.gui.isKeyPressed("KeyT")) {
            this.thirdPersonCamera = true;
        }

        if (this.gui.isKeyPressed("KeyR")) {
            this.bird.reset();
        }

        if (this.gui.isKeyPressed("KeyA")) {
            this.bird.turn(0.02);
        } else if (this.gui.isKeyPressed("KeyD")) {
            this.bird.turn(-0.02);
        }
    }

    initLights() {
        const theta = (1 - 0.59) * 2 * Math.PI;
        const phi = (0.233 - 0.5) * Math.PI;
        const ct = Math.cos(theta);
        const st = Math.sin(theta);
        const cp = Math.cos(phi);
        const sp = Math.sin(phi);

        this.lights[0].setPosition(ct * cp, sp, st * cp, 0);
        this.lights[0].setAmbient(0.3, 0.3, 0.3, 1.0);
        this.lights[0].setDiffuse(0.7, 0.7, 0.7, 1.0);
        this.lights[0].setSpecular(1, 1, 1, 1.0);
        this.lights[0].enable();
        this.lights[0].update();
    }

    initCameras() {
        this.camera = new CGFcamera(
            1.0,
            0.1,
            1000,
            vec3.fromValues(
                this.bird.xPos,
                this.bird.yPos + 10,
                this.bird.zPos - 15
            ),
            vec3.fromValues(
                this.bird.xPos,
                this.birdInitialYPos,
                this.bird.zPos
            )
        );
    }

    setDefaultAppearance() {
        this.setAmbient(0.2, 0.4, 0.8, 1.0);
        this.setDiffuse(0.2, 0.4, 0.8, 1.0);
        this.setSpecular(0.2, 0.4, 0.8, 1.0);
        this.setShininess(10.0);
    }

    update(time) {
        if (this.lastUpdateTime == -1) {
            this.lastUpdateTime = time;
        } else {
            const delta = (time - this.lastUpdateTime) / 1000.0;

            this.checkKeys();

            this.lastUpdateTime = time;
            const timeSinceAppStart = (time - this.appStartTime) / 1000.0;

            this.bird.update(timeSinceAppStart);

            console.log(this.thirdPersonCamera);

            const cameraXPos =
                this.bird.xPos - Math.sin(this.bird.birdYaw) * 15;
            const cameraYPos = this.birdInitialYPos + 10;
            const cameraZPos =
                this.bird.zPos - Math.cos(this.bird.birdYaw) * 15;

            if (this.thirdPersonCamera) {
                this.camera.setPosition([cameraXPos, cameraYPos, cameraZPos]);
                // this.camera.moveForward(this.bird.birdSpeed * delta * 0.5);
                this.camera.setTarget([
                    this.bird.xPos,
                    this.birdInitialYPos,
                    this.bird.zPos,
                ]);
            }
        }

        const timeSinceAppStart = (time - this.appStartTime) / 1000.0;

        this.bird.update(timeSinceAppStart);
        // this.camera.setPosition([this.bird.xPos, this.bird.yPos + 10, this.bird.zPos - 15]);
        this.camera.setTarget([
            this.bird.xPos,
            this.birdInitialYPos,
            this.bird.zPos,
        ]);

        super.update();
    }

    display() {
        // ---- BEGIN Background, camera and axis setup
        // Clear image and depth buffer everytime we update the scene
        this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
        // Initialize Model-View matrix as identity (no transformation
        this.updateProjectionMatrix();
        this.loadIdentity();
        // Apply transformations corresponding to the camera position relative to the origin
        this.applyViewMatrix();

        for (const light of this.lights) light.update();

        // Draw axis
        if (this.displayAxis) this.axis.display();
        if (this.enableNormalViz) {
            this.bird.enableNormalViz();
        } else {
            this.bird.disableNormalViz();
        }
        // ---- BEGIN Primitive drawing section

        this.panorama.display();
        this.water.display();
        this.bird.display();
        this.eggs.forEach((egg) => egg.display());

        this.pushMatrix();
        this.translate(...this.nestPosition);
        this.nest.display();
        this.popMatrix();

        this.billboards.forEach((billboard) => billboard.display());

        this.pushMatrix();
        this.translate(0, this.terrainPos, 0);
        this.scale(this.terrainSize, this.terrainSize, this.terrainSize);
        this.rotate(-Math.PI / 2.0, 1, 0, 0);
        this.terrain.display();
        this.popMatrix();

        // ---- END Primitive drawing section
    }

    onHeightMapLoad() {
        const canvas = document.createElement("canvas", {
            width: this.terrainHeightMap.image.width,
            height: this.terrainHeightMap.image.height,
        });
        const ctx = canvas.getContext("2d");
        ctx.drawImage(this.terrainHeightMap.image, 0, 0);
        this.heightMap = ctx.getImageData(
            0,
            0,
            this.terrainHeightMap.image.width,
            this.terrainHeightMap.image.height
        ).data;

        this.initBillboards();
    }

    /**
     * @param {number} x
     * @param {number} z
     * @returns {number}
     */
    getHeight(x, z) {
        let u =
            (x / this.terrainSize + 0.5) * this.terrainHeightMap.image.width;
        let v =
            (z / this.terrainSize + 0.5) * this.terrainHeightMap.image.height;
        const t = u % 1;
        const s = v % 1;

        u = Math.floor(u);
        v = Math.floor(v);
        const u2 = Math.min(u + 1, this.terrainHeightMap.image.width - 1);
        const v2 = Math.min(v + 1, this.terrainHeightMap.image.height - 1);

        if (
            u < 0 ||
            u >= this.terrainHeightMap.image.width ||
            v < 0 ||
            v >= this.terrainHeightMap.image.height
        )
            return this.terrainPos;

        const a =
            this.heightMap[(v * this.terrainHeightMap.image.width + u) * 4] /
            255;
        const b =
            this.heightMap[(v * this.terrainHeightMap.image.width + u2) * 4] /
            255;
        const c =
            this.heightMap[(v2 * this.terrainHeightMap.image.width + u) * 4] /
            255;
        const d =
            this.heightMap[(v2 * this.terrainHeightMap.image.width + u2) * 4] /
            255;

        return (
            lerp2(a, b, c, d, t, s) *
                this.terrainScaleFactor *
                this.terrainSize +
            this.terrainPos
        );
    }
}
