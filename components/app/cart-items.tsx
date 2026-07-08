import QuantityCart from "../input/quantity-cart";
import { Exit } from "../svg/exit";
import { ProductVariantsSchema } from "@/lib/schemas";
import Image from "next/image";
import { getVariantImage,deleteItemFromCart } from "@/app/action";
import { useState,useEffect } from "react";
export default function CartItems({id,productVariant,quantity}: {id:number,productVariant: ProductVariantsSchema,quantity: number}) {
    const [media,setMedia] = useState<string>("");
    useEffect(() => {
       getVariantImage(productVariant.id).then((media) => setMedia(media));
    },[productVariant.id])
    const handleDeleteItemFromCart = async () => {
        const res = await deleteItemFromCart(id);
        if(res.success){
            alert(res.message)
        } else {
            alert(res.error)
        }
    }
    
    return (
        <div className="flex gap-2 h-32 w-full relative ">
            <div className="h-full w-28 relative">
                {
                    media ? (

                        <Image width={112} height={128} src={media} alt="product image" className="h-full w-28 object-cover object-bottom"/>
                    ) : (
                        <div className="bg-muted animate-pulse h-full w-28"/>
                    )
                }

            </div>
            <div className="flex flex-col gap-1">
                <h3 className="font-semibold mb-2">{productVariant.product.name}</h3>
                <p className="text-mid">Color: {productVariant.color.name}</p>
                <p className="text-mid">Size: {productVariant.size.name}</p>
                <QuantityCart id={id} quantity={quantity}/>
            </div>
            <button onClick={handleDeleteItemFromCart} className="absolute top-2 right-2">
                    <Exit fill="primary"/>
            </button>
        </div>
        
    )
}