"use client";
import CartIcon from "../svg/cart"; 
import { useState } from "react";
import CartItems from "./cart-items";
export default function Cart() {
    const [cartOpen, setCartOpen] = useState(false);
    return(
        <div className="size-6">
            <button className="w-full h-full cursor-pointer" onClick={() => setCartOpen(!cartOpen)}>
                <CartIcon/>
            </button>
            {
                cartOpen && (
                    <div className="absolute lg:top-20 top-12 right-0 bg-black/20 backdrop-blur-sm w-full h-screen">
                        <div className="bg-white lg:h-3/4 h-full lg:w-96 w-full absolute right-0 lg:right-5 flex flex-col items-center p-3.5 ">
                            <h3 className="font-boldonse text-xl mb-8">Your Cart</h3>
                            <div className="flex flex-col items-center justify-start overflow-y-auto h-full w-full gap-7"  >
                                <CartItems/>
                                <CartItems/>
                            </div>
                        </div>
                        
                    </div>
                )
            }
        </div>
    )
}