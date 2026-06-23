import Image from "next/image"
import bg from "@/public/hero.png"
import ItemCard from "@/components/app/item-card"
import Filters from "@/components/app/filters"
import { ProductSchema } from "@/lib/schemas";
export default async function Collections() {
    let collections: ProductSchema[] = [];
    try{
        const res = await fetch(`${process.env.BACKEND_URL}products/`,{
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            
        })
        const data = await res.json()
        if(!res.ok){
            throw new Error("Failed to fetch products")
        }
        collections = data.results;
    }catch(err){
        console.log(err)
    }
    return(
        <main className="h-fit w-full flex flex-col lg:gap-12 gap-4">
            <section className="h-[calc(100vh-48px)] lg:h-[calc(100vh-80px)] relative">
                <div className="top-0 left-0 w-full h-full relative">
                    <Image src={bg} alt="" fill className="object-cover"/>
                </div>
            </section>
            <section className="min-h-screen flex flex-col lg:flex-row items-center lg:items-start lg:px-28 gap-6">
               <Filters/>
                <div className="grid grid-cols-2 gap-5">
                    {
                        collections.map((item) => {
                            return (
                                <ItemCard key={item.id} {...item}/>
                            )
                        })
                    }
                </div>
            </section>
        </main>
    )
}