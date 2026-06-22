"use client"
import Link from "next/link";
import Arrow from "../svg/arrow";
import { useEffect, useState } from "react";

export default function CollectionButton() {
    const [isHovered, setIsHovered] = useState(false);
    useEffect(()=>{
        if (isHovered) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
    },[isHovered])
    return (
        <div className="h-full flex items-center">
            <button 
            className="h-full flex items-center gap-2"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            >
                Collections <Arrow />
            </button>
            {isHovered && (
                <div  className="absolute top-20 left-0 bg-black/20 backdrop-blur-sm w-full h-screen">
                    <div onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} className="ml-60 flex flex-col items-start justify-start gap-6 bg-white w-96 h-72 border border-muted p-9">
                        <h3 className="text-lg text-primary font-bold">Shop by Category</h3>
                        <div className="flex flex-wrap justify-start gap-8 items-center">
                            <Link className="text-mid text-base" href='/collections'>All Collections</Link>
                            <Link className="text-mid text-base" href='/collections'>In Stock</Link>
                            <Link className="text-mid text-base" href='/collections'>Jeans</Link>
                            <Link className="text-mid text-base" href='/collections'>Sets</Link>
                            <Link className="text-mid text-base" href='/collections'>Skirts</Link>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}