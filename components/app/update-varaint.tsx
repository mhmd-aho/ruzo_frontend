"use client";

import { useState } from "react";
import { ProductVariantsSchema, ProductVaraintInputSchema } from "@/lib/schemas";

interface UpdateVariantProps {
    variant: ProductVariantsSchema;
    isPending: boolean;
    handleUpdateQuantity: (variant: ProductVaraintInputSchema) => void;
    id:number;
}

export default function UpdateVaraint({ variant, isPending, handleUpdateQuantity, id }: UpdateVariantProps) {
    const [updateData, setUpdateData] = useState<ProductVaraintInputSchema>({
        id: variant.id,
        quantity: variant.quantity,
        color_id: variant.color.id,
        size_id: variant.size.id,
        product_id: id,
    });

    const handleQuantityChange = (method: 'add' | 'sub') => {
        if (method === 'add') {
            setUpdateData({ ...updateData, quantity: updateData.quantity + 1 });
        } else if (method === 'sub' && updateData.quantity > 0) {
            setUpdateData({ ...updateData, quantity: updateData.quantity - 1 });
        }
    };

    return (
        <tr className="hover:bg-neutral-50/70 transition-colors">
            <td className="py-4 px-4 font-semibold uppercase tracking-wider text-xs">
                {variant.size.name}
            </td>
            <td className="py-4 px-4">
                <div className="flex items-center gap-2">
                    <span 
                        className="w-3 h-3 rounded-full border border-muted shadow-sm shrink-0" 
                        style={{ backgroundColor: variant.color.color_code }}
                    />
                    <span className="font-medium text-xs uppercase tracking-wider">
                        {variant.color.name}
                    </span>
                </div>
            </td>
            <td className="py-4 px-4">
                <div className="flex items-center gap-1.5">
                    <button 
                        type="button" 
                        onClick={() => handleQuantityChange('sub')}
                        className="w-8 h-8 flex items-center justify-center border border-muted text-black hover:border-black transition-colors rounded-none text-sm font-bold cursor-pointer"
                    >
                        -
                    </button>
                    <p className="w-8 text-center text-sm font-bold">{updateData.quantity}</p>
                    <button 
                        type="button" 
                        onClick={() => handleQuantityChange('add')}
                        className="w-8 h-8 flex items-center justify-center border border-muted text-black hover:border-black transition-colors rounded-none text-sm font-bold cursor-pointer"
                    >
                        +
                    </button>
                </div>
            </td>
            <td className="py-4 px-4 text-right">
                <button
                    type="button"
                    disabled={isPending}
                    onClick={() => handleUpdateQuantity(updateData)}
                    className="inline-flex items-center justify-center text-xs font-bold uppercase tracking-widest text-primary hover:text-white border border-primary hover:bg-primary px-3 py-1.5 transition-all duration-300 rounded-none cursor-pointer disabled:opacity-50"
                >
                    Save
                </button>
            </td>
        </tr>
    );
}