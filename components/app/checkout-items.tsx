import QuantityCart from "../input/quantity-cart";
import { ProductVariantsSchema } from "@/lib/schemas";
import Image from "next/image";
import { getOptimizedImageUrl } from "@/lib/utils";

export default async function CheckoutItems({ id, productVariant, quantity }: { id: number, productVariant: ProductVariantsSchema, quantity: number }) {
    const media = productVariant.product.default_img.media_url
    
    return (
        <div className="w-full bg-white border-b border-neutral-100 p-4 lg:p-0 lg:h-32 lg:grid lg:grid-cols-6 flex flex-col md:flex-row md:justify-between items-center gap-4">
            
            {/* Image & Product Info Meta */}
            <div className="col-span-3 flex gap-4 w-full h-full items-center lg:items-center">
                <div className="relative h-24 w-20 lg:h-full lg:w-28 shrink-0 overflow-hidden rounded bg-neutral-50">
                    <Image 
                        fill
                        src={getOptimizedImageUrl(media, 224, 256, "scale_crop", "center")} 
                        alt={productVariant.product.name} 
                        className="object-cover"
                    />
                </div>
                <div className="flex flex-col justify-center py-1">
                    <p className="font-medium text-neutral-900 text-sm lg:text-base">{productVariant.product.name}</p>
                    <p className="text-xs lg:text-sm text-neutral-500 mt-0.5">Color: {productVariant.color.name}</p>
                    <p className="text-xs lg:text-sm text-neutral-500">Size: {productVariant.size.name}</p>
                    {/* Price display underneath details on mobile viewports */}
                    <p className="text-sm font-semibold text-neutral-900 mt-1 lg:hidden">${productVariant.product.price}</p>
                </div>
            </div>

            {/* Price (Hidden on mobile because it's baked into details above, visible on desktop) */}
            <p className="col-span-1 text-center hidden lg:block text-neutral-700 font-medium">
                ${productVariant.product.price}
            </p>
            <div className="col-span-2 w-full lg:flex-row-reverse flex justify-between items-center ">
                <p className="text-center font-semibold text-neutral-900 w-1/2">${quantity * productVariant.product.price}</p>
                <QuantityCart id={id} quantity={quantity} />
            </div >
        </div>
    )
}