import ItemCard from "@/components/app/item-card";
import Filters from "@/components/app/filters";
import { ProductSchema } from "@/lib/schemas";
import { CACHE_TAGS, withCacheTags } from "@/lib/cache-tags";
import { Metadata } from "next";
import { getOptimizedImageUrl } from "@/lib/utils";

export const metadata:Metadata = {
    title: "Ruzo | Collections",
    description: "Discover the best collections at Ruzo",
};
export default async function Collections({
    searchParams,
}: {
    searchParams: Promise<{ category?: string; sort?: string,color?:string,size?:string }>;
}) {
    const { category, sort,color,size } = await searchParams;
    let collections: ProductSchema[] = [];

    try {
        const queryParams = new URLSearchParams();
        if (category) queryParams.set("category", category);
        if (sort) queryParams.set("sort", sort);
        if (color) queryParams.set("color", color);
        if (size) queryParams.set("size", size);

        const queryString = queryParams.toString();
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}products/${queryString ? `?${queryString}` : ""}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            ...withCacheTags(CACHE_TAGS.products),
            cache: "no-store",
        });

        const data = await res.json();
        if (!res.ok) {
            throw new Error(data?.error || "Failed to fetch products");
        }
        collections = data.results || [];
    } catch (err) {
        console.error("Fetch products error:", err);
    }

    return (
        <main className="h-fit w-full flex flex-col lg:gap-12 gap-4">
            <section className="h-[calc(100vh-48px)] lg:h-[calc(100vh-80px)] relative">
                <img 
                    src={getOptimizedImageUrl("https://3yrpgg4xvr.ucarecd.net/3d5106d6-cbc8-40b3-bae8-f78d096665e1/0B7A7879copy.webp", 1600, 1000, "preview")} 
                    alt="The Solis Draped" 
                    className="absolute top-0 left-0 w-full h-full object-center object-cover" 
                    decoding="async"
                    loading="eager"
                />
            </section>
            <section className="min-h-screen flex flex-col lg:flex-row items-center lg:items-start lg:px-28 gap-6 pb-10">
                <Filters />
                <div className="grid grid-cols-2 gap-5 flex-1">
                    {collections.length === 0 ? (
                        <p className="col-span-2 text-center text-mid py-12">No products found matching the criteria.</p>
                    ) : (
                        collections.map((product) => (
                            <ItemCard key={product.id} product={product} admin={false} />
                        ))
                    )}
                </div>
            </section>
        </main>
    );
}
