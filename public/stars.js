/**
 * Stars
 *
 * Inspired by Steve Courtney's poster art for Celsius GS's Drifter - http://celsiusgs.com/drifter/posters.php
 * by Cory Hughart - http://coryhughart.com
 *
 * Updated to work nicer with ES6 and mobile 02/10/23, Lucas Bubner.
 */

// Delaunay triangulation
// Adapted from https://rawgit.com/ironwallaby/delaunay/master/delaunay.js
const EPSILON = 1.0 / 1048576.0;

function supertriangle(vertices) {
    let xmin = Number.POSITIVE_INFINITY,
        ymin = Number.POSITIVE_INFINITY,
        xmax = Number.NEGATIVE_INFINITY,
        ymax = Number.NEGATIVE_INFINITY,
        i,
        dx,
        dy,
        dmax,
        xmid,
        ymid;

    for (i = vertices.length; i--; ) {
        if (vertices[i][0] < xmin) xmin = vertices[i][0];
        if (vertices[i][0] > xmax) xmax = vertices[i][0];
        if (vertices[i][1] < ymin) ymin = vertices[i][1];
        if (vertices[i][1] > ymax) ymax = vertices[i][1];
    }

    dx = xmax - xmin;
    dy = ymax - ymin;
    dmax = Math.max(dx, dy);
    xmid = xmin + dx * 0.5;
    ymid = ymin + dy * 0.5;

    return [
        [xmid - 20 * dmax, ymid - dmax],
        [xmid, ymid + 20 * dmax],
        [xmid + 20 * dmax, ymid - dmax],
    ];
}

function circumcircle(vertices, i, j, k) {
    let x1 = vertices[i][0],
        y1 = vertices[i][1],
        x2 = vertices[j][0],
        y2 = vertices[j][1],
        x3 = vertices[k][0],
        y3 = vertices[k][1],
        fabsy1y2 = Math.abs(y1 - y2),
        fabsy2y3 = Math.abs(y2 - y3),
        xc,
        yc,
        m1,
        m2,
        mx1,
        mx2,
        my1,
        my2,
        dx,
        dy;

    if (fabsy1y2 < EPSILON && fabsy2y3 < EPSILON) throw new Error("Eek! Coincident points!");

    if (fabsy1y2 < EPSILON) {
        m2 = -((x3 - x2) / (y3 - y2));
        mx2 = (x2 + x3) / 2.0;
        my2 = (y2 + y3) / 2.0;
        xc = (x2 + x1) / 2.0;
        yc = m2 * (xc - mx2) + my2;
    } else if (fabsy2y3 < EPSILON) {
        m1 = -((x2 - x1) / (y2 - y1));
        mx1 = (x1 + x2) / 2.0;
        my1 = (y1 + y2) / 2.0;
        xc = (x3 + x2) / 2.0;
        yc = m1 * (xc - mx1) + my1;
    } else {
        m1 = -((x2 - x1) / (y2 - y1));
        m2 = -((x3 - x2) / (y3 - y2));
        mx1 = (x1 + x2) / 2.0;
        mx2 = (x2 + x3) / 2.0;
        my1 = (y1 + y2) / 2.0;
        my2 = (y2 + y3) / 2.0;
        xc = (m1 * mx1 - m2 * mx2 + my2 - my1) / (m1 - m2);
        yc = fabsy1y2 > fabsy2y3 ? m1 * (xc - mx1) + my1 : m2 * (xc - mx2) + my2;
    }

    dx = x2 - xc;
    dy = y2 - yc;
    return { i: i, j: j, k: k, x: xc, y: yc, r: dx * dx + dy * dy };
}

function dedup(edges) {
    let i, j, a, b, m, n;

    for (j = edges.length; j; ) {
        b = edges[--j];
        a = edges[--j];

        for (i = j; i; ) {
            n = edges[--i];
            m = edges[--i];

            if ((a === m && b === n) || (a === n && b === m)) {
                edges.splice(j, 2);
                edges.splice(i, 2);
                break;
            }
        }
    }
}

function triangulate(vertices, key) {
    let n = vertices.length,
        i,
        j,
        indices,
        st,
        open,
        closed,
        edges,
        dx,
        dy,
        a,
        b,
        c;

    if (n < 3) return [];

    vertices = vertices.slice(0);

    if (key) for (i = n; i--; ) vertices[i] = vertices[i][key];

    indices = new Array(n);

    for (i = n; i--; ) indices[i] = i;

    indices.sort(function (i, j) {
        const diff = vertices[j][0] - vertices[i][0];
        return diff !== 0 ? diff : i - j;
    });

    st = supertriangle(vertices);
    vertices.push(st[0], st[1], st[2]);

    open = [circumcircle(vertices, n + 0, n + 1, n + 2)];
    closed = [];
    edges = [];

    for (i = indices.length; i--; edges.length = 0) {
        c = indices[i];

        for (j = open.length; j--; ) {
            dx = vertices[c][0] - open[j].x;
            if (dx > 0.0 && dx * dx > open[j].r) {
                closed.push(open[j]);
                open.splice(j, 1);
                continue;
            }

            dy = vertices[c][1] - open[j].y;
            if (dx * dx + dy * dy - open[j].r > EPSILON) continue;

            edges.push(open[j].i, open[j].j, open[j].j, open[j].k, open[j].k, open[j].i);
            open.splice(j, 1);
        }

        dedup(edges);

        for (j = edges.length; j; ) {
            b = edges[--j];
            a = edges[--j];
            open.push(circumcircle(vertices, a, b, c));
        }
    }

    for (i = open.length; i--; ) closed.push(open[i]);
    open.length = 0;

    for (i = closed.length; i--; )
        if (closed[i].i < n && closed[i].j < n && closed[i].k < n) open.push(closed[i].i, closed[i].j, closed[i].k);

    return open;
}

function contains(tri, p) {
    if (
        (p[0] < tri[0][0] && p[0] < tri[1][0] && p[0] < tri[2][0]) ||
        (p[0] > tri[0][0] && p[0] > tri[1][0] && p[0] > tri[2][0]) ||
        (p[1] < tri[0][1] && p[1] < tri[1][1] && p[1] < tri[2][1]) ||
        (p[1] > tri[0][1] && p[1] > tri[1][1] && p[1] > tri[2][1])
    )
        return null;

    const a = tri[1][0] - tri[0][0],
        b = tri[2][0] - tri[0][0],
        c = tri[1][1] - tri[0][1],
        d = tri[2][1] - tri[0][1],
        i = a * d - b * c;

    if (i === 0.0) return null;

    const u = (d * (p[0] - tri[0][0]) - b * (p[1] - tri[0][1])) / i,
        v = (a * (p[1] - tri[0][1]) - c * (p[0] - tri[0][0])) / i;

    if (u < 0.0 || v < 0.0 || u + v > 1.0) return null;

    return [u, v];
}

let canvas = document.getElementById("stars"),
    particleCount = 30,
    flareCount = 10,
    motion = 0.03,
    color = "#ed1c24",
    particleSizeBase = 1.5,
    particleSizeMultiplier = 0.5,
    flareSizeBase = 100,
    flareSizeMultiplier = 100,
    lineWidth = 1,
    // Chance per frame of link, higher = smaller chance
    linkChance = 5,
    // Min linked vertices
    linkLengthMin = 2,
    // Max linked vertices
    linkLengthMax = 3,
    // Number between 0 & 1
    linkOpacity = 0.2,
    // Link fade-out frames
    linkFade = 100,
    // Distance a link travels in 1 frame
    linkSpeed = 0.1,
    glareAngle = -60,
    glareOpacityMultiplier = 0.01,
    renderParticles = true,
    renderParticleGlare = false,
    renderFlares = true,
    renderLinks = true,
    renderMesh = false,
    flicker = true,
    // Higher = smoother flicker
    flickerSmoothing = 15,
    blurSize = 1,
    randomMotion = true,
    noiseLength = 1000,
    noiseStrength = 1;

// Reduce settings if on mobile
if (/Mobi/.test(navigator.userAgent)) {
    particleCount = 25;
    flareCount = 5;
    noiseLength = 500;
    blurSize = 0.5;
}

let context = canvas.getContext("2d"),
    mouse = { x: 0, y: 0 },
    // Multiplier for delaunay points, since floats too small can mess up the algorithm
    c = 1000,
    n = 0,
    nAngle = (Math.PI * 2) / noiseLength,
    nRad = 100,
    nPos = { x: 0, y: 0 },
    points = [],
    vertices = [],
    triangles = [],
    links = [],
    particles = [],
    flares = [];

function init() {
    let i, j, k;

    // requestAnimFrame polyfill
    window.requestAnimFrame = (() => {
        return (
            window.requestAnimationFrame ||
            function (callback) {
                window.setTimeout(callback, 1000 / 60);
            }
        );
    })();

    resize();

    mouse.x = canvas.clientWidth / 2;
    mouse.y = canvas.clientHeight / 2;

    // Create particle positions
    for (i = 0; i < particleCount; i++) {
        let p = new Particle();
        particles.push(p);
        points.push([p.x * c, p.y * c]);
    }

    // Delaunay triangulation
    vertices = triangulate(points);

    // Create an array of "triangles" (groups of 3 indices)
    let tri = [];
    for (i = 0; i < vertices.length; i++) {
        if (tri.length === 3) {
            triangles.push(tri);
            tri = [];
        }
        tri.push(vertices[i]);
    }

    // Tell all the particles who their neighbors are
    for (i = 0; i < particles.length; i++) {
        // Loop through all triangles
        for (j = 0; j < triangles.length; j++) {
            // Check if this particle's index is in this triangle
            k = triangles[j].indexOf(i);
            // If it is, add its neighbors to the particles contacts list
            if (k !== -1) {
                triangles[j].forEach((value) => {
                    if (value !== i && particles[i].neighbors.indexOf(value) === -1) {
                        particles[i].neighbors.push(value);
                    }
                });
            }
        }
    }

    if (renderFlares) {
        // Create flare positions
        for (i = 0; i < flareCount; i++) {
            flares.push(new Flare());
        }
    }

    // Motion mode
    if ("ontouchstart" in document.documentElement && window.DeviceOrientationEvent) {
        window.addEventListener(
            "deviceorientation",
            (e) => {
                mouse.x = canvas.clientWidth / 2 - (e.gamma / 90) * (canvas.clientWidth / 2) * 2;
                mouse.y = canvas.clientHeight / 2 - (e.beta / 90) * (canvas.clientHeight / 2) * 2;
            },
            true
        );
    } else {
        // Mouse move listener
        document.body.addEventListener("mousemove", (e) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        });
    }

    // Animation loop
    function animLoop() {
        requestAnimFrame(animLoop);
        resize();
        render();
    }

    animLoop();
}

function render() {
    if (!canvas) return;
    if (randomMotion) {
        n++;
        if (n >= noiseLength) {
            n = 0;
        }

        nPos = noisePoint(n);
    }

    context.clearRect(0, 0, canvas.width, canvas.height);

    if (blurSize > 0) {
        context.shadowBlur = blurSize;
        context.shadowColor = color;
    }

    if (renderParticles) {
        // Render particles
        for (let i = 0; i < particleCount; i++) {
            particles[i].render();
        }
    }

    if (renderMesh) {
        // Render all lines
        context.beginPath();
        for (let v = 0; v < vertices.length - 1; v++) {
            // Splits the array into triplets
            if ((v + 1) % 3 === 0) {
                continue;
            }

            let p1 = particles[vertices[v]],
                p2 = particles[vertices[v + 1]];

            let pos1 = position(p1.x, p1.y, p1.z),
                pos2 = position(p2.x, p2.y, p2.z);

            context.moveTo(pos1.x, pos1.y);
            context.lineTo(pos2.x, pos2.y);
        }
        context.strokeStyle = color;
        context.lineWidth = lineWidth;
        context.stroke();
        context.closePath();
    }

    if (renderLinks) {
        // Possibly start a new link
        if (random(0, linkChance) === linkChance) {
            let length = random(linkLengthMin, linkLengthMax);
            let start = random(0, particles.length - 1);
            startLink(start, length);
        }

        // Render existing links
        // Iterate in reverse so that removing items doesn't affect the loop
        for (let l = links.length - 1; l >= 0; l--) {
            if (links[l] && !links[l].finished) {
                links[l].render();
            } else {
                delete links[l];
            }
        }
    }

    if (renderFlares) {
        // Render flares
        for (let j = 0; j < flareCount; j++) {
            flares[j].render();
        }
    }
}

function resize() {
    if (!canvas) return;
    canvas.width = window.innerWidth * (window.devicePixelRatio || 1);
    canvas.height = canvas.width * (canvas.clientHeight / canvas.clientWidth);
}

function startLink(vertex, length) {
    links.push(new Link(vertex, length));
}

class Particle {
    constructor() {
        this.x = random(-0.1, 1.1, true);
        this.y = random(-0.1, 1.1, true);
        this.z = random(0, 4);
        this.color = color;
        this.opacity = random(0.1, 1, true);
        this.flicker = 0;
        // Placeholder for neighbors
        this.neighbors = [];
    }
    render() {
        let pos = position(this.x, this.y, this.z),
            r = (this.z * particleSizeMultiplier + particleSizeBase) * (sizeRatio() / 1000),
            o = this.opacity;

        if (flicker) {
            let newVal = random(-0.5, 0.5, true);
            this.flicker += (newVal - this.flicker) / flickerSmoothing;
            if (this.flicker > 0.5) this.flicker = 0.5;
            if (this.flicker < -0.5) this.flicker = -0.5;
            o += this.flicker;
            if (o > 1) o = 1;
            if (o < 0) o = 0;
        }

        context.fillStyle = this.color;
        context.globalAlpha = o;
        context.beginPath();
        context.arc(pos.x, pos.y, r, 0, 2 * Math.PI, false);
        context.fill();
        context.closePath();

        if (renderParticleGlare) {
            context.globalAlpha = o * glareOpacityMultiplier;
            context.ellipse(
                pos.x,
                pos.y,
                r * 100,
                r,
                (glareAngle - (nPos.x - 0.5) * noiseStrength * motion) * (Math.PI / 180),
                0,
                2 * Math.PI,
                false
            );
            context.fill();
            context.closePath();
        }

        context.globalAlpha = 1;
    }
}

class Flare {
    constructor() {
        this.x = random(-0.25, 1.25, true);
        this.y = random(-0.25, 1.25, true);
        this.z = random(0, 2);
        this.color = color;
        this.opacity = random(0.001, 0.01, true);
    }

    render() {
        let pos = position(this.x, this.y, this.z),
            r = (this.z * flareSizeMultiplier + flareSizeBase) * (sizeRatio() / 1000);

        // Feathered circles
        context.beginPath();
        context.globalAlpha = this.opacity;
        context.arc(pos.x, pos.y, r, 0, 2 * Math.PI, false);
        context.fillStyle = this.color;
        context.fill();
        context.closePath();
        context.globalAlpha = 1;
    }
}

class Link {
    constructor(startVertex, numPoints) {
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
            // VERTEX COLLECTION STAGE
            case 0:
                // Grab the last member of the link
                let last = particles[this.verts[this.verts.length - 1]];
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
                        let p1 = particles[this.verts[i]],
                            p2 = particles[this.verts[i + 1]],
                            dx = p1.x - p2.x,
                            dy = p1.y - p2.y,
                            dist = Math.sqrt(dx * dx + dy * dy);

                        this.distances.push(dist);
                    }
                    this.stage = 1;
                }
                break;

            // RENDER LINE ANIMATION STAGE
            case 1:
                if (this.distances.length > 0) {
                    points = [];
                    //let a = 1;
                    // Gather all points already linked
                    for (i = 0; i < this.linked.length; i++) {
                        p = particles[this.linked[i]];
                        pos = position(p.x, p.y, p.z);
                        points.push([pos.x, pos.y]);
                    }

                    let linkSpeedRel = linkSpeed * 0.00001 * canvas.width;
                    this.traveled += linkSpeedRel;
                    let d = this.distances[this.linked.length - 1];
                    // Calculate last point based on linkSpeed and distance travelled to next point
                    if (this.traveled >= d) {
                        this.traveled = 0;
                        // We've reached the next point, add coordinates to array
                        this.linked.push(this.verts[this.linked.length]);
                        p = particles[this.linked[this.linked.length - 1]];
                        pos = position(p.x, p.y, p.z);
                        points.push([pos.x, pos.y]);

                        if (this.linked.length >= this.verts.length) {
                            this.stage = 2;
                        }
                    } else {
                        // We're still travelling to the next point, get coordinates at travel distance
                        // http://math.stackexchange.com/a/85582
                        let a = particles[this.linked[this.linked.length - 1]],
                            b = particles[this.verts[this.linked.length]],
                            t = d - this.traveled,
                            x = (this.traveled * b.x + t * a.x) / d,
                            y = (this.traveled * b.y + t * a.y) / d,
                            z = (this.traveled * b.z + t * a.z) / d;

                        pos = position(x, y, z);

                        points.push([pos.x, pos.y]);
                    }

                    this.drawLine(points);
                } else {
                    this.stage = 3;
                    this.finished = true;
                }
                break;

            // FADE OUT STAGE
            case 2:
                if (this.verts.length > 1) {
                    if (this.fade < linkFade) {
                        this.fade++;

                        // Render full link between all vertices and fade over time
                        points = [];
                        let alpha = (1 - this.fade / linkFade) * linkOpacity;
                        for (i = 0; i < this.verts.length; i++) {
                            p = particles[this.verts[i]];
                            pos = position(p.x, p.y, p.z);
                            points.push([pos.x, pos.y]);
                        }
                        this.drawLine(points, alpha);
                    } else {
                        this.stage = 3;
                        this.finished = true;
                    }
                } else {
                    this.stage = 3;
                    this.finished = true;
                }
                break;

            // FINISHED STAGE
            case 3:
            default:
                this.finished = true;
                break;
        }
    }
    drawLine(points, alpha) {
        if (typeof alpha !== "number") alpha = linkOpacity;

        if (points.length > 1 && alpha > 0) {
            context.globalAlpha = alpha;
            context.beginPath();
            for (let i = 0; i < points.length - 1; i++) {
                context.moveTo(points[i][0], points[i][1]);
                context.lineTo(points[i + 1][0], points[i + 1][1]);
            }
            context.strokeStyle = color;
            context.lineWidth = lineWidth;
            context.stroke();
            context.closePath();
            context.globalAlpha = 1;
        }
    }
}

// Utils
function noisePoint(i) {
    let a = nAngle * i,
        cosA = Math.cos(a),
        sinA = Math.sin(a),
        rad = nRad;
    return {
        x: rad * cosA,
        y: rad * sinA,
    };
}

function position(x, y, z) {
    return {
        x: x * canvas.width + (canvas.width / 2 - mouse.x + (nPos.x - 0.5) * noiseStrength) * z * motion,
        y: y * canvas.height + (canvas.height / 2 - mouse.y + (nPos.y - 0.5) * noiseStrength) * z * motion,
    };
}

function sizeRatio() {
    return canvas.width >= canvas.height ? canvas.width : canvas.height;
}

function random(min, max, float) {
    return float ? Math.random() * (max - min) + min : Math.floor(Math.random() * (max - min + 1)) + min;
}

if (canvas) init();
