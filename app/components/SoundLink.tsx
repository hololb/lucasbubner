"use client";

import Link, { LinkProps } from "next/link";
import { forwardRef, HTMLProps } from "react";
import useSound from "use-sound";

/**
 * Drop-in replacement for next/link with a sound effect to play on click.
 * @author Lucas Bubner, 2024
 */
const SoundLink = forwardRef<
    HTMLAnchorElement,
    LinkProps & HTMLProps<HTMLAnchorElement> & { children: React.ReactNode }
>(({ children, ...props }, ref) => {
    const [play] = useSound("/sounds/page.mp3");
    return (
        <Link {...props} ref={ref} onClick={() => play()}>
            {children}
        </Link>
    );
});

SoundLink.displayName = "SoundLink";
export default SoundLink;
