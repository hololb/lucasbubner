/**
 * Delaunay triangulation library
 * Adapted from https://rawgit.com/ironwallaby/delaunay/master/delaunay.js
 * 
 * Types have been set to any to allow for easier integration with the existing codebase and confirmed functionality,
 * as this was originally written in JavaScript.
 */
export default class Delaunay {
    static EPSILON = 1.0 / 1048576.0;
    static superTriangle(vertices: any) {
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

    static circumcircle(vertices: any, i: any, j: any, k: any) {
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

        if (fabsy1y2 < Delaunay.EPSILON && fabsy2y3 < Delaunay.EPSILON) throw new Error("Eek! Coincident points!");

        if (fabsy1y2 < Delaunay.EPSILON) {
            m2 = -((x3 - x2) / (y3 - y2));
            mx2 = (x2 + x3) / 2.0;
            my2 = (y2 + y3) / 2.0;
            xc = (x2 + x1) / 2.0;
            yc = m2 * (xc - mx2) + my2;
        } else if (fabsy2y3 < Delaunay.EPSILON) {
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

    static dedup(edges: any) {
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

    static triangulate(vertices: any, key?: any) {
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

        st = Delaunay.superTriangle(vertices);
        vertices.push(st[0], st[1], st[2]);

        open = [Delaunay.circumcircle(vertices, n + 0, n + 1, n + 2)];
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
                if (dx * dx + dy * dy - open[j].r > Delaunay.EPSILON) continue;

                edges.push(open[j].i, open[j].j, open[j].j, open[j].k, open[j].k, open[j].i);
                open.splice(j, 1);
            }

            Delaunay.dedup(edges);

            for (j = edges.length; j; ) {
                b = edges[--j];
                a = edges[--j];
                open.push(Delaunay.circumcircle(vertices, a, b, c));
            }
        }

        for (i = open.length; i--; ) closed.push(open[i]);
        open.length = 0;

        for (i = closed.length; i--; )
            if (closed[i].i < n && closed[i].j < n && closed[i].k < n) open.push(closed[i].i, closed[i].j, closed[i].k);

        return open;
    }

    static contains(tri: any, p: any) {
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
}
