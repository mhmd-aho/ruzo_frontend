import Image from "next/image"
import ItemCard from "@/components/app/item-card"
import { ProductSchema, ProductVariantsSchema, MediaType } from "@/lib/schemas";
import AddToCartForm from "@/components/app/add-to-cart-form";
import { Suspense } from "react";

export default async function Product({
    params,
    searchParams
}: {
    params: Promise<{ id: string }>,
    searchParams: Promise<{ color?: string, size?: string }> // Marked as optional since they won't exist on first load
}) {
    // 1. Await the asynchronous params from Next.js 15+ routing
    const { id } = await params;
    const { color, size } = await searchParams;

    let product: ProductSchema | null = null;
    let productVariants: ProductVariantsSchema[] = [];
    let colorVariants: ProductVariantsSchema[] = [];
    let images: string[] = [];

    // 2. Fetch primary product data
    try {
        const res = await fetch(`${process.env.BACKEND_URL}products/${id}/`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });
        const data = await res.json();
        if (!res.ok) throw new Error("Failed to fetch product");
        product = data;
    } catch (err) {
        console.log("Product Fetch Error:", err);
    }

    // 3. Fetch all variants belonging to this product (to extract unique available colors)
    if (product?.id) {
        try {
            const res = await fetch(`${process.env.BACKEND_URL}products/${product.id}/variants/`, {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            });
            const data = await res.json();
            if (!res.ok) throw new Error("Failed to fetch product variants");
            productVariants = data;
        } catch (err) {
            console.log("All Variants Fetch Error:", err);
        }
    }

    // 4. Fetch specific variants filtered by the selected color URL parameter
    // Defensive check: Only fetch if 'color' exists in URL to avoid passing `undefined` to the API
    if (product?.id && color) {
        try {
            const res = await fetch(`${process.env.BACKEND_URL}products/${product.id}/variants/?color=${color}`, {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            });
            const data = await res.json();
            if (!res.ok) throw new Error("Failed to fetch filtered color variants");
            colorVariants = data;
        } catch (err) {
            console.log("Color Variants Fetch Error:", err);
        }
    }

    // 5. Fetch media/images associated with the selected color variant
    if (colorVariants.length > 0) {
        try {
            const res = await fetch(`${process.env.BACKEND_URL}products/${colorVariants[0].id}/media/`, {
                headers: { "Content-Type": "application/json" },
                cache: "no-store",
            });
            const data: MediaType[] = await res.json();
            if (!res.ok) throw new Error("Failed to fetch product images");
            if (data.length > 0) {
                images = data.map((d) => d.media_url);
            }
        } catch (err) {
            console.log("Media Fetch Error:", err);
        }
    }

    // 6. Map unique colors from all variants to render the color selector circles
    const colors = Array.from(
        new Map(productVariants.map(v => [v.color.id, v.color])).values()
    );

    // 7. Map unique sizes available *specifically* for the selected color
    const sizes = Array.from(
        new Map(colorVariants?.map(v => [v.size.id, v.size])).values()
    );

    // 8. Extract primary preview image fallback
    const image = images.length > 0 ? images[0] : '';

    return (
        <>
            <section className="w-full lg:h-[calc(100vh-80px)]">
                <div className="flex flex-col lg:flex-row items-start justify-center lg:gap-16 gap-6 lg:h-[calc(100vh-80px)] lg:px-10 px-5 pb-8">
                    
                    {/* Media Display Section */}
                    <div className="flex relative w-full h-[60vh] lg:h-full lg:w-fit">
                        {/* Static Placeholder thumbnails */}
                        <div className="flex-col gap-3 hidden lg:flex">
                            <div className="bg-black h-28 w-18" />
                            <div className="bg-black h-28 w-18" />
                            <div className="bg-black h-28 w-18" />
                            <div className="bg-black h-28 w-18" />
                        </div>
                        {
                            image ? (
                                <Suspense fallback={<div className="size-full bg-muted animate-pulse" />}>
                                    <Image
                                        width={430}
                                        height={573}
                                        src={image}
                                        alt={product?.name || "Product Image"}
                                        className="lg:w-[430px] lg:h-fit object-center object-cover"
                                    />
                                </Suspense>
                            ) : <div className="size-full bg-muted animate-pulse" />
                        }
                    </div>
                    
                    {/* Interactive Add to Cart Form */}
                    {product && <AddToCartForm sizes={sizes} colors={colors} product={product} />}
                </div>
            </section>
            
            {/* Recommendations Section */}
            <section className="lg:h-[calc(100vh-80px)] w-full lg:px-10 px-5 pt-8 pb-12">
                <div className="flex flex-col gap-8">
                    <h2 className="text-2xl lg:text-4xl font-boldonse">You May Also Like</h2>
                    {/* <div className="lg:flex lg:justify-between lg:px-14 flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory">
                        {Array(3).fill(0).map((_, i) => (
                            <div key={i + 1} className="snap-start shrink-0 w-[70vw] lg:w-auto">
                                <ItemCard />
                            </div>
                        ))}
                    </div> */}
                </div>
            </section>
        </>
    )
}