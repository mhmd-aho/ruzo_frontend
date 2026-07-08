"use client"
import Link from "next/link";
import Arrow from "../svg/arrow";
import { useEffect, useState } from "react";
import { getCategories } from "@/app/action";
import {CategorySchema} from "@/lib/schemas"

export default function CollectionButton() {
    const [isHovered, setIsHovered] = useState(false);
    const [categories, setCategories] = useState<CategorySchema[]>([]);
    useEffect(()=>{
        if (isHovered) {
            const scrollBar = window.innerWidth - document.body.clientWidth;
            document.body.style.overflow = "hidden";
            document.body.style.paddingRight = scrollBar + "px";
        } else {
            document.body.style.overflow = "auto";
            document.body.style.paddingRight = "0px";
        }
    },[isHovered])
    useEffect(()=>{
        if (!categories.length) {
            const getCategoriesData = async () => {
                const res = await getCategories();
                if (res.success) {
                    setCategories(res.data);
                }
            }
            getCategoriesData();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    return (
        <div className="h-fit lg:h-full max-lg:w-full flex flex-col items-center">
            <button 
            className="lg:h-full max-lg:w-full max-lg:p-2 max-lg:border-b-2 max-lg:border-black flex items-center max-lg:justify-between gap-2 cursor-pointer"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={() => setIsHovered(!isHovered)}
            >
                Collections <Arrow open={isHovered}/>
            </button>
            {isHovered && (
                <div  className="lg:absolute lg:top-20 lg:left-0 lg:bg-black/20 lg:backdrop-blur-sm w-full lg:h-screen h-fit">
                    <div onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} className="flex flex-col items-start justify-start gap-6 bg-white w-full h-72 lg:p-9 p-3 overflow-auto">
                        <h3 className="lg:text-xl text-sm text-primary font-bold max-lg:hidden">Shop by Category</h3>
                        <div className="flex flex-wrap max-lg:flex-col justify-start max-lg:items-start gap-8 items-center">
                            <Link onClick={() => setIsHovered(false)} className="text-mid text-sm lg:text-xl " href='/collections'>All Collections</Link>
                            {categories.map((category) => (
                                <Link key={category.id} onClick={() => setIsHovered(false)} className="text-mid text-sm lg:text-xl " href={`/collections/?category=${category.name}`}>{category.name}</Link>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}