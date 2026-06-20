import Image from "next/image";
import img from "@/public/hero.png"
import Link from "next/link";
export default function ItemCard() {
    return(
        <Link href='/collections/product' className="lg:h-[540px] h-[280px] lg:w-[392px] w-[170px] flex flex-col items-start gap-3">
            <div className="lg:h-[438px] h-[220px] w-full overflow-hidden">
               <Image src={img} alt="" className="object-cover"/>
            </div>
            <div className="flex-1 w-full flex flex-col gap-2">
                <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center w-full">
                    <p className="text-black font-bold font-montserrat text-sm lg:text-base ">Tailored Stretch Pants</p>
                    <p className="text-black font-boldonse text-sm lg:text-base ">$120</p>
                </div>
                <p className="text-mid font-montserrat text-xs lg:w-4/5 max-lg:hidden">Classic style, premium comfort. Perfect for work or weekend.</p>
                <div className="flex gap-2 max-lg:hidden">
                    {Array.from({length: 5}).map((_,i)=>(
                        <div className="size-4 rounded-full border border-mid bg-pink-400" key={i}></div>
                    ))}
                </div>
            </div>
        </Link>
    )
}