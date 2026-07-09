"use client"
import { getCategories } from "@/app/action"
import { CategorySchema, ProductInputSchema, ProductSchema } from "@/lib/schemas"
import { useEffect, useState, useTransition } from "react"
import { toast } from "sonner"
import { updateProduct } from "@/app/action"
import { useRouter } from "next/navigation"
export default function EditProductForm({product}: {product: ProductSchema}) {
    const [categories,setCategories] = useState<CategorySchema[]>([]) 
    const [isPending,startTransition] = useTransition();
    const router = useRouter();
    useEffect(()=>{
        const fetchCategories = async () => {
            const res = await getCategories();
            if(!res.success){
                toast.error(res.error)
                return;
            }
            setCategories(res.data);
        }
        fetchCategories()
    },[])
    const [data,setData] = useState<ProductInputSchema>({
        name: product.name,
        description: product.description,
        price: product.price,
        category_id: product.category.id,
        best_seller: product.best_seller,
    })
    const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        startTransition(async () => {
        const res = await updateProduct(product.id,data);
        if(!res.success){
            toast.error(res.error)
            return;
        }
        toast.success('Product updated successfully')
        router.push('/admin/products')
    })
    }
    return (
        <form onSubmit={handleUpdate} className="flex flex-col gap-6 w-full font-montserrat">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col">
                    <label htmlFor="name" className="text-[11px] font-bold uppercase tracking-wider text-mid mb-1.5">Name</label>
                    <input 
                        type="text" 
                        id="name" 
                        value={data.name} 
                        onChange={(e)=>setData({...data,name:e.target.value})} 
                        className="border border-muted h-12 p-3 w-full bg-white text-black outline-none focus:border-primary transition-colors text-sm rounded-none"
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="price" className="text-[11px] font-bold uppercase tracking-wider text-mid mb-1.5">Price ($)</label>
                    <input 
                        type="number" 
                        id="price" 
                        value={data.price} 
                        onChange={(e)=>setData({...data,price:Number(e.target.value)})} 
                        className="border border-muted h-12 p-3 w-full bg-white text-black outline-none focus:border-primary transition-colors text-sm rounded-none"
                    />
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col">
                    <label htmlFor="category_id" className="text-[11px] font-bold uppercase tracking-wider text-mid mb-1.5">Category</label>
                    <select 
                        id="category_id" 
                        value={data.category_id} 
                        onChange={(e)=>setData({...data,category_id:Number(e.target.value)})}
                        className="border border-muted h-12 px-3 w-full bg-white text-black outline-none focus:border-primary transition-colors text-sm rounded-none cursor-pointer"
                    >
                        {categories.map((category)=>{
                            return <option key={category.id} value={category.id}>{category.name}</option>
                        })}
                    </select>
                </div>
                <div className="flex items-center gap-3 pt-6">
                    <input 
                        type="checkbox" 
                        id="best_seller" 
                        checked={data.best_seller} 
                        onChange={(e)=>setData({...data,best_seller:e.target.checked})} 
                        className="size-5 rounded-none border border-muted accent-primary cursor-pointer"
                    />
                    <label htmlFor="best_seller" className="text-xs font-bold uppercase tracking-widest text-black cursor-pointer select-none">Best Seller</label>
                </div>
            </div>
            <div className="flex flex-col">
                <label htmlFor="description" className="text-[11px] font-bold uppercase tracking-wider text-mid mb-1.5">Description</label>
                <textarea 
                    id="description" 
                    value={data.description} 
                    onChange={(e)=>setData({...data,description:e.target.value})} 
                    rows={4}
                    className="border border-muted p-3 w-full bg-white text-black outline-none focus:border-primary transition-colors text-sm rounded-none resize-none"
                />
            </div>
            <div className="flex justify-end mt-4">
                <button 
                disabled={isPending}
                    type="submit"
                    className={`inline-flex items-center justify-center px-8 h-12 ${isPending ? 'bg-muted' : 'bg-primary hover:bg-black'} text-white font-montserrat text-xs uppercase tracking-widest font-bold transition-all duration-300 rounded-none cursor-pointer w-full md:w-auto`}
                >
                    {isPending ? "Updating..." : "Update"}
                </button>
            </div>
        </form>
    )
}
