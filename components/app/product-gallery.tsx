"use client"

import Image from "next/image"
import { useState } from "react"

type Props = {
    images: string[]
    alt: string
}

export default function ProductGallery({ images, alt }: Props) {
    const [selected, setSelected] = useState(0)
    const activeImage = images[selected] ?? ""

    return (
        <div className="flex relative w-full h-[60vh] lg:h-full lg:w-fit gap-2">
            <div className="flex-col gap-3 hidden lg:flex">
                {images.length > 0 ? (
                    images.map((img, i) => (
                        <button
                            key={img + i}
                            type="button"
                            onClick={() => setSelected(i)}
                            className={`relative h-28 w-18 overflow-hidden ${
                                selected === i ? "ring-2 ring-black" : ""
                            }`}
                        >
                            <Image
                                fill
                                src={img}
                                alt={`${alt} thumbnail ${i + 1}`}
                                className="object-cover"
                            />
                        </button>
                    ))
                ) : (
                    Array(4).fill(0).map((_, i) => (
                        <div key={i} className="bg-black h-28 w-18" />
                    ))
                )}
            </div>

            {activeImage ? (
                <Image
                    width={430}
                    height={573}
                    src={activeImage}
                    alt={alt}
                    className="lg:w-[430px] lg:h-fit object-center object-cover"
                />
            ) : (
                <div className="size-full bg-muted animate-pulse" />
            )}
        </div>
    )
}