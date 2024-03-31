/**
 * Dynamic display box.
 * @author Lucas Bubner, 2023
 */
import { CSSProperties, HTMLAttributes } from "react";

interface BoxProps extends HTMLAttributes<HTMLElement> {
    src?: string;
    size: number;
    extrablur?: boolean;
    small?: boolean;
    href?: string;
    children: React.ReactNode;
}

function Box({ src, size, extrablur, small, href, children, ...rest }: BoxProps) {
    const imgStyle: CSSProperties = {
        width: `${size}%`,
        height: "auto",
        position: size > 100 ? "relative" : "revert",
        top: size > 100 ? "50%" : "",
        left: size > 100 ? "50%" : "",
        transform: size > 100 ? "translateX(-50%)" : "",
    };

    const backgroundImage = (
        <div className={`bog${extrablur ? " inc" : ""}`}>
            <img alt="" src={src} style={imgStyle} />
        </div>
    );

    return href ? (
        <a className={`box clk${small ? " bsm" : ""}`} href={href} target="_blank" {...rest}>
            {backgroundImage}
            {children}
        </a>
    ) : (
        <div className={`box${small ? " bsm" : ""}`} {...rest}>
            {backgroundImage}
            {children}
        </div>
    );
}

export default Box;
