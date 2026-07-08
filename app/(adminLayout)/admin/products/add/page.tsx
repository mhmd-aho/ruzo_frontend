"use client";

import { useState, useEffect, useTransition } from "react";
import { useRouter } from "next/navigation";
import { createProductWithVariants, getCategories, getColors, getSizes } from "@/app/action";
import { ProductVaraintInputSchema, CategorySchema, ColorSchema, SizeSchema } from "@/lib/schemas";
import { toast } from "sonner";

export default function AddProductPage() {
    const router = useRouter();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [bestSeller, setBestSeller] = useState(false);
    const [colors, setColors] = useState<ColorSchema[]>([]);
    const [sizes, setSizes] = useState<SizeSchema[]>([]);
    const [categories, setCategories] = useState<CategorySchema[]>([]);
    const [selectedColors, setSelectedColors] = useState<ColorSchema[]>([]);
    const [selectedSizes, setSelectedSizes] = useState<SizeSchema[]>([]);
    const [variants, setVariants] = useState<ProductVaraintInputSchema[]>([]);
    const [isPending,startTransition] = useTransition();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [res1, res2, res3] = await Promise.all([
                    getColors(),
                    getSizes(),
                    getCategories()
                ]);
                
                if (res1.success && res2.success && res3.success) {
                    setColors(res1.data);
                    setSizes(res2.data);
                    setCategories(res3.data);
                } else {
                    toast.error("Failed to load setup attributes.");
                }
            } catch (err) {
                toast.error("An error occurred while fetching attributes.");
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        const matrix: ProductVaraintInputSchema[] = [];
        
        selectedColors.forEach((color) => {
            selectedSizes.forEach((size) => {
                const existing = variants.find((v) => v.color_id === color.id && v.size_id === size.id);
                
                matrix.push({
                    color_id:color.id,
                    size_id:size.id,
                    quantity: existing ? existing.quantity : 0,
                    product_id: 0,
                    id: 0,
                });
            });
        });
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setVariants(matrix);
    }, [selectedColors, selectedSizes]);

    const updateVariantField = (index: number, field: "quantity", value: number) => {
        const updated = [...variants];
        updated[index] = { ...updated[index], [field]: value };
        setVariants(updated);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        startTransition(async () => {
        try {
            const finalVariants = variants.map(v => ({
                ...v
            }));

            const payload = {
                product: { name, description, price: Number(price), category_id: Number(category), best_seller: bestSeller },
                variants: finalVariants
            };

            const result = await createProductWithVariants(payload.product, payload.variants);
            
            if (result.success) {
                toast.success("Product and all variants created successfully!");
                router.push(`/admin/products/add/media/${result.productId}`);
            } else {
                toast.error(result.error || "Failed to create product");
            }
        } catch (err) {
            toast.error("Something went wrong saving the matrix pipeline.");
        }
        });
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto my-10 p-8 bg-white border border-muted font-montserrat flex flex-col gap-8 shadow-sm">
            <div>
                <h1 className="text-3xl font-boldonse uppercase tracking-wider text-black border-b border-muted pb-4">Create New Product & Variants</h1>
            </div>

            <div className="space-y-6">
                <h2 className="text-sm font-bold tracking-widest text-primary uppercase border-b border-neutral-100 pb-2">1. Product Information</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col">
                        <label className="text-[11px] font-bold uppercase tracking-wider text-mid mb-1.5">Product Name</label>
                        <input 
                            type="text" 
                            value={name} 
                            onChange={e => setName(e.target.value)} 
                            required 
                            className="border border-muted h-12 p-3 w-full bg-white text-black outline-none focus:border-primary transition-colors text-sm rounded-none" 
                            placeholder="e.g. Premium Cotton T-Shirt"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-[11px] font-bold uppercase tracking-wider text-mid mb-1.5">Base Price ($)</label>
                        <input 
                            type="number" 
                            step="0.01" 
                            value={price} 
                            onChange={e => setPrice(e.target.value)} 
                            required 
                            className="border border-muted h-12 p-3 w-full bg-white text-black outline-none focus:border-primary transition-colors text-sm rounded-none" 
                            placeholder="29.99"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col">
                        <label className="text-[11px] font-bold uppercase tracking-wider text-mid mb-1.5">Category</label>
                        <select 
                            name="category" 
                            value={category} 
                            onChange={(e) => setCategory(e.target.value)} 
                            required 
                            className="border border-muted h-12 px-3 w-full bg-white text-black outline-none focus:border-primary transition-colors text-sm rounded-none appearance-none cursor-pointer"
                        >
                            <option value="">Select Category</option>
                            {categories.map((c) => (
                                <option key={c.id} value={c.id}>{c.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="flex items-center gap-3 pt-6">
                        <input 
                            type="checkbox" 
                            id="bestSeller" 
                            checked={bestSeller} 
                            onChange={e => setBestSeller(e.target.checked)} 
                            className="size-5 rounded-none border border-muted accent-primary cursor-pointer"
                        />
                        <label htmlFor="bestSeller" className="text-xs font-bold uppercase tracking-widest text-black cursor-pointer select-none">
                            Best Seller
                        </label>
                    </div>
                </div>

                <div className="flex flex-col">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-mid mb-1.5">Description</label>
                    <textarea 
                        value={description} 
                        onChange={e => setDescription(e.target.value)} 
                        rows={4} 
                        className="border border-muted p-3 w-full bg-white text-black outline-none focus:border-primary transition-colors text-sm rounded-none resize-none" 
                        placeholder="Product attributes and details..."
                    />
                </div>
            </div>

            <div className="space-y-6 border-t border-muted pt-6">
                <h2 className="text-sm font-bold tracking-widest text-primary uppercase border-b border-neutral-100 pb-2">2. Select Product Combinations</h2>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div>
                        <span className="block text-[11px] font-bold uppercase tracking-wider text-mid mb-3">Available Colors</span>
                        <div className="flex flex-wrap gap-2.5">
                            {colors.map(color => (
                                <label 
                                    key={color.id} 
                                    className={`flex items-center gap-2.5 border px-4 py-2 cursor-pointer transition-all ${
                                        selectedColors.some(c => c.id === color.id) 
                                            ? 'border-primary bg-primary/5 text-primary' 
                                            : 'border-muted bg-white text-black hover:border-black'
                                    }`}
                                >
                                    <input 
                                        type="checkbox" 
                                        checked={selectedColors.some(c => c.id === color.id)} 
                                        className="accent-primary size-4"
                                        onChange={(e) => e.target.checked 
                                            ? setSelectedColors([...selectedColors, color]) 
                                            : setSelectedColors(selectedColors.filter(c => c.id !== color.id))
                                        }
                                    />
                                    <span className="text-xs uppercase tracking-wider font-semibold">{color.name}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    <div>
                        <span className="block text-[11px] font-bold uppercase tracking-wider text-mid mb-3">Available Sizes</span>
                        <div className="flex flex-wrap gap-2.5">
                            {sizes.map(size => (
                                <label 
                                    key={size.id} 
                                    className={`flex items-center gap-2.5 border px-4 py-2 cursor-pointer transition-all ${
                                        selectedSizes.some(s => s.id === size.id) 
                                            ? 'border-primary bg-primary/5 text-primary' 
                                            : 'border-muted bg-white text-black hover:border-black'
                                    }`}
                                >
                                    <input 
                                        type="checkbox" 
                                        checked={selectedSizes.some(s => s.id === size.id)} 
                                        className="accent-primary size-4"
                                        onChange={(e) => e.target.checked 
                                            ? setSelectedSizes([...selectedSizes, size]) 
                                            : setSelectedSizes(selectedSizes.filter(s => s.id !== size.id))
                                        }
                                    />
                                    <span className="text-xs uppercase tracking-wider font-semibold">{size.name}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {variants.length > 0 && (
                <div className="space-y-6 border-t border-muted pt-6">
                    <h2 className="text-sm font-bold tracking-widest text-primary uppercase border-b border-neutral-100 pb-2">3. Generated Stock Grid Matrix ({variants.length})</h2>
                    <div className="border border-muted overflow-hidden">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-black text-white text-xs uppercase tracking-widest font-montserrat">
                                    <th className="p-4 font-semibold">Variant Description</th>
                                    <th className="p-4 font-semibold text-center w-48">Stock Qty</th>
                                </tr>
                            </thead>
                            <tbody>
                                {variants.map((variant, idx) => (
                                    <tr key={`${variant.color_id}-${variant.size_id}`} className="border-b border-muted last:border-0 hover:bg-neutral-50/70 transition-colors font-montserrat">
                                        <td className="p-4 flex items-center gap-2">
                                            <span className="px-3 py-1 border border-muted text-xs uppercase tracking-wider font-semibold text-black bg-neutral-50">{colors.find(c => c.id === variant.color_id)?.name ?? variant.color_id}</span>
                                            <span className="px-3 py-1 border border-muted text-xs uppercase tracking-wider font-semibold text-black bg-neutral-50">{sizes.find(s => s.id === variant.size_id)?.name ?? variant.size_id}</span>
                                        </td>
                                        <td className="p-4">
                                            <div className="flex justify-center">
                                                <input 
                                                    type="number" 
                                                    min="0" 
                                                    value={variant.quantity} 
                                                    onChange={e => updateVariantField(idx, "quantity", parseInt(e.target.value) || 0)} 
                                                    className="border border-muted h-10 w-28 text-center outline-none focus:border-primary transition-colors text-sm rounded-none bg-white text-black"
                                                />
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            <div className="border-t border-muted pt-6 flex justify-end">
                <button 
                    type="submit" 
                    disabled={isPending} 
                    className="px-8 py-4 bg-primary hover:bg-black text-white font-montserrat text-sm uppercase tracking-widest font-bold transition-all duration-300 disabled:opacity-50 cursor-pointer rounded-none"
                >
                    {isPending ? "Creating Product..." : "Create Product and go to images"}
                </button>
            </div>
        </form>
    );
}