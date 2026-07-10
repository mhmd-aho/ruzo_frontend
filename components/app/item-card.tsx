"use client";
import { useState } from "react";
import Link from "next/link";
import { ProductSchema, ProductVariantsSchema,ColorSchema } from "@/lib/schemas";
import { getOptimizedImageUrl } from "@/lib/utils";
type Props = {
    product: ProductSchema
    admin:boolean
}   
export default function ItemCard({product,admin}: Props) {
    const [isLoading, setIsLoading] = useState(true);
    const variants:ProductVariantsSchema[] = product.variants;
    const colors = Array.from(
        new Map(
            variants.map((variant) => [variant.color.id, variant.color])
        ).values()
    )
    const media = product.default_img;
    const isPants = product.category.name.toLowerCase().includes("pant") || product.category.name.toLowerCase().includes("trouser");
    return (
        <Link 
            href={`${admin ? `/admin/products/edit/${product.id}` : `/collections/product/${product.id}`} `} 
            className="lg:h-[540px] h-[280px] lg:w-[392px] sm:h-[400px] sm:w-[250px] max-sm:w-[170px] flex flex-col items-start gap-3"
        >
<div className="lg:h-[438px] sm:h-[340px] h-[150px] w-full overflow-hidden relative bg-gray-100">
                {media?.media_url ? (
                    <>
                        {isLoading && (
                            <div className="absolute inset-0 bg-gray-200 animate-pulse z-10" />
                        )}
                        <img
                            src={getOptimizedImageUrl(
                                media.media_url,)}
                            alt={product.name}
                            className={`w-full h-full object-cover ${
                                isPants ? "object-[50%_150%] scale-125" : "object-top"
                            } transition-all duration-500 ${
                                isLoading ? "blur-md scale-105" : "blur-0 scale-100"
                            }`}
                            loading="lazy"
                            decoding="async"
                            onLoad={() => setIsLoading(false)}
                        />
                    </>
                ) : (
                    <div className="size-full bg-gray-200" />
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