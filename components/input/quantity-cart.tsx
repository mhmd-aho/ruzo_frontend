'use client';
import Minus from "../svg/minus";
import Plus from "../svg/plus";
import { updateCartItemQuantity } from "@/app/action";
import { useTransition } from "react";
import { toast } from "sonner";

export default function QuantityCart({ id, quantity }: { id: number, quantity: number }) {
    const [isPending, startTransition] = useTransition();

    const handleUpdateCartItemQuantity = (action: 'increase' | 'decrease') => {
        if (action === 'decrease' && quantity <= 1) return; // Prevent negative updates
        
        startTransition(async () => {
            const res = await updateCartItemQuantity(id, action);
            if (res.success) {
                window.dispatchEvent(new Event("cart-updated"));
            } else {
                toast.error(res.error || "Failed to update quantity");
            }
        });
    }

    return (
        <div className={`flex bg-primary h-9 w-28 items-center justify-between rounded px-2 shadow-xs select-none touch-manipulation transition-opacity ${isPending ? 'opacity-60 pointer-events-none' : ''}`}>
            <button 
                type="button"
                onClick={() => handleUpdateCartItemQuantity('decrease')} 
                className="flex items-center justify-center p-1 hover:bg-black/10 active:scale-90 rounded transition-all"
                disabled={quantity <= 1}
                aria-label="Decrease quantity"
            >
                <Minus fill="white" />
            </button>
            
            <p className="text-white font-medium w-8 text-center text-sm">{quantity}</p>
            
            <button 
                type="button"
                onClick={() => handleUpdateCartItemQuantity('increase')} 
                className="flex items-center justify-center p-1 hover:bg-black/10 active:scale-90 rounded transition-all"
                aria-label="Increase quantity"
            >
                <Plus fill="white" />
            </button>
        </div>
    )
}