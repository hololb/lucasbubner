import Stars from "./stars";
import { position, random } from "./util";

export default class Link {
    base: Stars;
    length: number;
    verts: number[];
    stage: number;
    linked: number[];
    distances: number[];
    traveled: number;
    fade: number;
    finished: boolean;

    constructor(base: Stars, startVertex: number, numPoints: number) {
        this.base = base;
        this.length = numPoints;
        this.verts = [startVertex];
        this.stage = 0;
        this.linked = [startVertex];
        this.distances = [];
        this.traveled = 0;
        this.fade = 0;
        this.finished = false;
    }

    render() {
        // Stages:
        // 0. Vertex collection
        // 1. Render line reaching from vertex to vertex
        // 2. Fade out
        // 3. Finished (delete me)
        let i, p, pos, points;

        switch (this.stage) {
            // Vertex collection
            case 0:
                // Grab the last member of the link
                let last = this.base.particles[this.verts[this.verts.length - 1]];
                if (last && last.neighbors && last.neighbors.length > 0) {
                    // Grab a random neighbor
                    let neighbor = last.neighbors[random(0, last.neighbors.length - 1)];
                    // If we haven't seen that particle before, add it to the link
                    if (this.verts.indexOf(neighbor) === -1) {
                        this.verts.push(neighbor);
                    }
                    // If we have seen that particle before, we'll just wait for the next frame
                } else {
                    this.stage = 3;
                    this.finished = true;
                }

                if (this.verts.length >= this.length) {
                    // Calculate all distances at once
                    for (i = 0; i < this.verts.length - 1; i++) {
                        let p1 = this.base.particles[this.verts[i]],
                            p2 = this.base.particles[this.verts[i + 1]],
                            dx = p1.x - p2.x,
                            dy = p1.y - p2.y,
                            dist = Math.sqrt(dx * dx + dy * dy);

                        this.distances.push(dist);
                    }
                    this.stage = 1;
                }
                break;

            // Render line animation
            case 1:
                if (this.distances.length > 0) {
                    points = [];
                    //let a = 1;
                    // Gather all points already linked
                    for (i = 0; i < this.linked.length; i++) {
                        p = this.base.particles[this.linked[i]];
                        pos = position(
                            this.base.canvas,
                            this.base.mouse,
                            this.base.nPos,
                            this.base.config.noiseStrength,
                            this.base.config.motion,
                            p.x,
                            p.y,
                            p.z
                        );
                        points.push([pos.x, pos.y]);
                    }

                    let linkSpeedRel = this.base.config.linkSpeed * 0.00001 * this.base.canvas.width;
                    this.traveled += linkSpeedRel;
                    let d = this.distances[this.linked.length - 1];
                    // Calculate last point based on linkSpeed and distance travelled to next point
                    if (this.traveled >= d) {
                        this.traveled = 0;
                        // We've reached the next point, add coordinates to array
                        this.linked.push(this.verts[this.linked.length]);
                        p = this.base.particles[this.linked[this.linked.length - 1]];
                        pos = position(
                            this.base.canvas,
                            this.base.mouse,
                            this.base.nPos,
                            this.base.config.noiseStrength,
                            this.base.config.motion,
                            p.x,
                            p.y,
                            p.z
                        );
                        points.push([pos.x, pos.y]);

                        if (this.linked.length >= this.verts.length) {
                            this.stage = 2;
                        }
                    } else {
                        // We're still travelling to the next point, get coordinates at travel distance
                        // http://math.stackexchange.com/a/85582
                        let a = this.base.particles[this.linked[this.linked.length - 1]],
                            b = this.base.particles[this.verts[this.linked.length]],
                            t = d - this.traveled,
                            x = (this.traveled * b.x + t * a.x) / d,
                            y = (this.traveled * b.y + t * a.y) / d,
                            z = (this.traveled * b.z + t * a.z) / d;

                        pos = position(
                            this.base.canvas,
                            this.base.mouse,
                            this.base.nPos,
                            this.base.config.noiseStrength,
                            this.base.config.motion,
                            x,
                            y,
                            z
                        );

                        points.push([pos.x, pos.y]);
                    }

                    this._drawLine(points);
                } else {
                    this.stage = 3;
                    this.finished = true;
                }
                break;

            // Fade out
            case 2:
                if (this.verts.length > 1) {
                    if (this.fade < this.base.config.linkFade) {
                        this.fade++;

                        // Render full link between all vertices and fade over time
                        points = [];
                        let alpha = (1 - this.fade / this.base.config.linkFade) * this.base.config.linkOpacity;
                        for (i = 0; i < this.verts.length; i++) {
                            p = this.base.particles[this.verts[i]];
                            pos = position(
                                this.base.canvas,
                                this.base.mouse,
                                this.base.nPos,
                                this.base.config.noiseStrength,
                                this.base.config.motion,
                                p.x,
                                p.y,
                                p.z
                            );
                            points.push([pos.x, pos.y]);
                        }
                        this._drawLine(points, alpha);
                    } else {
                        this.stage = 3;
                        this.finished = true;
                    }
                } else {
                    this.stage = 3;
                    this.finished = true;
                }
                break;

            // Finished
            case 3:
            default:
                this.finished = true;
                break;
        }
    }

    _drawLine(points: number[][], alpha: number = this.base.config.linkOpacity) {
        if (!this.base.context) return;
        if (points.length > 1 && alpha > 0) {
            this.base.context.globalAlpha = alpha;
            this.base.context.beginPath();
            for (let i = 0; i < points.length - 1; i++) {
                this.base.context.moveTo(points[i][0], points[i][1]);
                this.base.context.lineTo(points[i + 1][0], points[i + 1][1]);
            }
            this.base.context.strokeStyle = this.base.config.color;
            this.base.context.lineWidth = this.base.config.lineWidth;
            this.base.context.stroke();
            this.base.context.closePath();
            this.base.context.globalAlpha = 1;
        }
    }
}
