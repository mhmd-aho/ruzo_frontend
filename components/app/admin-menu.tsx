"use client";
import { useEffect, useState } from "react";
import { Menu } from "../svg/menu";
import Link from "next/link";
export default function AdminMenu(){
    const [isOpen,setIsOpen] = useState(false);
    useEffect(()=>{
        if(isOpen){
            document.body.style.overflow = "hidden";
        }else{
            document.body.style.overflow = "auto";
        }
    },[isOpen])
    return (
        <div className="relative w-1/6">
            <button onClick={() => setIsOpen(!isOpen)}>
                <Menu/>
            </button>
            {
                isOpen && (
                    <div className="absolute top-10 -left-5 bg-card border border-muted flex flex-col gap-2 lg:size-96 h-[calc(100svh-4rem)] w-screen bg-white z-50 p-5 text-lg font-semibold">
                        <Link onClick={() => setIsOpen(false)} href="/admin" className="text-primary">Dashboard</Link>
                        <Link onClick={() => setIsOpen(false)} href="/admin/products" className="text-primary">Products</Link>
                        <Link onClick={() => setIsOpen(false)} href="/admin/orders" className="text-primary">Orders</Link>
                    </div>
                )
            }
        </div>
    )
}