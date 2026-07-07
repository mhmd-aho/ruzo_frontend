"use client"
import { getBestSellers } from "@/app/action";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ItemCard from "./item-card";
import { ProductSchema } from "@/lib/schemas";

const AUTOPLAY_DELAY = 3000; // ms between auto-advances
const RESUME_DELAY = 6000;   // ms of inactivity before autoplay resumes

export default function BestSeller() {
    const [bestSellers, setBestSellers] = useState<ProductSchema[]>([]);
    const [activeIndex, setActiveIndex] = useState(0);

    const cardRefs = useRef<(HTMLLIElement | null)[]>([]);
    const seamlessLoopRef = useRef<gsap.core.Timeline | null>(null);
    const scrubRef = useRef<gsap.core.Tween | null>(null);
    const playheadRef = useRef({ offset: 0 });
    const spacingRef = useRef(0.1);
    const autoplayTimer = useRef<ReturnType<typeof setInterval> | null>(null);
    const resumeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

    // fetch data
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

    // build the seamless GSAP loop once cards are in the DOM
    useEffect(() => {
        if (bestSellers.length === 0) return;

        const cards = cardRefs.current.filter(Boolean) as HTMLLIElement[];
        if (cards.length === 0) return;

        const spacing = 1 / cards.length;
        spacingRef.current = spacing;

        // Set initial state: out of frame hidden elements start at 0 opacity
        gsap.set(cards, { xPercent: 250, opacity: 0, scale: 0.6 });

        const animateFunc = (element: HTMLElement) => {
            const tl = gsap.timeline();
            tl.fromTo(
                element,
                { scale: 0.6, opacity: 0.25, zIndex: 10 },
                {
                    scale: 1,
                    opacity: 1,
                    zIndex: 100,
                    duration: 0.5,
                    yoyo: true,
                    repeat: 1,
                    ease: "power2.out",
                    immediateRender: false,
                }
            ).fromTo(
                element,
                { xPercent: 220 },
                { xPercent: -220, duration: 1, ease: "none", immediateRender: false },
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
            duration: 0.5,
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

    return (
        <div className="relative w-full flex flex-col items-center gap-6 overflow-visible">
            {/* Added 3D perspective and allowed cards to look seamless across boundaries */}
            <ul className="relative w-full h-[460px] overflow-visible list-none p-0 m-0 [perspective:1000px]">
                {bestSellers.length > 0 ? (
                    bestSellers.map((item, i) => (
                        <li
                            key={item.id}
                            ref={(el) => { cardRefs.current[i] = el; }}
                            className="absolute top-0 left-1/2 -translate-x-1/2 w-64 transition-opacity custom-carousel-card"
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
                <div className="flex gap-2 z-20">
                    {bestSellers.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => handleDotClick(i)}
                            aria-label={`Go to slide ${i + 1}`}
                            className={`h-2.5 rounded-full transition-all duration-300 ${
                                i === activeIndex ? "bg-black w-6" : "bg-gray-300 w-2.5"
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
            // @ts-expect-error - internal GSAP fix from the original pen
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