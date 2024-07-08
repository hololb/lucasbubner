"use client";

import Typewriter from "typewriter-effect";

export default function Writer() {
    return (
        <div className="text-center text-6xl font-bold text-white leading-tight">
            <noscript>
                computational
                <br /> brilliance.
            </noscript>
            <Typewriter
                options={{
                    cursor: "|",
                    delay: 90,
                }}
                onInit={(t) => {
                    t.pauseFor(800).typeString("computational<br>brilliance.").pauseFor(100).start();
                }}
            />
        </div>
    );
}
