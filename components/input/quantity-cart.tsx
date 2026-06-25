import Minus from "../svg/minus";
import Plus from "../svg/plus";
export default function QuantityCart() {
    return (
        <div className="flex bg-primary h-8 items-center justify-center gap-1 p-2">
            <button className="flex items-start justify-center">
                <Minus fill="white"/>
            </button>
            <p className="text-white w-6 text-center">1</p>
            <button className="flex items-end justify-center">
                <Plus fill="white"/>
            </button>
        </div>
    )
}