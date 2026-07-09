import AddressForm from "@/components/app/addres-form";
import { getCartItems } from "@/app/action";
import { CartItemSchema } from "@/lib/schemas";
import { Metadata } from "next";
import { getOptimizedImageUrl } from "@/lib/utils";

export const metadata: Metadata = {
    title: "Ruzo | Payment",
    description: "Complete your payment",
};
export default async function Payment() {
   let cartItems: CartItemSchema[] = [];
   let subTotal: number = 0;
   try {
    const cart = await getCartItems();
    if(cart.success){
        cartItems = cart.data;
        subTotal = cart.total;
    }
   } catch(error){
    console.log(error);
   }
    return(
        <div className="lg:h-[calc(100vh-144px)]  flex lg:flex-row flex-col lg:justify-between items-start lg:gap-12 gap-3 lg:px-20 px-5 max-lg:pb-50 relative">
           <AddressForm/>
           <div className="lg:w-1/2 w-full h-5/6 flex flex-col items-center gap-2">
            <h2 className="font-boldonse text-2xl">Your Order</h2>
            <div className="w-full flex-1 max-lg:max-h-96 flex flex-col overflow-y-auto gap-1">
                {cartItems.map((item: CartItemSchema) => {
                    const imgUrl = item.product_variant.product.default_img?.media_url;
                    return (
                        <div key={item.id} className="h-32 flex gap-2">
                            {imgUrl ? (
                                <img 
                                    src={getOptimizedImageUrl(imgUrl, 224, 256, "scale_crop", "center")} 
                                    alt={item.product_variant.product.name} 
                                    className="h-full w-28 object-cover"
                                    decoding="async"
                                />
                            ) : (
                                <div className="h-full w-28 bg-neutral-100 flex items-center justify-center text-[10px] text-mid uppercase font-bold text-center">No Img</div>
                            )}
                            <div>
                            <p>{item.product_variant.product.name}</p>
                            <p>Color: {item.product_variant.color.name}</p>
                            <p>Size: {item.product_variant.size.name}</p>
                            <p>${item.product_variant.product.price * item.quantity}<span className="text-sm text-mid font-bold">({item.product_variant.product.price} x {item.quantity})</span></p>
                            </div>
                        </div>
                    );
                })}
            </div>
            <div className="w-full border-t-2 border-muted">
                <div className="flex justify-between w-full">
                    <p>Total</p>
                    <p>${subTotal }</p>
                </div>
                <p className="text-sm text-mid">The total amount you pay includes all applicable customs duties & taxes. We guarantee no additional charges on delivery</p>
            </div>
           </div>
        </div>
    )
}