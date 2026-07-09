"use client";
import { useState } from "react";
import { ColorSchema, ProductSchema, SizeSchema } from "@/lib/schemas";
import Minus from "../svg/minus";
import Plus from "../svg/plus";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { addToCart } from "@/app/action";
import{ toast } from "sonner";

export default function AddToCartForm({
    colors,
    sizes,
    product,
    quantity
}: {
    colors: ColorSchema[],
    sizes: SizeSchema[],
    product: ProductSchema,
    quantity: number
}) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const selectedColor = searchParams.get('color') || product?.default_img?.color?.name;
    const selectedSize = searchParams.get('size');
    const handleSelectedColor = (color: ColorSchema) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('color', color.name);
        router.push(`${pathname}?${params.toString()}`, {scroll: false});
    } 
    const handleSelectedSize = (sizeName: string) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('size', sizeName);
        router.push(`${pathname}?${params.toString()}`, {scroll: false});
    }
    const [error, setError] = useState<boolean>(false);
    const [userQuantity, setUserQuantity] = useState<number>(0);
    const [prevSelectionKey, setPrevSelectionKey] = useState(`${selectedColor}-${selectedSize}`);
    const selectionKey = `${selectedColor}-${selectedSize}`;
    if (selectionKey !== prevSelectionKey) {
        setPrevSelectionKey(selectionKey);
        setUserQuantity(0);
    }
    const allSizes = ['xs', 's', 'm', 'l', 'xl'];
    const availableSizes = allSizes.filter((size: string) => 
        sizes.some((s: SizeSchema) => s.name.toLowerCase() === size.toLowerCase())
)
    const handleAddToCart = async () => {
        if (!selectedColor || !selectedSize || userQuantity === 0) {
            setError(true);
            return;
        }
        const result = await addToCart(product.id, selectedColor, selectedSize, userQuantity);
        
        if (result?.success) {
            toast.success(result.message);
            window.dispatchEvent(new Event("cart-updated"));
        } else {
            toast.error(result?.error || "Something went wrong");
        }
    }
    return (
        <div className="lg:w-1/2 w-full flex flex-col lg:gap-9 gap-3">
            <h2 className="text-2xl lg:text-4xl font-boldonse">{product?.name}</h2>
            <p className="lg:text-2xl text-xl font-boldonse text-black">${product?.price}</p>
            <div className="flex flex-col lg:gap-3 gap-1">
                <p className="font-bold text-black">Color: <span className="text-mid ml-1">{selectedColor ? selectedColor : 'Select a color'}</span></p>
                <div className="flex gap-3">
                    {colors.map((color: ColorSchema) => (
                        <button 
                            type="button"
                            onClick={() => handleSelectedColor(color)} 
                            style={{ backgroundColor: color.color_code }} 
                            key={color.id} 
                            className={`lg:size-7 size-5 ${selectedColor === color.name ? 'border-2 border-black' : 'border-2 border-muted'} rounded-full hover:scale-110 transition-all duration-300 ease-in-out cursor-pointer`}
                        ></button>
                    ))}
                </div>
                {
                    !selectedColor && error && (
                        <p className="text-red-500 text-sm ml-1">Please select a color</p>
                    )
                }
            </div>
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
                                className={`border border-mid lg:size-12 size-10 ${selectedSize === size ? 'bg-black text-white' : ''} ${availableSizes.includes(size) ? '' : 'opacity-50'}`}
                            >
                                {size}
                            </button>
                        )
                    })}
                </div>
                {
                    !selectedSize && error && (
                        <p className="text-red-500 text-sm ml-1">Please select a size</p>
                    )
                }
            </div>
            <div className="flex flex-col lg:gap-3 gap-1">
                <p className="font-bold text-black">Quantity:</p>
                <div className="flex items-center justify-center border border-muted w-fit gap-5 self-start py-3 px-5 relative">
                    <button type="button" disabled={userQuantity === 0} onClick={() => setUserQuantity(Math.max(0, userQuantity - 1))}><Minus fill='black' /></button>
                    <p>{userQuantity}</p>
                    <button disabled={userQuantity === quantity} type="button" onClick={() => setUserQuantity(userQuantity + 1)}><Plus fill='black' /></button>
                </div>
                {quantity > 0 && <p className="text-mid ml-1">Available: {quantity - userQuantity}</p>}
                {
                    userQuantity === 0 && error && (
                        <p className="text-red-500 text-sm ml-1">Please select a quantity</p>
                    )
                }
            </div>
            
            <button onClick={handleAddToCart} className="bg-primary text-white w-full lg:h-14 h-12">Add to cart</button>
            <div className="flex flex-col gap-3">
                <p className="font-bold text-black">Description:</p>
                <p className="text-mid">{product?.description}</p>
            </div>
        </div>
    )
}