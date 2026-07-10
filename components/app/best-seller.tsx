"use client";
import { getBestSellers } from "@/app/action";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ItemCard from "./item-card";
import { ProductSchema } from "@/lib/schemas";

const AUTOPLAY_DELAY = 3000;
const RESUME_DELAY = 6000;

export interface BestSellerProps {
    initialProducts?: ProductSchema[];
}

export default function BestSeller({ initialProducts = [] }: BestSellerProps) {
    const [bestSellers, setBestSellers] = useState<ProductSchema[]>(initialProducts);
    const [activeIndex, setActiveIndex] = useState(0);

    const cardRefs = useRef<(HTMLLIElement | null)[]>([]);
    const seamlessLoopRef = useRef<gsap.core.Timeline | null>(null);
    const scrubRef = useRef<gsap.core.Tween | null>(null);
    const playheadRef = useRef({ offset: 0 });
    const spacingRef = useRef(0.1);
    const autoplayTimer = useRef<ReturnType<typeof setInterval> | null>(null);
    const resumeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        const getdata = async () => {
            const res = await getBestSellers();
            if (res.success) {
                setBestSellers(res.data);
            }
        };
        if (bestSellers.length === 0) {
            getdata();
        }
    }, [bestSellers]);

    const goTo = (index: number) => {
        const scrub = scrubRef.current;
        if (!scrub) return;
        scrub.vars.offset = index * spacingRef.current;
        scrub.invalidate().restart();
        setActiveIndex(index);
    };

    const startAutoplay = () => {
        if (autoplayTimer.current) clearInterval(autoplayTimer.current);
        if (bestSellers.length <= 1) return;
        autoplayTimer.current = setInterval(() => {
            setActiveIndex((prev) => {
                const next = (prev + 1) % bestSellers.length;
                goTo(next);
                return next;
            });
        }, AUTOPLAY_DELAY);
    };

    const handleDotClick = (index: number) => {
        if (autoplayTimer.current) clearInterval(autoplayTimer.current);
        if (resumeTimer.current) clearTimeout(resumeTimer.current);
        goTo(index);
        resumeTimer.current = setTimeout(startAutoplay, RESUME_DELAY);
    };

    useEffect(() => {
        if (bestSellers.length === 0) return;

        const cards = cardRefs.current.filter(Boolean) as HTMLLIElement[];
        if (cards.length === 0) return;

        const spacing = 1 / cards.length;
        spacingRef.current = spacing;

        // Base initialization: all elements center-aligned over left: 50%
        gsap.set(cards, { xPercent: -50, opacity: 0, scale: 0.7, x: 0 });

        const animateFunc = (element: HTMLElement) => {
            const tl = gsap.timeline();
            
            // 1. Scale, Opacity, and Layer Depth (zIndex) configuration
            tl.fromTo(
                element,
                { scale: 0.7, opacity: 0.35, zIndex: 10 },
                {
                    scale: 1,
                    opacity: 1,
                    zIndex: 100,
                    duration: 0.5,
                    yoyo: true,
                    repeat: 1,
                    ease: "power2.inOut",
                    immediateRender: false,
                }
            )
            // 2. Horizontal movement tracking: 
            // Slides in from the right peek zone, settles center, departs to the left peek zone
            .fromTo(
                element,
                { x: "120%" }, 
                { x: "-120%", duration: 1, ease: "none", immediateRender: false },
                0
            );
            return tl;
        };

        const seamlessLoop = buildSeamlessLoop(cards, spacing, animateFunc);
        seamlessLoopRef.current = seamlessLoop;

        const playhead = playheadRef.current;
        playhead.offset = 0;
        const wrapTime = gsap.utils.wrap(0, seamlessLoop.duration());

        const scrub = gsap.to(playhead, {
            offset: 0,
            duration: 0.6,
            ease: "power3.out",
            paused: true,
            onUpdate() {
                seamlessLoop.time(wrapTime(playhead.offset));
            },
        });
        scrubRef.current = scrub;

        startAutoplay();

        return () => {
            seamlessLoop.kill();
            scrub.kill();
            if (autoplayTimer.current) clearInterval(autoplayTimer.current);
            if (resumeTimer.current) clearTimeout(resumeTimer.current);
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [bestSellers]);

    return (
        <div className="relative w-full flex flex-col items-center lg:gap-6 gap-3 overflow-hidden">
            <ul className="relative w-full lg:h-[540px] h-[280px] list-none p-0 m-0 [perspective:1200px] [transform-style:preserve-3d]">
                {bestSellers.length > 0 ? (
                    bestSellers.map((item, i) => (
                        <li
                            key={item.id}
                            ref={(el) => { cardRefs.current[i] = el; }}
                            className="absolute top-0 left-1/2 lg:w-[392px] w-[220px] custom-carousel-card"
                        >
                            <ItemCard product={item} admin={false} />
                        </li>
                    ))
                ) : (
                    <div className="flex justify-center items-center w-full h-full">
                        <p>No best sellers found</p>
                    </div>
                )}
            </ul>

            {bestSellers.length > 0 && (
                <div className="flex gap-2 z-20 mt-4">
                    {bestSellers.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => handleDotClick(i)}
                            aria-label={`Go to slide ${i + 1}`}
                            className={`h-2.5 rounded-full transition-all duration-300 ${
                                i === activeIndex ? "bg-primary w-6" : "bg-gray-300 w-2.5"
                            }`}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

function buildSeamlessLoop(
    items: HTMLElement[],
    spacing: number,
    animateFunc: (el: HTMLElement) => gsap.core.Timeline
) {
    const overlap = Math.ceil(1 / spacing);
    const startTime = items.length * spacing + 0.5;
    const loopTime = (items.length + overlap) * spacing + 1;
    const rawSequence = gsap.timeline({ paused: true });
    const seamlessLoop = gsap.timeline({
        paused: true,
        repeat: -1,
        onRepeat() {
            if (this._time === this._dur) this._tTime += this._dur - 0.01;
        },
    });
    const l = items.length + overlap * 2;

    for (let i = 0; i < l; i++) {
        const index = i % items.length;
        const time = i * spacing;
        rawSequence.add(animateFunc(items[index]), time);
    }

    rawSequence.time(startTime);
    seamlessLoop
        .to(rawSequence, { time: loopTime, duration: loopTime - startTime, ease: "none" })
        .fromTo(
            rawSequence,
            { time: overlap * spacing + 1 },
            {
                time: startTime,
                duration: startTime - (overlap * spacing + 1),
                immediateRender: false,
                ease: "none",
            }
        );
    return seamlessLoop;
}