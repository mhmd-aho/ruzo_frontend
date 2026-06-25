import Image from "next/image"
import Minus from "@/components/svg/minus"
import Plus from "@/components/svg/plus"
import ItemCard from "@/components/app/item-card"
import { ProductSchema,ProductVariantsSchema,ColorType,SizeType } from "@/lib/schemas";

export default async function Product({params}: {params: Promise<{id: string}>}) {
    const {id} = await params;
    let product: ProductSchema | null = null;
    let productVariants: ProductVariantsSchema[] = [];
    try{
        const res = await fetch(`${process.env.BACKEND_URL}products/${id}/`,{
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            
        })
        const data = await res.json()
        if(!res.ok){
            throw new Error("Failed to fetch product")
        }
        product = data;
    }catch(err){
        console.log(err)
    }
    try{
        const res = await fetch(`${process.env.BACKEND_URL}products/${id}/variants/`,{
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            
        })
        const data = await res.json()
        if(!res.ok){
            throw new Error("Failed to fetch product variants")
        }
        productVariants = data;
    }catch(err){
        console.log(err)
    }
const uniqueColors = Array.from(
        new Map(productVariants.map(v => [v.color.id, v.color])).values()
    );
    
    const uniqueSizes = Array.from(
        new Map(productVariants.map(v => [v.size.id, v.size])).values()
    );
    return (
        <>
            <section className="w-full lg:h-[calc(100vh-80px)]">
                <div className="flex flex-col lg:flex-row items-start justify-center lg:gap-16 gap-6 lg:h-[calc(100vh-80px)]  lg:px-10 px-5 pb-8">
                    <div className="flex relative w-full h-[60vh] lg:h-full lg:w-fit">
                        <div className="flex-col gap-3 hidden lg:flex">
                            <div className="bg-black h-28 w-18"/>
                            <div className="bg-black h-28 w-18"/>
                            <div className="bg-black h-28 w-18"/>
                            <div className="bg-black h-28 w-18"/>
                        </div>
                        <Image
                            width={430}
                            height={573}
                            src='https://3yrpgg4xvr.ucarecd.net/b06ea220-ca39-4a3e-9852-fc0c03ab54b9/-/preview/750x1000/'
                            alt=""
                            className="lg:w-[430px] lg:h-fit object-center object-cover"
                        />
                    </div>
                    <div className="lg:w-1/2 w-full flex flex-col lg:gap-9 gap-3">
                        <h2 className="text-2xl lg:text-4xl font-boldonse">{product?.name}</h2>
                        <p className="lg:text-2xl text-xl font-boldonse text-black">${product?.price}</p>
                        <div className="flex flex-col lg:gap-3 gap-1">
                            <p className="font-bold text-black">Color: <span className="text-mid ml-1">Selected color</span></p>
                            <div className="flex gap-3">
                                {uniqueColors.map((color: ColorType) => (
                                    <button style={{backgroundColor: color.color_code}} key={color.id} className='lg:size-7 size-5 border-2 border-mid rounded-full hover:scale-110 transition-all duration-300 ease-in-out cursor-pointer'></button>
                                ))}
                            </div>
                        </div>
                        <div className="flex flex-col lg:gap-3 gap-1">
                            <p className="font-bold text-black">Size: <span className="text-mid ml-1">Selected size</span></p>
                            <div className="flex gap-3">
                                {uniqueSizes.map((size: SizeType) => (
                                    <button key={size.id} className="border border-mid lg:size-12 size-10">{size.name}</button>
                                ))}
                            </div>
                        </div>
                        <div className="flex flex-col lg:gap-3 gap-1">
                            <p className="font-bold text-black">Quantity:</p>
                            <div className="flex items-center justify-center border border-muted w-fit gap-5 self-start py-3 px-5">
                                <button><Minus fill='black'/></button>
                                <p>1</p>
                                <button><Plus fill='black'/></button>
                            </div>
                        </div>
                        <button className="bg-primary text-white w-full lg:h-14 h-12">Add to cart</button>
                        <div className="flex flex-col gap-3">
                            <p className="font-bold text-black">Description:</p>
                            <p className="text-mid">{product?.description}</p>
                        </div>
                    </div>
                </div>
            </section>
            <section className="lg:h-[calc(100vh-80px)] w-full lg:px-10 px-5 pt-8 pb-12">
                <div className="flex flex-col gap-8">
                    <h2 className="text-2xl lg:text-4xl font-boldonse">You May Also Like</h2>
                    {/* <div className="lg:flex lg:justify-between lg:px-14 flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory">
                        {Array(3).fill(0).map((_, i) => (
                            <div key={i + 1} className="snap-start shrink-0 w-[70vw] lg:w-auto">
                                <ItemCard />
                            </div>
                        ))}
                    </div> */}
                </div>
            </section>
        </>
    )
}
