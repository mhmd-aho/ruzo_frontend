import Image from "next/image";
import Link from "next/link";
import { ProductSchema, ProductVariantsSchema,MediaSchema } from "@/lib/schemas";
import { Suspense } from "react";
export default async function ItemCard(product: ProductSchema) {
    let variants:ProductVariantsSchema[] = [];
    try{
    const res = await fetch(`${process.env.BACKEND_URL}products/${product.id}/variants/`,{
        headers: {
            "Content-Type": "application/json",
        },
        cache: "no-store",
    });
    const data = await res.json();
    if(!res.ok){
        throw new Error("Failed to fetch product variants")
    }
    variants = data;
    }
    catch(err){
        console.log(err)
    }
    const colors = Array.from(new Map(variants.map((v: ProductVariantsSchema) => [v.color.name, v.color.color_code])).values()).filter(Boolean);
    let image:string = '';
    const firstVariant = variants[0];
    const firstSize = firstVariant?.size;
    const firstColor = firstVariant?.color;
    try{
        const res = await fetch(`${process.env.BACKEND_URL}products/${firstVariant?.id}/media/`,{
            headers: {
                "Content-Type": "application/json",
            },
            cache: "no-store",
        })
        const data:MediaSchema[] = await res.json();
        if(!res.ok){
            throw new Error("Failed to fetch product images")
        }
        if(data.length > 0){
            image = data[0].media_url
            console.log(image)
        }
    }
    catch(err){
        console.log(err)
    }

    return(
        <Link href={`/collections/product/${product.id}?color=${firstColor?.name}&size=${firstSize?.name}`} className="lg:h-[540px] h-[280px] lg:w-[392px] w-[170px] flex flex-col items-start gap-3">
            <div className="lg:h-[438px] h-[220px] w-full overflow-hidden relative">
                {
                    image? 
                    <Suspense fallback={<div className="size-full bg-muted animate-pulse"/>}>
                        <Image fill src={image}  alt="product image" className="object-cover object-bottom"/>
                    </Suspense>
                : <div className="size-full bg-muted animate-pulse"/> }
            </div>
            <div className="flex-1 w-full flex flex-col gap-2">
                <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center w-full">
                    <p className="text-black font-bold font-montserrat text-sm lg:text-base ">{product.name}</p>
                    <p className="text-black font-boldonse text-sm lg:text-base ">${product.price}</p>
                </div>
                <p className="text-mid font-montserrat text-xs lg:w-4/5 max-lg:hidden">{product.description}</p>
                <div className="flex gap-2 max-lg:hidden">
                    {colors.map((color: string, i: number) => (
    <div
        className="size-4 rounded-full border border-mid"
        style={{backgroundColor: color}}
        key={i}
    />
))}
                </div>
            </div>
        </Link>
    )
}