import QuantityCart from "../input/quantity-cart";
import { Exit } from "../svg/exit";
export default function CartItems() {
    return (
        <div className="flex gap-2 h-32 w-full  relative ">
            <div className="bg-black h-full w-28"/>
            <div className="flex flex-col gap-1">
                <h3 className="font-semibold mb-2">Jeans</h3>
                <p className="text-muted">Color: Black</p>
                <p className="text-muted">Size: S</p>
                <QuantityCart/>
            </div>
            <button>
                <div className="absolute top-2 right-2">
                    <Exit fill="primary"/>
                </div>
            </button>
        </div>
        
    )
}