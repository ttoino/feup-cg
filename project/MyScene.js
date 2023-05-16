import {
    CGFscene,
    CGFcamera,
    CGFaxis,
    CGFappearance,
    CGFtexture,
} from "../lib/CGF.js";
import { MyBird } from "./MyBird.js";
import { MyBirdEgg } from "./MyBirdEgg.js";
import { MyNest } from "./MyNest.js";
import { MyPanorama } from "./MyPanorama.js";
import { MyTerrain } from "./MyTerrain.js";
import { MyTree } from "./MyTree.js";
import { lerp2 } from "./MyMath.js";

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
        this.numTrees = 400;

        // Textures
        this.textures = Object.freeze({
            terrain: new CGFtexture(this, "images/terrain.jpg"),
            heightMap: new CGFtexture(this, "images/heightmap.jpg"),
            altimetry: new CGFtexture(this, "images/altimetry.png"),
            egg: new CGFtexture(this, "images/egg.jpg"),
            nest: new CGFtexture(this, "images/thatch.jpg"),
            tree: new CGFtexture(this, "images/billboardtree.png"),
            panorama: new CGFtexture(this, "images/panorama4.jpg"),
        });

        this.textures.heightMap.image.addEventListener(
            "load",
            this.onHeightMapLoad.bind(this)
        );

        //Initialize scene objects
        this.axis = new CGFaxis(this);
        this.terrain = new MyTerrain(
            this,
            128,
            this.terrainScaleFactor,
            this.textures.terrain,
            this.textures.heightMap,
            this.textures.altimetry
        );
        this.panorama = new MyPanorama(this, this.textures.panorama);
        this.egg = new MyBirdEgg(this, 20, 20);
        this.nest = new MyNest(this, 5, 5, 0.9, this.textures.nest);
        this.bird = new MyBird(this);
        this.birdInitialYPos = this.bird.yPos;

        this.initCameras();

        //Objects connected to MyInterface
        this.displayAxis = true;
        this.scaleFactor = 1;

        this.enableTextures(true);

        this.appearance = new CGFappearance(this);

        this.enableNormalViz = false;

        this.setUpdatePeriod(5);
        this.lastUpdateTime = -1;

        this.appStartTime = Date.now();

        this.thirdPersonCamera = false;
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
        this.lights[0].setPosition(15, 0, 5, 1);
        this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
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

            const cameraXPos = this.bird.xPos - Math.sin(this.bird.birdYaw) * 15;
            const cameraYPos = this.birdInitialYPos + 10;
            const cameraZPos = this.bird.zPos - Math.cos(this.bird.birdYaw) * 15;

            if (this.thirdPersonCamera) {
                this.camera.setPosition([cameraXPos, cameraYPos, cameraZPos]);
                // this.camera.moveForward(this.bird.birdSpeed * delta * 0.5);
                this.camera.setTarget([this.bird.xPos, this.birdInitialYPos, this.bird.zPos]);
            }
            
            super.update();
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

        // Draw axis
        if (this.displayAxis) this.axis.display();
        if (this.enableNormalViz) {
            this.bird.enableNormalViz();
        } else {
            this.bird.disableNormalViz();
        }
        // ---- BEGIN Primitive drawing section

        this.panorama.display();
        this.bird.display();
        // this.egg.display();
        // this.nest.display();
        this.trees.forEach((tree) => tree.display());

        this.pushMatrix();
        this.translate(0, -100, 0);
        this.scale(this.terrainSize, this.terrainSize, this.terrainSize);
        this.rotate(-Math.PI / 2.0, 1, 0, 0);
        this.terrain.display();
        this.popMatrix();

        // ---- END Primitive drawing section
    }

    onHeightMapLoad() {
        const canvas = document.createElement("canvas", {
            width: this.textures.heightMap.image.width,
            height: this.textures.heightMap.image.height,
        });
        const ctx = canvas.getContext("2d");
        ctx.drawImage(this.textures.heightMap.image, 0, 0);
        this.heightMap = ctx.getImageData(
            0,
            0,
            this.textures.heightMap.image.width,
            this.textures.heightMap.image.height
        ).data;

        this.trees = [];
        for (let i = 0; i < this.numTrees; i++) {
            const x = (Math.random() - 0.5) * this.terrainSize;
            const z = (Math.random() - 0.5) * this.terrainSize;
            const y = this.getHeight(x, z);
            this.trees.push(new MyTree(this, this.textures.tree, x, y, z));
        }
    }

    /**
     * @param {number} x
     * @param {number} z
     * @returns {number}
     */
    getHeight(x, z) {
        let u =
            (x / this.terrainSize + 0.5) * this.textures.heightMap.image.width;
        let v =
            (z / this.terrainSize + 0.5) * this.textures.heightMap.image.height;
        const t = u % 1;
        const s = v % 1;

        u = Math.floor(u);
        v = Math.floor(v);
        const u2 = Math.min(u + 1, this.textures.heightMap.image.width - 1);
        const v2 = Math.min(v + 1, this.textures.heightMap.image.height - 1);

        if (
            u < 0 ||
            u >= this.textures.heightMap.image.width ||
            v < 0 ||
            v >= this.textures.heightMap.image.height
        )
            return this.terrainPos;

        const a =
            this.heightMap[(v * this.textures.heightMap.image.width + u) * 4];
        const b =
            this.heightMap[(v * this.textures.heightMap.image.width + u2) * 4];
        const c =
            this.heightMap[(v2 * this.textures.heightMap.image.width + u) * 4];
        const d =
            this.heightMap[(v2 * this.textures.heightMap.image.width + u2) * 4];

        return (
            lerp2(a, b, c, d, t, s) * this.terrainScaleFactor + this.terrainPos
        );
    }
}
