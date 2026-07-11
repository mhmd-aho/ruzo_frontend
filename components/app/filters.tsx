"use client";
import Filter from "../svg/filter";
import { useState, useEffect, useTransition } from "react";
import { Exit } from "../svg/exit";
import FilterDisplay from "../input/filter";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { getCategories, getColors, getSizes } from "@/app/action";
import { CategorySchema, ColorSchema, SizeSchema } from "@/lib/schemas";

export default function Filters() {
    const [showFilters, setShowFilters] = useState(false);
    const [categories, setCategories] = useState<CategorySchema[]>([]);
    const [colors, setColors] = useState<ColorSchema[]>([]);
    const [sizes, setSizes] = useState<SizeSchema[]>([]);
    const [isPending, startTransition] = useTransition();
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    // Local optimistic state for filter selections to update UI instantly
    const [selectedFilters, setSelectedFilters] = useState<Record<string, string | null>>({
        sort: searchParams.get("sort"),
        size: searchParams.get("size"),
        color: searchParams.get("color"),
        category: searchParams.get("category"),
    });

    useEffect(() => {
        setSelectedFilters({
            sort: searchParams.get("sort"),
            size: searchParams.get("size"),
            color: searchParams.get("color"),
            category: searchParams.get("category"),
        });
    }, [searchParams]);

    useEffect(() => {
        const fetchFilters = async () => {
            const [categoriesRes, colorsRes, sizesRes] = await Promise.all([
                getCategories(),
                getColors(),
                getSizes()
            ]);
            if (categoriesRes.success && categoriesRes.data) {
                setCategories(categoriesRes.data);
            }
            if (colorsRes.success && colorsRes.data) {
                setColors(colorsRes.data);
            }
            if (sizesRes.success && sizesRes.data) {
                setSizes(sizesRes.data);
            }
        };
        fetchFilters();
    }, []);

    const filterKeys = ["sort", "size", "color", "category"];

    const handleFilter = (filterName: string, option: string) => {
        const currentValue = selectedFilters[filterName];
        const nextValue = currentValue === option ? null : option;

        const nextFilters = {
            ...selectedFilters,
            [filterName]: nextValue
        };

        // Update client state instantly so checkbox checkbox updates instantly
        setSelectedFilters(nextFilters);

        // Rebuild query parameters avoiding race conditions from stale searchParams
        const params = new URLSearchParams();
        for (const [key, val] of searchParams.entries()) {
            if (!filterKeys.includes(key) && key !== "page") {
                params.set(key, val);
            }
        }

        Object.entries(nextFilters).forEach(([key, val]) => {
            if (val) {
                params.set(key, val);
            }
        });

        startTransition(() => {
            router.push(`${pathname}?${params.toString()}`, { scroll: false });
        });
    };

    const clearFilter = (filterName: string) => {
        const nextFilters = {
            ...selectedFilters,
            [filterName]: null
        };
        setSelectedFilters(nextFilters);

        const params = new URLSearchParams();
        for (const [key, val] of searchParams.entries()) {
            if (!filterKeys.includes(key) && key !== "page") {
                params.set(key, val);
            }
        }

        Object.entries(nextFilters).forEach(([key, val]) => {
            if (val) {
                params.set(key, val);
            }
        });

        startTransition(() => {
            router.push(`${pathname}?${params.toString()}`, { scroll: false });
        });
    };

    const clearAllFilters = () => {
        const nextFilters = {
            sort: null,
            size: null,
            color: null,
            category: null,
        };
        setSelectedFilters(nextFilters);

        const params = new URLSearchParams();
        for (const [key, val] of searchParams.entries()) {
            if (!filterKeys.includes(key) && key !== "page") {
                params.set(key, val);
            }
        }

        startTransition(() => {
            router.push(`${pathname}?${params.toString()}`, { scroll: false });
        });
    };
    
    const keyLabels: Record<string, string> = {
        sort: "Sort",
        size: "Size",
        color: "Color",
        category: "Category"
    };

    const getOptionLabel = (key: string, val: string) => {
        if (key === "sort") {
            const sortLabels: Record<string, string> = {
                best_selling: "Best Seller",
                price_asc: "Price: Low to High",
                price_desc: "Price: High to Low"
            };
            return sortLabels[val] || val;
        }
        if (key === "category") {
            const cat = categories.find(c => c.name.toLowerCase() === val.toLowerCase());
            return cat ? cat.name : val;
        }
        if (key === "color") {
            const col = colors.find(c => c.name.toLowerCase() === val.toLowerCase());
            return col ? col.name : val;
        }
        if (key === "size") {
            const sz = sizes.find(s => s.name.toLowerCase() === val.toLowerCase());
            return sz ? sz.name.toUpperCase() : val.toUpperCase();
        }
        return val;
    };

    const activeFilters = filterKeys
        .map((key) => {
            const val = selectedFilters[key];
            return val ? { key, value: val, label: `${keyLabels[key]}: ${getOptionLabel(key, val)}` } : null;
        })
        .filter((item): item is { key: string; value: string; label: string } => item !== null);

    return (
        <div className="lg:w-1/4 w-full h-fit flex flex-col items-start justify-start gap-4">
            <button onClick={() => setShowFilters(!showFilters)} className="flex items-center justify-center w-full lg:hidden cursor-pointer  p-2 font-semibold">
                <Filter />
                Filters
            </button>
            <div className={`${showFilters ? "" : "max-lg:hidden"} max-lg:fixed max-lg:top-12 max-lg:left-0 max-lg:h-screen max-lg:overflow-y-scroll max-lg:pb-32 max-lg:w-full bg-white max-lg:p-4 max-lg:z-40 w-full flex flex-col gap-4 `}>
                <div className="w-full flex items-center justify-between"> 
                    <h2 className="font-boldonse text-2xl flex items-center gap-2">
                        Filters
                        {isPending && <span className="text-xs font-montserrat text-primary animate-pulse font-normal tracking-normal lowercase">updating...</span>}
                    </h2>
                    <button className="lg:hidden cursor-pointer" onClick={() => setShowFilters(!showFilters)}>
                        <Exit fill="primary" />
                    </button>
                </div>
                
                <div className={`flex flex-col gap-4 transition-opacity duration-200 ${isPending ? 'opacity-50' : ''}`}>
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
                    selectedValue={selectedFilters.sort} 
                    filterName={{key: "sort", value: "Sort by"}} 
                    options={[{key: "best_selling", value: "Best Seller"}, {key: "price_asc", value: "Price: Low to High"}, {key: "price_desc", value: "Price: High to Low"}]}
                />
                <FilterDisplay 
                    onSelect={handleFilter} 
                    selectedValue={selectedFilters.size} 
                    filterName={{key: "size", value: "Size"}} 
                    options={sizes.map((s) => ({
                        key: s.name,
                        value: s.name.toUpperCase()
                    }))}
                />
                <FilterDisplay 
                    onSelect={handleFilter} 
                    selectedValue={selectedFilters.color} 
                    filterName={{key: "color", value: "Color"}} 
                    options={colors.map((c) => ({
                        key: c.name,
                        value: c.name
                    }))}
                />
                <FilterDisplay 
                    onSelect={handleFilter} 
                    selectedValue={selectedFilters.category} 
                    filterName={{key: "category", value: "Category"}} 
                    options={categories.map((cat) => ({
                        key: cat.name,
                        value: cat.name
                    }))}
                />
            </div>
        </div>
    );
}
