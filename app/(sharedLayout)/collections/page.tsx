import Image from "next/image";
import bg from "@/public/hero.png";
import ItemCard from "@/components/app/item-card";
import Filters from "@/components/app/filters";
import { ProductSchema } from "@/lib/schemas";
import { Metadata } from "next";
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
        const url = `${process.env.BACKEND_URL}products/${queryString ? `?${queryString}` : ""}`;

        const res = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
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
                <div className="top-0 left-0 w-full h-full relative">
                    <Image src={bg} alt="" fill className="object-cover" priority />
                </div>
            </section>
            <section className="min-h-screen flex flex-col lg:flex-row items-center lg:items-start lg:px-28 gap-6 pb-10">
                <Filters />
                <div className="grid grid-cols-2 gap-5 flex-1">
                    {collections.length === 0 ? (
                        <p className="col-span-2 text-center text-mid py-12">No products found matching the criteria.</p>
                    ) : (
                        collections.map((product) => (
                            <ItemCard key={product.id} product={product} />
                        ))
                    )}
                </div>
            </section>
        </main>
    );
}
