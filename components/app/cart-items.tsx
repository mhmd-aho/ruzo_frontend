import QuantityCart from "../input/quantity-cart";
import { Exit } from "../svg/exit";
import { ProductVariantsSchema } from "@/lib/schemas";
import { deleteItemFromCart } from "@/app/action";
import { toast } from "sonner";
import { getOptimizedImageUrl } from "@/lib/utils";
import { useTransition } from "react";
import { useRouter } from "next/navigation";

export default function CartItems({id,productVariant,quantity}: {id:number,productVariant: ProductVariantsSchema,quantity: number}) {
    const [isPending,startTransition] = useTransition();
    const router = useRouter();
    const handleDeleteItemFromCart = async () => {
        startTransition(async () => {

                const res = await deleteItemFromCart(id);
                if(res.success){
                    toast.success(res.message);
                    window.dispatchEvent(new Event("cart-updated"));
                    if (typeof window !== "undefined" && window.location.pathname.includes("/checkout")) {
                        router.refresh();
                    }
                } else {
                    toast.error(res.error);
                }
            });
    }
    const media = productVariant.product.default_img.media_url
    return (
        <div className={`flex gap-2 h-32 w-full relative transition-all duration-300 ${isPending ? 'opacity-30 pointer-events-none' : ''}`}>
            <div className="h-full w-28 relative">
                {
                    media ? (

                        <img width={112} height={128} src={getOptimizedImageUrl(media, 224, 256, "scale_crop", "center")} alt="product image" className="h-full w-28 object-cover object-bottom"/>
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
            <button onClick={handleDeleteItemFromCart} disabled={isPending} className={`absolute top-2 right-2 ${isPending ? 'opacity-50 cursor-not-allowed' : ''}`}>
                
                    <Exit fill="primary"/>
            </button>
        </div>
        
    )
}