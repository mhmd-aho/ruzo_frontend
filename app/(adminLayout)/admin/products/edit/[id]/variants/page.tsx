"use client"

import { useEffect, useState, useTransition } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import { toast } from "sonner"
import { getColors, getSizes, createVariant, updateVariant } from "@/app/action"
import { ColorSchema, SizeSchema, ProductSchema, ProductVaraintInputSchema } from "@/lib/schemas"
import UpdateVaraint from "@/components/app/update-varaint"

export default function EditProductVariants() {
    const params = useParams()
    const id = params.id ? Number(params.id) : null

    const [product, setProduct] = useState<ProductSchema | null>(null)
    const [colors, setColors] = useState<ColorSchema[]>([])
    const [sizes, setSizes] = useState<SizeSchema[]>([])

    const [newColorId, setNewColorId] = useState<string>("")
    const [newSizeId, setNewSizeId] = useState<string>("")
    const [newQuantity, setNewQuantity] = useState<number>(0)

    const [isPending, startTransition] = useTransition()
    const [loading, setLoading] = useState(true)

    const fetchProductDetails = async () => {
        if (!id) return
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}products/${id}`)
            const data = await res.json()
            if (res.ok) {
                setProduct(data)
            } else {
                toast.error("Failed to load product information.")
            }
        } catch (err) {
            toast.error("An error occurred while fetching product details.")
        }
    }

    useEffect(() => {
        const fetchAttributes = async () => {
            setLoading(true)
            try {
                const [colorsRes, sizesRes] = await Promise.all([getColors(), getSizes()])
                if (colorsRes.success && sizesRes.success) {
                    setColors(colorsRes.data)
                    setSizes(sizesRes.data)
                } else {
                    toast.error("Failed to load sizes or colors metadata.")
                }
                await fetchProductDetails()
            } catch (err) {
                toast.error("An error occurred loading product metadata.")
            } finally {
                setLoading(false)
            }
        }
        fetchAttributes()
    }, [id])

    const handleAddVariant = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!id) return
        if (!newColorId || !newSizeId) {
            toast.error("Please select both a color and a size.")
            return
        }

        const exists = product?.variants?.some(
            (v) => v.color.id === Number(newColorId) && v.size.id === Number(newSizeId)
        )
        if (exists) {
            toast.error("This color and size variant combination already exists.")
            return
        }

        startTransition(async () => {
            const res = await createVariant(id, {
                color_id: Number(newColorId),
                size_id: Number(newSizeId),
                quantity: newQuantity,
            })

            if (res.success) {
                toast.success("New product variant added successfully.")
                setNewColorId("")
                setNewSizeId("")
                setNewQuantity(0)
                await fetchProductDetails()
            } else {
                toast.error(res.error || "Failed to add variant.")
            }
        })
    }

    const handleUpdateQuantity = async (updatedVariant: ProductVaraintInputSchema) => {
        const qty = updatedVariant.quantity
        if (qty === undefined || qty < 0) {
            toast.error("Please enter a valid stock level.")
            return
        }

        startTransition(async () => {
            const res = await updateVariant(updatedVariant)
            if (res.success) {
                toast.success("Stock level updated successfully.")
                await fetchProductDetails()
            } else {
                toast.error(res.error || "Failed to update stock level.")
            }
        })
    }

    if (loading || !product) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center font-montserrat">
                <p className="text-xs uppercase font-bold tracking-widest text-mid animate-pulse">Loading Product Inventory...</p>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8 font-montserrat">
            <div className="max-w-4xl mx-auto bg-white border border-muted p-8 shadow-sm flex flex-col gap-8">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-muted pb-6">
                    <div>
                        <h1 className="text-3xl font-boldonse uppercase tracking-wider text-black">Edit Inventory</h1>
                        <p className="text-sm text-mid mt-1 font-semibold uppercase tracking-wider">
                            Product: {product.name}
                        </p>
                    </div>
                    <Link 
                        href={`/admin/products/edit/${id}`} 
                        className="inline-flex items-center justify-center text-xs font-bold uppercase tracking-widest text-primary hover:text-white border border-primary hover:bg-primary px-6 py-3 transition-all duration-300 rounded-none"
                    >
                        Back to Product
                    </Link>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 flex flex-col gap-6">
                        <h2 className="text-sm font-bold tracking-widest text-primary uppercase border-b border-neutral-100 pb-2">
                            Existing Stock Variants
                        </h2>

                        {product.variants && product.variants.length > 0 ? (
                            <div className="overflow-x-auto border border-muted bg-white">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="border-b border-muted bg-black text-white text-xs uppercase tracking-widest font-montserrat">
                                            <th className="py-4 px-4 font-semibold">Size</th>
                                            <th className="py-4 px-4 font-semibold">Color</th>
                                            <th className="py-4 px-4 font-semibold w-1/3">Stock Level</th>
                                            <th className="py-4 px-4 font-semibold text-right">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-muted text-sm text-black">
                                        {product.variants.map((variant) => (
                                            <UpdateVaraint 
                                                key={variant.id} 
                                                variant={variant} 
                                                isPending={isPending}
                                                id={product.id}
                                                handleUpdateQuantity={handleUpdateQuantity} 
                                            />
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <div className="text-center py-12 border border-dashed border-muted">
                                <p className="text-xs text-mid uppercase font-bold tracking-widest">No inventory variants exist for this product.</p>
                            </div>
                        )}
                    </div>

                    <div className="flex flex-col gap-6">
                        <h2 className="text-sm font-bold tracking-widest text-primary uppercase border-b border-neutral-100 pb-2">
                            Add New Variant
                        </h2>

                        <form onSubmit={handleAddVariant} className="flex flex-col gap-5">
                            <div className="flex flex-col">
                                <label className="text-[11px] font-bold uppercase tracking-wider text-mid mb-1.5">Size</label>
                                <select 
                                    value={newSizeId} 
                                    onChange={(e) => setNewSizeId(e.target.value)} 
                                    required 
                                    className="border border-muted h-12 px-3 w-full bg-white text-black outline-none focus:border-primary transition-colors text-sm rounded-none cursor-pointer"
                                >
                                    <option value="">Select Size</option>
                                    {sizes.map((s) => (
                                        <option key={s.id} value={s.id}>{s.name}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="flex flex-col">
                                <label className="text-[11px] font-bold uppercase tracking-wider text-mid mb-1.5">Color</label>
                                <select 
                                    value={newColorId} 
                                    onChange={(e) => setNewColorId(e.target.value)} 
                                    required 
                                    className="border border-muted h-12 px-3 w-full bg-white text-black outline-none focus:border-primary transition-colors text-sm rounded-none cursor-pointer"
                                >
                                    <option value="">Select Color</option>
                                    {colors.map((c) => (
                                        <option key={c.id} value={c.id}>{c.name}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="flex flex-col">
                                <label className="text-[11px] font-bold uppercase tracking-wider text-mid mb-1.5">Initial Quantity</label>
                                <input 
                                    type="number" 
                                    value={newQuantity} 
                                    onChange={(e) => setNewQuantity(Number(e.target.value))} 
                                    required 
                                    min="0"
                                    className="border border-muted h-12 p-3 w-full bg-white text-black outline-none focus:border-primary transition-colors text-sm rounded-none"
                                />
                            </div>

                            <button 
                                type="submit" 
                                disabled={isPending}
                                className="inline-flex items-center justify-center px-6 h-12 bg-primary hover:bg-black text-white font-montserrat text-xs uppercase tracking-widest font-bold transition-all duration-300 rounded-none cursor-pointer disabled:opacity-50 mt-2"
                            >
                                Add Variant
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}