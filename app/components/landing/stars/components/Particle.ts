import Stars from "./stars";
import { position, random, sizeRatio } from "./util";

export default class Particle {
    base: Stars;
    x: number;
    y: number;
    z: number;
    color: string;
    opacity: number;
    flicker: number;
    neighbors: number[];

    constructor(base: Stars) {
        this.base = base;
        this.x = random(-0.1, 1.1, true);
        this.y = random(-0.1, 1.1, true);
        this.z = random(0, 4);
        this.color = this.base.config.color;
        this.opacity = random(0.1, 1, true);
        this.flicker = 0;
        // Placeholder for neighbors
        this.neighbors = [];
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
                (this.z * this.base.config.particleSizeMultiplier + this.base.config.particleSizeBase) *
                (sizeRatio(this.base.canvas) / 1000),
            o = this.opacity;

        if (this.base.config.flicker) {
            let newVal = random(-0.5, 0.5, true);
            this.flicker += (newVal - this.flicker) / this.base.config.flickerSmoothing;
            if (this.flicker > 0.5) this.flicker = 0.5;
            if (this.flicker < -0.5) this.flicker = -0.5;
            o += this.flicker;
            if (o > 1) o = 1;
            if (o < 0) o = 0;
        }

        this.base.context.fillStyle = this.color;
        this.base.context.globalAlpha = o;
        this.base.context.beginPath();
        this.base.context.arc(pos.x, pos.y, r, 0, 2 * Math.PI, false);
        this.base.context.fill();
        this.base.context.closePath();

        if (this.base.config.renderParticleGlare) {
            this.base.context.globalAlpha = o * this.base.config.glareOpacityMultiplier;
            this.base.context.ellipse(
                pos.x,
                pos.y,
                r * 100,
                r,
                (this.base.config.glareAngle -
                    (this.base.nPos.x - 0.5) * this.base.config.noiseStrength * this.base.config.motion) *
                    (Math.PI / 180),
                0,
                2 * Math.PI,
                false
            );
            this.base.context.fill();
            this.base.context.closePath();
        }

        this.base.context.globalAlpha = 1;
    }
}
