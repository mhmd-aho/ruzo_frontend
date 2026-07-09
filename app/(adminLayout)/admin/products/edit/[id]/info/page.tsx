import { ProductSchema } from "@/lib/schemas";
import EditProductForm from "@/components/app/edit-product-form";
import { CACHE_TAGS, withCacheTags } from "@/lib/cache-tags";
import Link from "next/link";
export default async function EditInfo({params}: {params: Promise<{id: string}>}) {
    const {id} = await params;
    let product:ProductSchema|null = null;
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}products/${id}/`, withCacheTags(CACHE_TAGS.product(id)))
        if (res.ok) {
            product = await res.json();
        }
    } catch (error) {
        console.log(error);
    }
    return (
        <div className="bg-white py-12 px-4 sm:px-6 lg:px-8 font-montserrat">
            <div className="max-w-4xl mx-auto bg-white border border-muted p-8 shadow-sm flex flex-col gap-8">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-muted pb-6">
                    <div>
                        <h1 className="text-3xl font-boldonse uppercase tracking-wider text-black">Edit Product</h1>
                        <p className="text-sm text-mid mt-1 font-semibold uppercase tracking-wider">
                            Product: {product?.name || ""}
                        </p>
                    </div>
                    <Link 
                        href={`/admin/products/edit/${id}`} 
                        className="inline-flex items-center justify-center text-xs font-bold uppercase tracking-widest text-primary hover:text-white border border-primary hover:bg-primary px-6 py-3 transition-all duration-300 rounded-none"
                    >
                        Back to Product
                    </Link>
                </div>
                {product ? (
                    <EditProductForm product={product}/>
                ) : (
                    <p className="text-sm text-mid font-semibold uppercase tracking-widest text-center py-12">
                        Requested product could not be found.
                    </p>
                )}
            </div>
        </div>
    )
}