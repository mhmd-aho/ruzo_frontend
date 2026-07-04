"use client";
import Filter from "../svg/filter";
import { useState } from "react";
import { Exit } from "../svg/exit";
import FilterDisplay from "../input/filter";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function Filters() {
    const [showFilters, setShowFilters] = useState(false);
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const handleFilter = (filterName: string, option: string) => {
        const params = new URLSearchParams(searchParams.toString());
        const currentValue = params.get(filterName);
        if (currentValue === option) {
            params.delete(filterName);
        } else {
            params.set(filterName, option);
        }
        router.push(`${pathname}?${params.toString()}`, {scroll: false});
    };

    const clearFilter = (filterName: string) => {
        const params = new URLSearchParams(searchParams.toString());
        params.delete(filterName);
        router.push(`${pathname}?${params.toString()}`, {scroll: false});
    };

    const clearAllFilters = () => {
        router.push(pathname, {scroll: false});
    };

    const filterKeys = ["sort", "size", "color", "category"];
    
    const keyLabels: Record<string, string> = {
        sort: "Sort",
        size: "Size",
        color: "Color",
        category: "Category"
    };

    const optionLabels: Record<string, string> = {
        best_selling: "Best Seller",
        price_asc: "Price: Low to High",
        price_desc: "Price: High to Low",
        xs: "XS",
        s: "S",
        m: "M",
        l: "L",
        xl: "XL",
        black: "Black",
        white: "White",
        gray: "Gray",
        blue: "Blue",
        red: "Red",
        in_stock: "In Stock",
        jeans: "Jeans",
        sets: "Sets",
        skirts: "Skirts"
    };

    const activeFilters = filterKeys
        .map((key) => {
            const val = searchParams.get(key);
            return val ? { key, value: val, label: `${keyLabels[key]}: ${optionLabels[val] || val}` } : null;
        })
        .filter((item): item is { key: string; value: string; label: string } => item !== null);

    return (
        <div className="lg:w-1/4 w-full h-fit flex flex-col items-start justify-start gap-4">
            <button onClick={() => setShowFilters(!showFilters)} className="flex items-center justify-center w-full lg:hidden cursor-pointer border border-primary p-2 font-semibold">
                <Filter />
                Filters
            </button>
            <div className={`${showFilters ? "" : "max-lg:hidden"} max-lg:fixed max-lg:top-12 max-lg:left-0 max-lg:h-screen max-lg:overflow-y-scroll max-lg:pb-32 max-lg:w-full bg-white max-lg:p-4 max-lg:z-40 w-full flex flex-col gap-4 `}>
                <div className="w-full flex items-center justify-between"> 
                    <h2 className="font-boldonse text-2xl">Filters</h2>
                    <button className="lg:hidden cursor-pointer" onClick={() => setShowFilters(!showFilters)}>
                        <Exit fill="primary" />
                    </button>
                </div>
                
                <div className="flex flex-col gap-4">
                    {activeFilters.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                            {activeFilters.map((filter) => (
                                <div key={filter.key} className="bg-primary flex items-center gap-2 p-1.5 text-white text-xs font-semibold rounded-sm">
                                    <span>{filter.label}</span>
                                    <button type="button" onClick={() => clearFilter(filter.key)} className="cursor-pointer">
                                        <Exit fill="white" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                    <div className="flex justify-between lg:justify-end lg:items-end max-lg:px-5 gap-4">
                        {activeFilters.length > 0 && (
                            <button onClick={clearAllFilters} className="lg:bg-primary w-fit py-2 px-5 lg:text-white text-mid self-end text-sm cursor-pointer hover:opacity-90">
                                Clear All Filters
                            </button>
                        )}
                        <button className="lg:hidden bg-primary text-white py-2 px-5 text-sm cursor-pointer" onClick={() => setShowFilters(!showFilters)}>
                            Apply Filters
                        </button>
                    </div>
                </div>

                <FilterDisplay 
                    onSelect={handleFilter} 
                    selectedValue={searchParams.get("sort")} 
                    filterName={{key: "sort", value: "Sort by"}} 
                    options={[{key: "best_selling", value: "Best Seller"}, {key: "price_asc", value: "Price: Low to High"}, {key: "price_desc", value: "Price: High to Low"}]}
                />
                <FilterDisplay 
                    onSelect={handleFilter} 
                    selectedValue={searchParams.get("size")} 
                    filterName={{key: "size", value: "Size"}} 
                    options={[{key: "xs", value: "XS/US (0-4)"}, {key: "s", value: "S/US (4-6)"}, {key: "m", value: "M/US (6-10)"}, {key: "l", value: "L/US (10-12)"}, {key: "xl", value: "XL/US (14-16)"}]}
                />
                <FilterDisplay 
                    onSelect={handleFilter} 
                    selectedValue={searchParams.get("color")} 
                    filterName={{key: "color", value: "Color"}} 
                    options={[{key: "black", value: "Black"}, {key: "white", value: "White"}, {key: "gray", value: "Gray"}, {key: "blue", value: "Blue"}, {key: "red", value: "Red"}]}
                />
                <FilterDisplay 
                    onSelect={handleFilter} 
                    selectedValue={searchParams.get("category")} 
                    filterName={{key: "category", value: "Category"}} 
                    options={[{key: "in_stock", value: "In stock"}, {key: "jeans", value: "Jeans"}, {key: "sets", value: "Sets"}, {key: "skirts", value: "Skirts"}]}
                />
            </div>
        </div>
    );
}
