export default function CheckoutItems(){
    return (
        <div className="w-full h-40 flex gap-14">
            <div className="flex w-96">
                <div className="h-fit w-28 bg-black"/>
                <div className="flex flex-col">
                    <p>Product name</p>
                    <p>Color: black</p>
                    <p>Size: M</p>
                </div>
            </div>
            <p>$200</p>
            <p>1</p>
            <p>$200</p>
        </div>
    )
}