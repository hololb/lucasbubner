// Utilities used for the stars animation renderer

export function noisePoint(i: number, nAngle: number, nRad: number) {
    let a = nAngle * i,
        cosA = Math.cos(a),
        sinA = Math.sin(a),
        rad = nRad;
    return {
        x: rad * cosA,
        y: rad * sinA,
    };
}

export function position(
    canvas: HTMLCanvasElement,
    mouse: { x: number; y: number },
    nPos: { x: number; y: number },
    noiseStrength: number,
    motion: number,
    x: number,
    y: number,
    z: number
) {
    return {
        x: x * canvas.width + (canvas.width / 2 - mouse.x + (nPos.x - 0.5) * noiseStrength) * z * motion,
        y: y * canvas.height + (canvas.height / 2 - mouse.y + (nPos.y - 0.5) * noiseStrength) * z * motion,
    };
}

export function sizeRatio(canvas: HTMLCanvasElement) {
    return canvas.width >= canvas.height ? canvas.width : canvas.height;
}

export function random(min: number, max: number, float: boolean = false) {
    return float ? Math.random() * (max - min) + min : Math.floor(Math.random() * (max - min + 1)) + min;
}
