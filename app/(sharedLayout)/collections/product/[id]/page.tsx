import { ProductSchema, ProductVariantsSchema, ProductMediaSchema } from "@/lib/schemas";
import AddToCartForm from "@/components/app/add-to-cart-form";
import ProductGallery from "@/components/app/product-gallery";
import { Metadata } from "next";
import { cache } from "react";

const getProduct = cache(async (id: string): Promise<ProductSchema | null> => {
    try {
        const res = await fetch(`${process.env.BACKEND_URL}products/${id}/`, {
            headers: { "Content-Type": "application/json" },
        });
        if (!res.ok) return null;
        return res.json();
    } catch (err) {
        console.log("Product Fetch Error:", err);
        return null;
    }
});

export async function generateMetadata({ params }: {
    params: Promise<{ id: string }>
}): Promise<Metadata> {
    const { id } = await params;
    const product = await getProduct(id);
    return {
        title: product?.name ?? "Product",
        description: product?.description ?? "",
    };
}

export default async function Product({
    params,
    searchParams
}: {
    params: Promise<{ id: string }>,
    searchParams: Promise<{ color?: string, size?: string }>
}) {
    const { id } = await params;
    const { color, size } = await searchParams;

    const product = await getProduct(id);

    const productVariants: ProductVariantsSchema[] = product?.variants ?? [];
    let images: string[] = [];

    const colorVariants = color
        ? productVariants.filter(
            (v) => v.color.name.toLowerCase() === color.toLowerCase()
          )
        : [];

    const selectedVariant = (color && size)
        ? colorVariants.filter(
            (v) => v.size.name.toLowerCase() === size.toLowerCase()
          )
        : [];

    if (product?.id && colorVariants.length > 0) {
        const colorId = colorVariants[0].color.id;
        try {
            const res = await fetch(
                `${process.env.BACKEND_URL}products/${product.id}/${colorId}/media/`,
                { headers: { "Content-Type": "application/json" }, cache: "no-store" }
            );
            if (res.ok) {
                const data: ProductMediaSchema[] = await res.json();
                if (data.length > 0) {
                    images = data.map((d) => d.media_url);
                }
            }
        } catch (err) {
            console.log("Media Fetch Error:", err);
        }
    }

    const colors = Array.from(
        new Map(productVariants.map((v) => [v.color.id, v.color])).values()
    );

    const sizes = Array.from(
        new Map(colorVariants.map((v) => [v.size.id, v.size])).values()
    );

    const galleryImages = images.length > 0
        ? images
        : (product?.default_img?.media_url ? [product.default_img.media_url] : []);

    return (
        <>
            <section className="w-full lg:h-[calc(100vh-80px)]">
                <div className="flex flex-col lg:flex-row items-start justify-center lg:gap-16 gap-6 lg:h-[calc(100vh-80px)] lg:px-10 px-5 pb-8">
                    <ProductGallery images={galleryImages} alt={product?.name || "Product Image"} />
                    {product && <AddToCartForm sizes={sizes} colors={colors} product={product} quantity={selectedVariant?.[0]?.quantity || 0} />}
                </div>
            </section>
            <section className="lg:h-[calc(100vh-80px)] w-full lg:px-10 px-5 pt-8 pb-12">
                <div className="flex flex-col gap-8">
                    <h2 className="text-2xl lg:text-4xl font-boldonse">You May Also Like</h2>
                </div>
            </section>
        </>
    )
}
