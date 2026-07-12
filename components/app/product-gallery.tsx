"use client";

import { useState, useRef } from "react"
import { getOptimizedImageUrl } from "@/lib/utils"

type Props = {
    images: string[]
    alt: string
}

export default function ProductGallery({ images, alt }: Props) {
    const [selected, setSelected] = useState(0)
    const [prevImages, setPrevImages] = useState(images)

    // Touch swipe gesture refs & state for mobile
    const touchStartX = useRef<number | null>(null)
    const touchEndX = useRef<number | null>(null)
    const [swipeOffset, setSwipeOffset] = useState(0)
    const [isSwiping, setIsSwiping] = useState(false)

    if (images !== prevImages) {
        setPrevImages(images)
        setSelected(0)
    }

    const activeImage = images[selected] ?? ""

    const handleNext = () => {
        if (images.length <= 1) return
        setSelected((prev) => (prev + 1) % images.length)
    }

    const handlePrev = () => {
        if (images.length <= 1) return
        setSelected((prev) => (prev - 1 + images.length) % images.length)
    }

    // Touch Event Handlers
    const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
        if (images.length <= 1) return
        touchStartX.current = e.targetTouches[0].clientX
        touchEndX.current = null
        setIsSwiping(true)
    }

    const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
        if (images.length <= 1 || touchStartX.current === null) return
        const currentX = e.targetTouches[0].clientX
        touchEndX.current = currentX
        const diff = currentX - touchStartX.current
        // Limit visual drag resistance so it feels natural and smooth
        setSwipeOffset(diff * 0.8)
    }

    const handleTouchEnd = () => {
        setIsSwiping(false)
        if (images.length <= 1 || touchStartX.current === null || touchEndX.current === null) {
            setSwipeOffset(0)
            return
        }

        const distance = touchStartX.current - touchEndX.current
        const minSwipeDistance = 50 // Minimum distance in pixels to trigger slide

        if (Math.abs(distance) > minSwipeDistance) {
            if (distance > 0) {
                // Swiped left -> show next image
                handleNext()
            } else {
                // Swiped right -> show previous image
                handlePrev()
            }
        }
        setSwipeOffset(0)
        touchStartX.current = null
        touchEndX.current = null
    }

    return (
        <div className="flex flex-col lg:flex-row relative w-full h-fit lg:w-fit lg:gap-4 gap-2">
            {/* Desktop Side Thumbnails */}
            <div className="flex-col gap-3 hidden lg:flex shrink-0">
                {images.length > 0 ? (
                    images.map((img, i) => (
                        <button
                            key={img + i}
                            type="button"
                            onClick={() => setSelected(i)}
                            className={`relative h-28 w-20 overflow-hidden rounded border bg-neutral-50 ${
                                selected === i ? "ring-2 ring-black border-transparent" : "border-neutral-200"
                            }`}
                        >
                            <img
                                src={getOptimizedImageUrl(img, 160, 224, "scale_crop", "center")}
                                alt={`${alt} thumbnail ${i + 1}`}
                                className="object-cover w-full h-full"
                                decoding="async"
                            />
                        </button>
                    ))
                ) : (
                    Array(4).fill(0).map((_, i) => (
                        <div key={i} className="bg-neutral-200 animate-pulse h-28 w-20 rounded" />
                    ))
                )}
            </div>

            {/* Main Interactive Image Box with Touch Swipe Support */}
            <div
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                className="relative w-full h-[65vh] min-h-[450px] max-h-[600px] sm:max-w-md md:max-w-lg lg:w-[430px] lg:h-[550px] overflow-hidden bg-neutral-100 rounded-lg mx-auto lg:mx-0 touch-pan-y"
            >
                {activeImage ? (
                    <img
                        src={getOptimizedImageUrl(activeImage, 860, 1100, "preview")}
                        alt={alt}
                        style={{
                            transform: `translateX(${swipeOffset}px)`,
                        }}
                        className={`w-full h-full object-center object-cover select-none ${
                            !isSwiping ? "transition-transform duration-300 ease-out" : ""
                        }`}
                        decoding="async"
                        loading="eager"
                        fetchPriority="high"
                    />
                ) : (
                    <div className="size-full bg-neutral-200 animate-pulse" />
                )}

                {/* Mobile Navigation Controls (Hidden on desktop layout) */}
                {images.length > 1 && (
                    <>
                        <button
                            type="button"
                            onClick={handlePrev}
                            className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-black p-2.5 rounded-full shadow-lg transition-all active:scale-90 lg:hidden z-20 touch-manipulation"
                            aria-label="Previous image"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                            </svg>
                        </button>

                        <button
                            type="button"
                            onClick={handleNext}
                            className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-black p-2.5 rounded-full shadow-lg transition-all active:scale-90 lg:hidden z-20 touch-manipulation"
                            aria-label="Next image"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                            </svg>
                        </button>
                        
                        {/* Page Counter Dots Indicator */}
                        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 bg-black/20 px-2 py-1 rounded-full lg:hidden backdrop-blur-xs">
                            {images.map((_, idx) => (
                                <span 
                                    key={idx} 
                                    className={`h-1.5 rounded-full transition-all duration-200 ${idx === selected ? "w-3 bg-white" : "w-1.5 bg-white/50"}`}
                                />
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}