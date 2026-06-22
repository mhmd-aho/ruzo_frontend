"use client"
import { usePathname } from "next/navigation"
import React from "react"
export default function PageLocation() {
    const path = usePathname()
    const pathArray = path.split('/').filter(p => p !== "")
    
    return (
        <div className="flex items-center justify-start gap-2 lg:h-16 h-10 lg:px-10 px-5">
            {
                pathArray.map((p, i) => {
                    return (
                        <React.Fragment key={i}>
                            <div>
                                <h1 className={`uppercase ${p === pathArray[pathArray.length - 1] ? "text-black" : "text-primary"}`}>{p}</h1>
                            </div>
                            {
                                i < pathArray.length - 1 && (
                                    <span>/</span>
                                )
                            }
                        </React.Fragment>
                    )
                })
            }
        </div>
    )
}
    
    