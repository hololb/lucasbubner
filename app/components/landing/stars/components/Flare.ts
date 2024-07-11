import Stars from "./stars";
import { position, random, sizeRatio } from "./util";

/**
 * Represents a flare particle rendered on the canvas in the Stars animation.
 */
export default class Flare {
    base: Stars;
    x: number;
    y: number;
    z: number;
    color: string;
    opacity: number;

    constructor(base: Stars) {
        this.base = base;
        this.x = random(-0.25, 1.25, true);
        this.y = random(-0.25, 1.25, true);
        this.z = random(0, 2);
        this.color = this.base.config.color;
        this.opacity = random(0.001, 0.01, true);
    }

    render() {
        if (!this.base.context) return;
        let pos = position(
                this.base.canvas,
                this.base.mouse,
                this.base.nPos,
                this.base.config.noiseStrength,
                this.base.config.motion,
                this.x,
                this.y,
                this.z
            ),
            r =
                (this.z * this.base.config.flareSizeMultiplier + this.base.config.flareSizeBase) *
                (sizeRatio(this.base.canvas) / 1000);

        // Feathered circles
        this.base.context.beginPath();
        this.base.context.globalAlpha = this.opacity;
        this.base.context.arc(pos.x, pos.y, r, 0, 2 * Math.PI, false);
        this.base.context.fillStyle = this.color;
        this.base.context.fill();
        this.base.context.closePath();
        this.base.context.globalAlpha = 1;
    }
}
