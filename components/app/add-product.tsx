"use client"
import { useState } from "react";

export default function AddingProduct() {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [bestSeller, setBestSeller] = useState(false);
    const [categories, setCategories] = useState<categorySchema[]>([]);
    
    return (
       <form onSubmit={handleSubmit} className="max-w-4xl mx-auto p-6 space-y-8 bg-white rounded-md shadow">
            <h1 className="text-2xl font-bold border-b pb-4">Create New Product & Variants</h1>
            <div className="space-y-4">
                <h2 className="text-lg font-semibold text-gray-700">1. Product Information</h2>
                <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col">
                        <label className="text-sm font-medium mb-1">Product Name</label>
                        <input type="text" value={name} onChange={e => setName(e.target.value)} required className="border p-2 rounded" placeholder="e.g. Premium Cotton T-Shirt"/>
                    </div>
                    <div className="flex flex-col">
                        <label className="text-sm font-medium mb-1">Base Price ($)</label>
                        <input type="number" step="0.01" value={price} onChange={e => setPrice(e.target.value)} required className="border p-2 rounded" placeholder="29.99"/>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col">
                        <label className="text-sm font-medium mb-1">Category</label>
                        <select name="category" value={category} onChange={(e) => setCategory(e.target.value)} required className="border p-2 rounded">
                            <option value="">Select Category</option>
                            {categories.map((c) => (
                                <option key={c.id} value={c.id}>{c.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="flex items-center gap-2 pt-6">
                        <input type="checkbox" id="bestSeller" checked={bestSeller} onChange={e => setBestSeller(e.target.checked)} className="border size-4 rounded accent-blue-600"/>
                        <label htmlFor="bestSeller" className="text-sm font-medium cursor-pointer">Best Seller</label>
                    </div>
                </div>
                <div className="flex flex-col">
                    <label className="text-sm font-medium mb-1">Description</label>
                    <textarea value={description} onChange={e => setDescription(e.target.value)} rows={3} className="border p-2 rounded" placeholder="Product attributes..."/>
                </div>
            </div>
        </form>
    )
}