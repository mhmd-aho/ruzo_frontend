"use client"
import Filter from "../svg/filter";
import { useState } from "react";
import { Exit } from "../svg/exit";
import FilterDisplay from "../input/filter";
export default function Filters() {
    const [showFilters, setShowFilters] = useState(false);
    return(
        <div className="lg:w-1/4 w-full h-fit flex flex-col items-start justify-start gap-4">
            <button onClick={() => setShowFilters(!showFilters)} className="flex items-center justify-center w-full lg:hidden ">
                    <Filter/>
                    Filters
            </button>
            <div className={`${showFilters ? "" : "max-lg:hidden"} max-lg:fixed max-lg:top-12 max-lg:left-0 max-lg:h-screen max-lg:overflow-y-scroll max-lg:pb-32 max-lg:w-full bg-white max-lg:p-4 max-lg:z-40 w-full flex flex-col gap-4 `}>
                <div className="w-full flex items-center justify-between"> 
                    <h2 className="font-boldonse text-2xl">Filters</h2>
                    <button className="lg:hidden" onClick={() => setShowFilters(!showFilters)}>
                        <Exit fill="primary"/>
                    </button>
                </div>
                <div className="flex flex-col">
                    <p className="bg-primary w-fit flex items-center gap-2 p-2 text-white ">
                        Selected filter
                        <button><Exit fill="white" /></button>
                    </p>
                    <div className="flex justify-between">
                        <button className="underline">clear all</button>
                        <button className="">Apply</button>
                    </div>
                </div>
                <FilterDisplay filterName="Size" options={["XS/US (0-4)","S/US (4-6)","M/US (6-10)","L/US (10-12)","XL/US (14-16)"]}/>
                <FilterDisplay filterName="Color" options={["Black","White","Gray","Blue","Red"]}/>
                <FilterDisplay filterName="Collection" options={["In stock","Jeans","Sets","Sets","Skirts"]}/>
            </div>
        </div>
    )
}