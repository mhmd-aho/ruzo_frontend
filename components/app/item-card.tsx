"use client";

import { useEffect, useState, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { ProductSchema, ProductMediaSchema, ProductVariantsSchema,ColorSchema } from "@/lib/schemas";
type Props = {
    product: ProductSchema
}   
export default function ItemCard({product}: Props) {
    const variants:ProductVariantsSchema[] = product.variants;
    const colors = Array.from(
        new Map(
            variants.map((variant) => [variant.color.id, variant.color])
        ).values()
    )
    const media = product.default_img;
    return (
        <Link 
            href={`/collections/product/${product.id}`} 
            className="lg:h-[540px] h-[280px] lg:w-[392px] w-[170px] flex flex-col items-start gap-3"
        >
            <div className="lg:h-[438px] h-[220px] w-full overflow-hidden relative">
                {media.media_url ? (
                    <Suspense fallback={<div className="size-full bg-muted animate-pulse" />}>
                        <Image fill src={media.media_url} alt="product image" className="object-cover object-bottom" />
                    </Suspense>
                ) : (
                    <div className="size-full bg-muted animate-pulse" />
                )}
            </div>
            <div className="flex-1 w-full flex flex-col gap-2">
                <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center w-full">
                    <p className="text-black font-bold font-montserrat text-sm lg:text-base ">{product.name}</p>
                    <p className="text-black font-boldonse text-sm lg:text-base ">${product.price}</p>
                </div>
                <p className="text-mid font-montserrat text-xs lg:w-4/5 max-lg:hidden">{product.description}</p>
                <div className="flex gap-2 max-lg:hidden">
                    {colors.map((color: ColorSchema) => (
                        <div
                            className="size-4 rounded-full border border-mid"
                            style={{ backgroundColor: color.color_code }}
                            key={color.id}
                        />
                    ))}
                </div>
            </div>
        </Link>
    );
}