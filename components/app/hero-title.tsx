"use client"
import { useGSAP } from "@gsap/react"
import {gsap} from "gsap";
import Link from "next/link";
import SecondaryButton from "../buttons/secondary";
import { useRef } from "react";

export default function HeroTitle() {
    const container = useRef(null);
    useGSAP(()=>{
        const tl = gsap.timeline()
        tl.to(".hero-title",{opacity:1,y:0,duration:.4})
        tl.to(".hero-button",{opacity:1,y:0,duration:.4})
        tl.to(".hero-p",{opacity:1,y:0,duration:.4})
    },[container])
    return(
        <div ref={container} className="max-lg:absolute max-lg:top-15 max-lg:left-1/2 max-lg:-translate-x-1/2 flex flex-col justify-center lg:items-start items-center gap-5 z-10">
          <p className="font-montserrat text-mid text-center text-sm hidden lg:block">Summer Collection &apos;26</p>
          <h1 className="hero-title font-boldonse text-2xl lg:text-5xl lg:w-[400px] w-xs leading-normal text-black text-center lg:text-start opacity-0 translate-y-5">Where Confidence Becomes Style.</h1>
          <Link className="hero-button opacity-0 translate-y-5" href="/collections">
              <SecondaryButton>SHOP NOW</SecondaryButton>
          </Link>
          <p className="hero-p font-montserrat text-black text-start text-sm lg:w-[300px] w-[200px] hidden lg:block opacity-0 translate-y-5">Curated pieces for women who move through the world on their own terms. Sustainable, elevated, unapologetic</p>
        </div>
    )
}