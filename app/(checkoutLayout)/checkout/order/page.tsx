import Link from "next/link";
import CheckoutItems from "@/components/app/checkout-items";

export default function Page(){
    return (
        <div className="lg:h-[calc(100vh-144px)] h-[calc(100vh-120px)] flex flex-col items-start justify-start lg:px-20 px-5">
            <div className="flex lg:justify-start justify-center items-center gap-6">
                <Link className="text-mid" href='/'>Back</Link>
                <h2 className="font-boldonse text-3xl">Your Cart</h2>
            </div>
            <div className="w-full h-full flex flex-col">
                <div className="lg:flex gap-14 border-b-2 border-muted w-full hidden">
                    <div className="w-1/2 grid grid-cols-6 grid-rows-1  ">

                        <h2 className="col-span-3">Product</h2>
                        <h2 className="col-span-1 text-center">Price</h2>
                        <h2 className="col-span-1 text-center">Quantity</h2>
                        <h2 className="col-span-1 text-center">Total</h2>
                    </div>
                </div>
                <div className="flex-1 flex max-lg:flex-col justify-start items-end">
                    <div className="flex flex-col lg:w-1/2 w-full h-full">
                        <CheckoutItems/>
                    </div>
                    <div className="lg:w-1/2 w-full h-64 border-t-2 border-muted flex flex-col gap-5">
                        <div className="flex justify-between">
                            <p>Subtotal</p>
                            <p>$200</p>
                        </div>
                        <div className="flex justify-between">
                            <p>Shipping</p>
                            <p>$200</p>
                        </div>
                        <div className="flex justify-between">
                            <p>Total</p>
                            <p>$200</p>
                        </div>
                        <p className="font-bold text-sm">The total amount you pay includes all applicable customs duties & taxes. We guarantee no additional charges on delivery</p>
                        <Link href='/checkout/payment' className="w-1/3 h-12 bg-primary text-white ml-auto text-xl flex items-center justify-center">Next</Link>
                    </div>

                </div>
            </div>
        </div>
    )
}