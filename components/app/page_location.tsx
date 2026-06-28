"use client"
import { usePathname } from "next/navigation"
import Link from "next/link"
import React from "react"
export default function PageLocation() {
    const path = usePathname()
    
    return (
        <div className="flex items-center justify-start gap-2 lg:h-16 h-10 lg:px-10 px-5">
            <p className="text-primary">Checkout</p>
            <span>/</span>
            {
                path.includes('order') && (
                    <>
                        <p className="text-primary">Order</p>
                        <span>/</span>
                    </>
                )
            }
            {
                path.includes('payment') &&
                <>
                    <Link href="/checkout/order" className="text-primary">Order</Link>
                    <span>/</span>
                    <p>Payment</p>
                    <span>/</span>
                </>
            }
        </div>
    )
}
    
    