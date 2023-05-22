import { CGFobject } from "../lib/CGF.js";
import { MyBirdEgg } from "./MyBirdEgg.js";
import { MyBasket } from "./primitives/MyBasket.js";

/**
 * MyNest
 * @constructor
 * @param scene - Reference to MyScene object
 * @param slices - number of divisions around the Y axis
 * @param stacks - number of divisions along the Y axis
 */
export class MyNest extends CGFobject {
    /**
     *
     * @param {CGFscene} scene
     */
    constructor(scene) {
        super(scene);
        this.basket = new MyBasket(this.scene, 20, 20, 0.9);
        this.position = [0, 0, 0];
        this.eggs = [];

        this.initEggPositions();
    }

    initEggPositions() {
        this.eggPositions = [];

        let dtheta = Math.PI / 6;
        let phi = -Math.PI / 6;
        let cp = Math.cos(phi);
        let sp = Math.sin(phi);

        for (let i = 0; i < 12; ++i) {
            const theta = i * dtheta;
            const ct = Math.cos(theta);
            const st = Math.sin(theta);

            this.eggPositions.push([ct * cp * 2.6, sp * 2.6 + 3, st * cp * 2.6]);
        }

        dtheta = Math.PI / 3;
        phi = -2 * Math.PI / 6;
        cp = Math.cos(phi);
        sp = Math.sin(phi);

        for (let i = 0; i < 6; ++i) {
            const theta = i * dtheta;
            const ct = Math.cos(theta);
            const st = Math.sin(theta);

            this.eggPositions.push([ct * cp * 2.6, sp * 2.6 + 3, st * cp * 2.6]);
        }

        this.eggPositions.push([0, 0.4, 0]);

        this.eggPositions.shuffle();
    }

    addEgg(egg) {
        if (egg)
            this.eggs.push(egg);
    }

    update(delta) {
        this.eggs.forEach((egg, i) => {
            if (egg.position !== this.eggPositions[i]) {
                const diff = this.eggPositions[i].map((p, i) => p - egg.position[i]);
                const norm = Math.sqrt(diff.reduce((acc, p) => acc + p * p, 0));

                if (norm < 0.1)
                    egg.position = this.eggPositions[i];

                egg.position = egg.position.map((p, i) => p + diff[i] * delta);
            }
        });
    }

    display() {
        this.scene.pushMatrix();
        this.scene.translate(...this.position)
        this.eggs.forEach((egg) => egg.display());
        this.scene.scale(3, 3, 3);
        this.scene.translate(0, 1, 0);
        this.scene.nestMaterial.apply();
        this.basket.display();
        this.scene.popMatrix();
    }
}
