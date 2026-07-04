"use client"
import { getBestSellers } from "@/app/action";
import { useEffect, useState } from "react";
import ItemCard from "./item-card";
import { ProductSchema } from "@/lib/schemas";
export default function BestSeller() {
    const [bestSellers,setBestSellers] = useState<ProductSchema[]>([]);
    useEffect(() => {
        const getdata = async()=>{
            const res = await getBestSellers();
            if(res.success){
                setBestSellers(res.data);
            }
        }
        if(bestSellers.length === 0){
            getdata();
        }
    },[bestSellers]);

    return (
        <div className="flex w-full gap-4">
            {
                bestSellers.length > 0 ? (
                    bestSellers.map((item) => (
                        <ItemCard key={item.id} product={item}/>
                    ))
                ) : (
                    <div className="flex justify-center items-center w-full">
                        <p>No best sellers found</p>
                    </div>
                )
            }
          </div>
    )
}  