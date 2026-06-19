"use client"
import { useState } from "react"
import { Menu } from "../svg/menu";
import { Exit } from "../svg/exit";
import Link from "next/link";
export default function MobileMenu() {
    const [showMenu, setShowMenu] = useState(false)
    return(
        <div className="size-6">
            <button onClick={() => setShowMenu(!showMenu)}>
                {showMenu ? (
                    <Exit fill="primary"/>
                ) : (
                    <Menu/>
                )}
            </button>
            {showMenu && (
                <div className="fixed top-12 left-0 w-full h-screen z-50 bg-white p-6">
                    <div className="flex flex-col">
                        <Link className="p-2 border-b-2 border-black" href="/">Home</Link>
                        <Link className="p-2 border-b-2 border-black" href="/">Collections</Link>
                        <Link className="p-2 border-b-2 border-black" href="/">About</Link>
                        <Link className="p-2 border-b-2 border-black" href="/">Contact</Link>
                    </div>
                </div>
            )}
        </div>
    )
}