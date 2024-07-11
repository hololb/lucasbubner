import Delaunay from "./Delaunay";
import Flare from "./Flare";
import Link from "./Link";
import Particle from "./Particle";
import { noisePoint, position, random } from "./util";

type Config = {
    particleCount: number;
    flareCount: number;
    motion: number;
    color: string;
    particleSizeBase: number;
    particleSizeMultiplier: number;
    flareSizeBase: number;
    flareSizeMultiplier: number;
    lineWidth: number;
    linkChance: number;
    linkLengthMin: number;
    linkLengthMax: number;
    linkOpacity: number;
    linkFade: number;
    linkSpeed: number;
    glareAngle: number;
    glareOpacityMultiplier: number;
    renderParticles: boolean;
    renderParticleGlare: boolean;
    renderFlares: boolean;
    renderLinks: boolean;
    renderMesh: boolean;
    flicker: boolean;
    flickerSmoothing: number;
    blurSize: number;
    randomMotion: boolean;
    noiseLength: number;
    noiseStrength: number;
};

/**
 * Canvas renderer for the Stars animation.
 * 
 * Inspired by Steve Courtney's poster art for Celsius GS's Drifter - http://celsiusgs.com/drifter/posters.php
 * by Cory Hughart - http://coryhughart.com
 */
class Stars {
    config: Config;
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D | null;
    mouse: { x: number; y: number };
    // Multiplier for delaunay points, since floats too small can mess up the algorithm
    c: number;
    n: number;
    nAngle: number;
    nRad: number;
    nPos: { x: number; y: number };
    points: number[][];
    triangles: number[][];
    // Handled through Delaunay triangulation, will use any as it gets results directly from the API with no type information
    vertices: any[];
    links: Link[];
    particles: Particle[];
    flares: Flare[];
    destroyed: boolean;

    constructor(canvas: HTMLCanvasElement, config: Config) {
        this.canvas = canvas;
        this.config = config;
        this.context = canvas.getContext("2d");
        this.mouse = { x: 0, y: 0 };
        this.c = 1000;
        this.n = 0;
        this.nAngle = 0;
        this.nRad = 0;
        this.nPos = { x: 0, y: 0 };
        this.points = [];
        this.triangles = [];
        this.vertices = [];
        this.links = [];
        this.particles = [];
        this.flares = [];
        this.destroyed = false;
    }

    destroy() {
        this.destroyed = true;
    }

    init() {
        let i: any, j, k;

        /* @ts-expect-error requestAnimFrame polyfill */
        window.requestAnimFrame = (() => {
            return (
                window.requestAnimationFrame ||
                function (callback: any) {
                    window.setTimeout(callback, 1000 / 60);
                }
            );
        })();

        this.canvas.width = window.innerWidth * (window.devicePixelRatio || 1);
        this.canvas.height = this.canvas.width * (this.canvas.clientHeight / this.canvas.clientWidth);

        this.mouse.x = this.canvas.clientWidth / 2;
        this.mouse.y = this.canvas.clientHeight / 2;

        // Create particle positions
        for (i = 0; i < this.config.particleCount; i++) {
            let p = new Particle(this);
            this.particles.push(p);
            this.points.push([p.x * this.c, p.y * this.c]);
        }

        // Delaunay triangulation
        this.vertices = Delaunay.triangulate(this.points);

        // Create an array of "triangles" (groups of 3 indices)
        let tri = [];
        for (i = 0; i < this.vertices.length; i++) {
            if (tri.length === 3) {
                this.triangles.push(tri);
                tri = [];
            }
            tri.push(this.vertices[i]);
        }

        // Tell all the particles who their neighbors are
        for (i = 0; i < this.particles.length; i++) {
            // Loop through all triangles
            for (j = 0; j < this.triangles.length; j++) {
                // Check if this particle's index is in this triangle
                k = this.triangles[j].indexOf(i);
                // If it is, add its neighbors to the particles contacts list
                if (k !== -1) {
                    this.triangles[j].forEach((value) => {
                        if (value !== i && this.particles[i].neighbors.indexOf(value) === -1) {
                            this.particles[i].neighbors.push(value);
                        }
                    });
                }
            }
        }

        if (this.config.renderFlares) {
            // Create flare positions
            for (i = 0; i < this.config.flareCount; i++) {
                this.flares.push(new Flare(this));
            }
        }

        const onDeviceOrientation = (e: any) => {
            this.mouse.x = this.canvas.clientWidth / 2 - ((e.gamma || 0) / 90) * (this.canvas.clientWidth / 2) * 2;
            this.mouse.y = this.canvas.clientHeight / 2 - ((e.beta || 0) / 90) * (this.canvas.clientHeight / 2) * 2;
        };

        const onMouseMove = (e: any) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
        }

        // Motion mode
        if ("ontouchstart" in document.documentElement && window.DeviceOrientationEvent) {
            window.addEventListener("deviceorientation", onDeviceOrientation, true);
        } else {
            // Mouse move listener
            document.body.addEventListener("mousemove", onMouseMove);
        }

        const animLoop = () => {
            if (this.destroyed) {
                // Clean up any listeners and stop rendering what is now unmounted from the DOM
                window.removeEventListener("deviceorientation", onDeviceOrientation);
                document.body.removeEventListener("mousemove", onMouseMove);
                return;
            }
            /* @ts-expect-error requestAnimFrame polyfill */
            window.requestAnimFrame(animLoop);
            this.__render();
        };

        animLoop();
    }

    __render() {
        if (!this.canvas || !this.context) return;

        this.nPos = noisePoint(this.n, this.nAngle, this.nRad);
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

        if (this.config.blurSize > 0) {
            this.context.shadowBlur = this.config.blurSize;
            this.context.shadowColor = this.config.color;
        }

        if (this.config.renderParticles) {
            // Render particles
            for (let i = 0; i < this.config.particleCount; i++) {
                this.particles[i].render();
            }
        }

        if (this.config.renderMesh) {
            // Render all lines
            this.context.beginPath();
            for (let v = 0; v < this.vertices.length - 1; v++) {
                // Splits the array into triplets
                if ((v + 1) % 3 === 0) {
                    continue;
                }

                const p1 = this.particles[this.vertices[v]],
                    p2 = this.particles[this.vertices[v + 1]];

                const pos1 = position(
                        this.canvas,
                        this.mouse,
                        this.nPos,
                        this.config.noiseStrength,
                        this.config.motion,
                        p1.x,
                        p1.y,
                        p1.z
                    ),
                    pos2 = position(
                        this.canvas,
                        this.mouse,
                        this.nPos,
                        this.config.noiseStrength,
                        this.config.motion,
                        p2.x,
                        p2.y,
                        p2.z
                    );

                this.context.moveTo(pos1.x, pos1.y);
                this.context.lineTo(pos2.x, pos2.y);
            }
            this.context.strokeStyle = this.config.color;
            this.context.lineWidth = this.config.lineWidth;
            this.context.stroke();
            this.context.closePath();
        }

        if (this.config.renderLinks) {
            // Possibly start a new link
            if (random(0, this.config.linkChance) === this.config.linkChance) {
                let length = random(this.config.linkLengthMin, this.config.linkLengthMax);
                let start = random(0, this.particles.length - 1);
                this.links.push(new Link(this, start, length));
            }

            // Render existing links
            // Iterate in reverse so that removing items doesn't affect the loop
            for (let l = this.links.length - 1; l >= 0; l--) {
                if (this.links[l] && !this.links[l].finished) {
                    this.links[l].render();
                } else {
                    delete this.links[l];
                }
            }
        }

        if (this.config.renderFlares) {
            // Render flares
            for (let j = 0; j < this.config.flareCount; j++) {
                this.flares[j].render();
            }
        }
    }
}

export default Stars;
export type { Config };
