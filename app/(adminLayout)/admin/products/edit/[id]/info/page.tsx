import { ProductSchema } from "@/lib/schemas";
import EditProductForm from "@/components/app/edit-product-form";
import { CACHE_TAGS, withCacheTags } from "@/lib/cache-tags";
export default async function EditInfo({params}: {params: Promise<{id: string}>}) {
    const {id} = await params;
    let product:ProductSchema;
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}products/${id}/`, withCacheTags(CACHE_TAGS.product(id)))
        const data = await res.json();
        product = data;
    } catch (error) {
        console.log(error);
    }
    return (
        <div className="bg-white py-12 px-4 sm:px-6 lg:px-8 font-montserrat">
            <div className="max-w-4xl mx-auto bg-white border border-muted p-8 shadow-sm flex flex-col gap-8">
                <div className="flex justify-between items-center border-b border-muted pb-4">
                    <h1 className="text-3xl font-boldonse uppercase tracking-wider text-black">Edit Product</h1>
                </div>
                <EditProductForm product={product}/>
            </div>
        </div>
    )
}