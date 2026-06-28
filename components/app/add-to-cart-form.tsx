"use client";
import { useEffect, useState } from "react";
import { ColorType, ProductSchema, SizeType } from "@/lib/schemas";
import Minus from "../svg/minus";
import Plus from "../svg/plus";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { addToCart } from "@/app/action";

export default function AddToCartForm({
    colors,
    sizes,
    product,
}: {
    colors: ColorType[],
    sizes: SizeType[],
    product: ProductSchema,
}) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    // NOTE: searchParams.get() returns string | null, not an object.
    const selectedColor = searchParams.get('color');
    const selectedSize = searchParams.get('size');

    // Updates the URL query parameters when a color button is clicked
    const handleSelectedColor = (color: ColorType) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('color', color.name);
        router.push(`${pathname}?${params.toString()}`);
    } 

    // FIXED: Changed argument parameter from object structure `SizeType` to raw string 
    // because size mapped from `allSizes` yields plain strings
    const handleSelectedSize = (sizeName: string) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('size', sizeName);
        router.push(`${pathname}?${params.toString()}`);
    }

    const [quantity, setQuantity] = useState<number>(1);
    
    const allSizes = ['xs', 's', 'm', 'l', 'xl'];
    
    // Calculates which standard sizes are present in the server fetched available sizes list
    const availableSizes = allSizes.filter((size: string) => 
        sizes.some((s: SizeType) => s.name.toLowerCase() === size.toLowerCase())
)
    const handleAddToCart = async () => {
        if (!selectedColor || !selectedSize) {
            return;
        }
        
        // The result is now a safe plain object
        const result = await addToCart(product.id, selectedColor, selectedSize, quantity);
        
        if (result?.success) {
            alert(result.message);
        } else {
            alert(result?.error || "Something went wrong");
        }
    }
    return (
        <div className="lg:w-1/2 w-full flex flex-col lg:gap-9 gap-3">
            <h2 className="text-2xl lg:text-4xl font-boldonse">{product?.name}</h2>
            <p className="lg:text-2xl text-xl font-boldonse text-black">${product?.price}</p>
            
            {/* Color Selection UI */}
            <div className="flex flex-col lg:gap-3 gap-1">
                <p className="font-bold text-black">Color: <span className="text-mid ml-1">{selectedColor ? selectedColor : 'Select a color'}</span></p>
                <div className="flex gap-3">
                    {colors.map((color: ColorType) => (
                        <button 
                            type="button"
                            onClick={() => handleSelectedColor(color)} 
                            style={{ backgroundColor: color.color_code }} 
                            key={color.id} 
                            // FIXED: Directly compared selectedColor string to color.name string
                            className={`lg:size-7 size-5 ${selectedColor === color.name ? 'border-2 border-black' : 'border-2 border-muted'} rounded-full hover:scale-110 transition-all duration-300 ease-in-out cursor-pointer`}
                        ></button>
                    ))}
                </div>
            </div>
            
            {/* Size Selection UI */}
            <div className="flex flex-col lg:gap-3 gap-1">
                <p className="font-bold text-black">Size: <span className="text-mid ml-1">{selectedSize ? selectedSize : 'Select a size'}</span></p>
                <div className="flex gap-3">
                    {allSizes.map((size: string, i: number) => {
                        return (
                            <button 
                                type="button"
                                onClick={() => handleSelectedSize(size)} 
                                key={i} 
                                disabled={!availableSizes.includes(size)} 
                                // FIXED: Directly compared selectedSize string to size loop string
                                className={`border border-mid lg:size-12 size-10 ${selectedSize === size ? 'bg-black text-white' : ''} ${availableSizes.includes(size) ? '' : 'opacity-50'}`}
                            >
                                {size}
                            </button>
                        )
                    })}
                </div>
            </div>
            
            {/* Quantity Selector UI */}
            <div className="flex flex-col lg:gap-3 gap-1">
                <p className="font-bold text-black">Quantity:</p>
                <div className="flex items-center justify-center border border-muted w-fit gap-5 self-start py-3 px-5">
                    {/* Safeguarded minus handler so quantity cannot drop below 1 */}
                    <button type="button" onClick={() => setQuantity(Math.max(1, quantity - 1))}><Minus fill='black' /></button>
                    <p>{quantity}</p>
                    <button type="button" onClick={() => setQuantity(quantity + 1)}><Plus fill='black' /></button>
                </div>
            </div>
            
            <button onClick={handleAddToCart} className="bg-primary text-white w-full lg:h-14 h-12">Add to cart</button>
            
            {/* Description UI */}
            <div className="flex flex-col gap-3">
                <p className="font-bold text-black">Description:</p>
                <p className="text-mid">{product?.description}</p>
            </div>
        </div>
    )
}