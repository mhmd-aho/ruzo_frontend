"use client"
import { useState } from "react";
import Sreach from "../svg/sreach";
import Link from "next/link";
export default function SearchBar() {
    const [results,setResults] = useState(false)
    return(
        <>
            <div className="rounded-full shadow-md w-2/5 h-8 size-12  justify-start items-center p-2 hidden lg:flex shadow-primary/50 relative">
                <Sreach/>
                <input type="text" placeholder="Search..." className="hidden lg:block appearance-none border-0 bg-transparent focus:outline-none focus:border-0 " />
            </div>
            {results && (
                <div className="fixed top-20 right-0 w-full h-screen bg-black/20 backdrop-blur-sm">
                        <div className="absolute top-0 right-[10%] bg-white text-black p-12 w-1/3 h-fit flex flex-col gap-6">
                        <h3 className="text-black text-lg font-montserrat">Recent searches</h3>
                            <div className="flex flex-col gap-4">
                                {Array.from({length: 5}).map((_,i)=>(
                                    <Link href="/" key={i} className="flex gap-2">
                                        <div className="bg-primary w-12 h-12"/>
                                        <div className="flex flex-col">
                                            <p className="text-black text-lg">name</p>
                                            <p className="text-black text-lg">description</p>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                   </div>
                </div>
            )}
        </>
    )
}