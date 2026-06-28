import Input from "@/components/input/text-input";
import BackArrow from "@/components/svg/back-arrow";

export default function Payment() {
    return(
        <div className="lg:h-[calc(100vh-144px)] h-[calc(100vh-120px)] flex justify-between items-start gap-12 lg:px-20 px-5">
           <form className="flex flex-col gap-3 w-1/2 pb-20" action="">
              <div className="w-full h-40 bg-black"/>
              <div className="flex gap-3">
                <Input id="firstname" name="firstname" placeholder="First Name"/>
                <Input id="lastname" name="lastname" placeholder="Last Name"/>
              </div>
              <div className="flex gap-3">
                <Input id="phonenumber1" name="phonenumber1" placeholder="Phone Number"/>
                <Input id="phonenumber2" name="phonenumber2" placeholder="Phone Number"/>
              </div>
             <div className="flex gap-3">
                <Input id="gender" name="gender" placeholder="Gender"/>
                <Input id="area" name="area" placeholder="Area"/>
              </div>
              <div className="flex gap-3">
                <Input id="building" name="building" placeholder="Building"/>
                <Input id="floor" name="floor" placeholder="Floor"/>
              </div>
               <Input id="email" name="email" placeholder="Email"/>
               <Input id="address" name="address" placeholder="Address Details"/>
               <div className="flex flex-col gap-2">
                    <h2 className="text-lg">Payment method</h2>
                    <div className="flex justify-between border-2 border-mid p-3">
                            <label htmlFor="cash-on-delivery">Cash on Delivery</label>
                            <input className="size-5 checked:bg-primary rounded-full border border-muted appearance-none" type="radio" name="shipping" id="cash-on-delivery" />
                    </div>
                    <div className="flex justify-between border-2 border-mid p-3">
                            <label htmlFor="e-payment">E-payment</label>
                            <input className="size-5 checked:bg-primary rounded-full border border-muted appearance-none" type="radio" name="shipping" id="e-payment" />
                    </div>
               </div>
               <div className="w-full flex justify-between">
                <button className="text-primary flex justify-center items-center gap-2"><BackArrow/> Return to Cart</button>
                <button className="text-white bg-primary px-5 py-1">Place Order</button>
               </div>
           </form>
           <div className="w-1/2 h-full flex flex-col items-center gap-5">
            <h2 className="font-boldonse text-2xl">Your Order</h2>
            <div className="w-full flex flex-col">
                <div className="h-32 flex">
                    <div className="bg-black h-full w-28"/>
                    <div>
                        <p>Product name</p>
                        <p>Color: black</p>
                        <p>Size: M</p>
                        <p>200$ <span className="font-bold ">x2</span> 400$</p>
                    </div>
                </div>
            </div>
            <div className="w-full border-t-2 border-muted">
                <div className="flex justify-between w-full">
                    <p>Subtotal</p>
                    <p>$200</p>
                </div>
                <div className="flex justify-between w-full">
                    <p>Shipping</p>
                    <p>$200</p>
                </div>
                <div className="flex justify-between w-full">
                    <p>Total</p>
                    <p>$200</p>
                </div>
                <p className="text-sm text-mid">The total amount you pay includes all applicable customs duties & taxes. We guarantee no additional charges on delivery</p>
            </div>
           </div>
        </div>
    )
}