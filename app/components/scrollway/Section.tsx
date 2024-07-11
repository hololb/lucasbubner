"use client";

import { StaticImageData } from "next/image";
import Image from "next/image";

/**
 * Scrollway text and image combo.
 * @author Lucas Bubner, 2024
 */
export default function Section({
    comments,
    images,
    alignTextLeft
}: {
    comments: JSX.Element[];
    images: { src: StaticImageData; alt: string }[];
    alignTextLeft?: boolean;
}) {
    return (
        <div className={`${alignTextLeft ? "__scrollway-align-right " : ""}__scrollway`}>
            <div className="__scrollway-imgs">
                {images.map((image, index) => (
                    <Image
                        key={index}
                        width={140}
                        src={image.src}
                        title={image.alt}
                        alt={image.alt}
                        draggable={false}
                    />
                ))}
            </div>
            <div>
                {comments.map((comment, index) => (
                    <div key={index} className="text-white text-2xl font-light ml-8 mt-3 p-4 leading-snug z-10">
                        {comment}
                    </div>
                ))}
            </div>
        </div>
    );
}
