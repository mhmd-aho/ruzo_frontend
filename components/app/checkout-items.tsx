import QuantityCart from "../input/quantity-cart";

export default function CheckoutItems(){
    return (
        <div className="w-full h-40 bg-white lg:grid lg:grid-cols-6 flex gap-2">
            <div className="col-span-3 flex gap-3">
                <div className="h-full w-28 bg-black"/>
                <div className="flex flex-col">
                    <p>Product name</p>
                    <p>Color: black</p>
                    <p>Size: M</p>
                </div>
            </div>
            <p className="col-span-1 text-center">$200</p>
            <div className="col-span-1 flex justify-center items-center">
                <QuantityCart/>
            </div>
            <p className="col-span-1 text-center">$200</p>
        </div>
    )
}