"use client";

import { useEffect } from "react";
import { useRef } from "react";
import Stars, { Config } from "./components/stars";

/**
 * Stars Animation
 *
 * Inspired by Steve Courtney's poster art for Celsius GS's Drifter - http://celsiusgs.com/drifter/posters.php
 * by Cory Hughart - http://coryhughart.com
 *
 * Ported to a React component - Lucas Bubner, 2024
 */
export default function StarsAnimation() {
    const canvas = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        const config: Config = {
            particleCount: 50,
            flareCount: 10,
            motion: 0.03,
            color: "#ed1c24",
            particleSizeBase: 1.5,
            particleSizeMultiplier: 0.8,
            flareSizeBase: 100,
            flareSizeMultiplier: 100,
            lineWidth: 2,
            linkChance: 5,
            linkLengthMin: 2,
            linkLengthMax: 3,
            linkOpacity: 0.2,
            linkFade: 100,
            linkSpeed: 0.1,
            glareAngle: -60,
            glareOpacityMultiplier: 0.01,
            renderParticles: true,
            renderParticleGlare: false,
            renderFlares: true,
            renderLinks: true,
            renderMesh: false,
            flicker: true,
            flickerSmoothing: 15,
            blurSize: 1,
            randomMotion: true,
            noiseLength: 1000,
            noiseStrength: 1,
        };

        // Reduce settings if on mobile
        if (/Mobi/.test(navigator.userAgent)) {
            config.particleCount = 25;
            config.flareCount = 5;
            config.noiseLength = 500;
            config.blurSize = 0.5;
        }

        if (!canvas.current) return;

        // The animation calls are handled through the Stars class, which will internally use the context
        // provided by the canvas element to draw the stars. We simply have to initialise and destroy it here.
        const stars = new Stars(canvas.current, config);
        stars.init();

        return () => stars.destroy();
    }, []);

    return <canvas ref={canvas} className="absolute w-screen h-dvh -z-10" />;
}
