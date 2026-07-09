"use client";
import CartIcon from "../svg/cart"; 
import { useEffect, useState } from "react";
import CartItems from "./cart-items";
import { CartItemSchema } from "@/lib/schemas";
import { getCartItems } from "@/app/action";
import Link from "next/link";
import { toast } from "sonner";

export default function Cart() {
    const [cartOpen, setCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState<CartItemSchema[]>([]);

    const getCart = async () => {            
        const result = await getCartItems();
        if(!result.success){
            toast.error(result.error || "Failed to load cart");
            return;
        }
        setCartItems(result.data || []);
    }

    useEffect(() => {
        getCart();

        const handleCartUpdate = () => {
            getCart();
        };

        window.addEventListener("cart-updated", handleCartUpdate);
        return () => {
            window.removeEventListener("cart-updated", handleCartUpdate);
        };
    }, []);

    useEffect(() => {
        if (cartOpen) {
            getCart();
        }
    }, [cartOpen]);
    return(
        <div className="size-6">
            <button className="w-full h-full cursor-pointer relative" onClick={() => setCartOpen(!cartOpen)}>
                <CartIcon/>
                {cartItems.length > 0 && (
                    <div className="absolute top-0 right-0 bg-primary rounded-full size-3 flex items-center justify-center text-white text-[10px]">
                        <p>{cartItems.length}</p>
                    </div>
                )}
            </button>
            {
                cartOpen && (
                    <div className="absolute lg:top-20 top-12 right-0 bg-black/20 backdrop-blur-sm w-full h-[calc(100vh-48px)] lg:h-[calc(100vh-80px)]">
                        <div className="bg-white lg:h-3/4 h-full lg:w-96 w-full absolute right-0 lg:right-5 flex flex-col items-center p-3.5 ">
                            <h3 className="font-boldonse text-xl mb-8">Your Cart</h3>
                            <div className="flex flex-col items-center justify-start overflow-y-auto flex-1 w-full gap-7">
                                {
                                    cartItems.length === 0 ? (
                                        <p className="text-mid">Your cart is empty</p>
                                    ) : (
                                        cartItems.map((item: CartItemSchema) => (
                                            <CartItems key={item.id} id={item.id} productVariant={item.product_variant} quantity={item.quantity} />
                                        ))
                                    )
                                }
                            </div>
                            {
                                cartItems.length === 0 ? (
                                    <Link href='/collections' className="w-full h-12 bg-primary text-white  flex justify-center items-center">shop</Link>
                                ) : (
                            <Link href='/checkout/order' className="w-full h-12 bg-primary text-white  flex justify-center items-center">Check out</Link>
                                )   
                            }
                        </div>
                    </div>
                )
            }
        </div>
    )
}