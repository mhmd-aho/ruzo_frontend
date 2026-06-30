
import QuantityCart from "../input/quantity-cart";
import { ProductVariantsSchema } from "@/lib/schemas";
import { getVariantImage } from "@/app/action";
import Image from "next/image";
export default async function CheckoutItems({id,productVariant,quantity}: {id:number,productVariant: ProductVariantsSchema,quantity: number}){
    let productImage:string = "";
    try {
        productImage = await getVariantImage(productVariant.id);
    }catch(err){
        console.log(err)
    }
    return (
        <div className="w-full lg:h-32 h-12 bg-white lg:grid lg:grid-cols-6 flex flex-col justify-center items-center gap-2">
            <div className="col-span-3 flex gap-3 h-full">
                <Image width={112} height={128} src={productImage} alt={productVariant.product.name} className="h-full w-28"/>
                <div className="flex flex-col">
                    <p>{productVariant.product.name}</p>
                    <p>Color: {productVariant.color.name}</p>
                    <p>Size: {productVariant.size.name}</p>
                </div>
            </div>
            <p className="col-span-1 text-center">${productVariant.product.price}</p>
            <div className="col-span-1 flex justify-center items-center">
                <QuantityCart id={id}
                 quantity={quantity}/>
            </div>
            <p className="col-span-1 text-center">${quantity * productVariant.product.price}</p>
        </div>
    )
}