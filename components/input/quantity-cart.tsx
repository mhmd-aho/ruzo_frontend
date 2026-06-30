'use client'
import Minus from "../svg/minus";
import Plus from "../svg/plus";
import { updateCartItemQuantity } from "@/app/action";
export default function QuantityCart({id,quantity}: {id: number,quantity: number}) {
    const handleUpdateCartItemQuantity = async (action: 'increase' | 'decrease') => {
        const res = await updateCartItemQuantity(id, action);
        if(res.success){
            alert(res.message)
        } else {
            alert(res.error)
        }
    }
    return (
        <div className="flex bg-primary h-8 items-center justify-center gap-1 p-2">
            <button onClick={() => handleUpdateCartItemQuantity('decrease')} className="flex items-start justify-center">
                <Minus fill="white"/>
            </button>
            <p className="text-white w-6 text-center">{quantity}</p>
            <button onClick={() => handleUpdateCartItemQuantity('increase')} className="flex items-end justify-center">
                <Plus fill="white"/>
            </button>
        </div>
    )
}