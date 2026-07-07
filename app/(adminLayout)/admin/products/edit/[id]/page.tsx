import { ProductSchema } from "@/lib/schemas";
import Link from "next/link";

export default async function EditProduct({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    let product: ProductSchema | null = null;
    
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}products/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await res.json();
        if (res.ok) {
            product = data;
        }
    } catch (err) {
        console.error("Fetch product error:", err);
    }

    const img = product?.default_img?.media_url || "";

    return (
        <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8 font-montserrat">
            {product ? (
                <div className="max-w-4xl mx-auto bg-white border border-muted shadow-sm overflow-hidden">
                    <div className="md:flex">
                        <div className="md:w-1/3 bg-neutral-50 relative min-h-[250px] md:min-h-full border-b md:border-b-0 md:border-r border-muted">
                            {img ? (
                                <img className="w-full h-full object-cover absolute inset-0" src={img} alt={product.name} />
                            ) : (
                                <div className="absolute inset-0 flex items-center justify-center bg-neutral-100 text-mid text-xs uppercase tracking-widest font-semibold">
                                    No Image Available
                                </div>
                            )}
                            {
                                product.best_seller?(
                                    <span className="absolute top-4 right-4 bg-primary text-white px-2 py-1 text-xs font-semibold uppercase tracking-widest">
                                        Best Seller
                                    </span>
                                ):(
                                    <span className="absolute top-4 right-4 bg-red-500 text-white px-2 py-1 text-xs font-semibold uppercase tracking-widest">
                                        Not Best Seller
                                    </span>
                                )
                            }
                        </div>

                        <div className="p-8 md:w-2/3 flex flex-col justify-between">
                            <div>
                                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 border-b border-muted pb-6">
                                    <div>
                                        <h1 className="text-3xl font-boldonse uppercase tracking-wider text-black">{product.name}</h1>
                                        <p className="text-xl font-boldonse text-primary mt-2">${product.price}</p>
                                    </div>
                                    <Link 
                                        href={`/admin/products/edit/${product.id}/info`}
                                        className="inline-flex items-center justify-center px-6 h-12 bg-primary hover:bg-black text-white font-montserrat text-xs uppercase tracking-widest font-bold transition-all duration-300 rounded-none cursor-pointer"
                                    >
                                        Edit Details
                                    </Link>
                                </div>

                                <div className="mt-6">
                                    <h2 className="text-[11px] font-bold uppercase tracking-wider text-mid mb-2">Description</h2>
                                    <p className="text-sm text-black leading-relaxed font-normal">{product.description}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="border-t border-muted bg-white p-8">
                        <h3 className="text-xl font-boldonse uppercase tracking-wider text-black mb-6">Inventory Variants</h3>
                        <div className="overflow-x-auto border border-muted bg-white">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b border-muted bg-black text-white text-xs uppercase tracking-widest font-montserrat">
                                        <th className="py-4 px-4 sm:px-6 font-semibold">Size</th>
                                        <th className="py-4 px-4 sm:px-6 font-semibold">Color</th>
                                        <th className="py-4 px-4 sm:px-6 font-semibold">Stock Level</th>
                                        <th className="py-4 px-4 sm:px-6 font-semibold text-right">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-muted text-sm text-black">
                                    {product.variants.map((variant) => (
                                        <tr key={variant.id} className="hover:bg-neutral-50/70 transition-colors">
                                            <td className="py-4 px-4 sm:px-6 font-semibold uppercase tracking-wider text-xs">{variant.size.name}</td>
                                            <td className="py-4 px-4 sm:px-6">
                                                <div className="flex items-center gap-2.5">
                                                    <span 
                                                        className="w-3.5 h-3.5 rounded-full border border-muted shadow-sm shrink-0 animate-fade-in" 
                                                        style={{ backgroundColor: variant.color.color_code }}
                                                    />
                                                    <span className="font-medium text-xs uppercase tracking-wider">{variant.color.name}</span>
                                                </div>
                                            </td>
                                            <td className="py-4 px-4 sm:px-6">
                                                <span className={`inline-flex items-center px-3 py-1 border text-xs font-semibold uppercase tracking-wider ${
                                                    variant.quantity > 0 
                                                        ? "border-green-200 bg-green-50 text-green-700" 
                                                        : "border-primary/20 bg-primary/5 text-primary"
                                                }`}>
                                                    {variant.quantity} units
                                                </span>
                                            </td>
                                            <td className="py-4 px-4 sm:px-6 text-right">
                                                <Link
                                                    href={`/admin/products/edit/${product.id}/variants/${variant.id}`}
                                                    className="inline-flex items-center justify-center text-xs font-bold uppercase tracking-widest text-primary hover:text-white border border-primary hover:bg-primary px-4 py-2 transition-all duration-300 rounded-none"
                                                >
                                                    Edit Stock
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="text-center py-24 font-montserrat">
                    <p className="text-sm text-mid font-semibold uppercase tracking-widest">Requested product parameters could not be resolved.</p>
                </div>
            )}
        </div>
    );
}