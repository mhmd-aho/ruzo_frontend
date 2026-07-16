import ItemCard from "@/components/app/item-card";
import Filters from "@/components/app/filters";
import { ProductSchema } from "@/lib/schemas";
import { CACHE_TAGS, withCacheTags } from "@/lib/cache-tags";
import { Metadata } from "next";
import Pagination from "@/components/app/pagination";
import Image from "next/image";

export const metadata:Metadata = {
    title: "AURA | Collections",
    description: "Discover the best collections at AURA",
};
export default async function Collections({
    searchParams,
}: {
    searchParams: Promise<{ category?: string; sort?: string,color?:string,size?:string; page?: string }>;
}) {
    const resolvedParams = await searchParams;
    const { category, sort, color, size, page } = resolvedParams;
    let collections: ProductSchema[] = [];
    let totalCount = 0;

    try {
        const queryParams = new URLSearchParams();
        if (category) queryParams.set("category", category);
        if (sort) queryParams.set("sort", sort);
        if (color) queryParams.set("color", color);
        if (size) queryParams.set("size", size);
        if (page) queryParams.set("page", page);

        const queryString = queryParams.toString();
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}products/${queryString ? `?${queryString}` : ""}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            ...withCacheTags(CACHE_TAGS.products),
        });

        const data = await res.json();
        if (!res.ok) {
            throw new Error(data?.error || "Failed to fetch products");
        }
        collections = data.results || [];
        totalCount = data.count || 0;
    } catch (err) {
        console.error("Fetch products error:", err);
    }

    const currentPage = parseInt(page || "1", 10);
    const pageSize = 12;
    const totalPages = totalCount > 0 ? Math.ceil(totalCount / pageSize) : 1;

    return (
        <main className="h-fit w-full flex flex-col lg:gap-12 gap-4">
            <section className="h-[calc(100vh-48px)] lg:h-[calc(100vh-80px)] relative">
                <Image 
                    fill
                    src="/collections-hero.png" 
                    alt="AURA Collections Hero" 
                    className="absolute top-0 left-0 w-full h-full object-center object-cover" 
                    decoding="async"
                    loading="eager"
                    fetchPriority="high"
                />
            </section>
            <section className="min-h-screen flex flex-col lg:flex-row items-center lg:items-start lg:px-28 gap-6 pb-10">
                <Filters />
                <div className="flex flex-col items-center justify-start gap-8 flex-1 w-full">
                    <div className="grid grid-cols-2 sm:gap-5 gap-2 max-lg:px-2 w-fit">
                        {collections.length === 0 ? (
                            <p className="col-span-2 text-center text-mid py-12">No products found matching the criteria.</p>
                        ) : (
                            collections.map((product, index) => (
                                <ItemCard key={product.id} product={product} admin={false} priority={index < 4} />
                            ))
                        )}
                    </div>
                    {totalPages > 1 && (
                        <Pagination 
                            currentPage={currentPage} 
                            totalPages={totalPages} 
                            searchParams={resolvedParams} 
                        />
                    )}
                </div>
            </section>
        </main>
    );
}
