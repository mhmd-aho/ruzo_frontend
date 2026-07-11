"use client"
import { useEffect, useState } from "react";
import Sreach from "../svg/sreach";
import { getSearchResults } from "@/app/action";
import { ProductSchema } from "@/lib/schemas";
import SearchResult from "../app/search-result";
import { Exit } from "../svg/exit";

export default function SearchBar() {
    const [results, setResults] = useState<ProductSchema[]>([]);
    const [searchInput, setSearchInput] = useState("");
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    useEffect(() => {
        const debounce = setTimeout(async () => {
            if (searchInput.trim().length <= 3) {
                setResults([]);
                return;
            }
            try {
                const res = await getSearchResults(searchInput);
                if (res.success && res.data.length > 0) {
                    setResults(res.data);
                } else {
                    setResults([]);
                }
            } catch (e) {
                console.error(e);
            }
        }, 300)
        return () => clearTimeout(debounce);
    }, [searchInput])
    useEffect(() => {
      
        if (isMobileOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
    }, [isMobileOpen])
    const handleCloseMobile = () => {
        setIsMobileOpen(false);
        setSearchInput("");
        setResults([]);
    };

    return (
        <>
            <button 
                onClick={() => setIsMobileOpen(true)} 
                className="lg:hidden p-2 text-primary focus:outline-none"
            >
                <Sreach />
            </button>

            <div className="rounded-full shadow-md w-full h-8 size-12 justify-start items-center p-2 hidden lg:flex shadow-primary/50 relative">
                <Sreach />
                <input value={searchInput} onChange={(e) => setSearchInput(e.target.value)} type="text" placeholder="Search..." className="hidden lg:block appearance-none border-0 bg-transparent focus:outline-none focus:border-0 " />
                {searchInput.length > 0 && <div className='absolute top-1/2 -translate-y-1/2 right-2 cursor-pointer' onClick={() => setSearchInput("")}>
                    <Exit fill="primary"/>
                </div>}
            </div>

            {results.length > 0 && (
                <div className="fixed top-20 right-0 w-full h-screen bg-black/20 backdrop-blur-sm hidden lg:block">
                    <div className="absolute top-0 right-[12%] bg-white text-black p-12 w-1/3 h-fit flex flex-col gap-6">
                        <div className="flex flex-col gap-4">
                            {
                                results.map((item) => (
                                    <SearchResult key={item.id} item={item} />
                                ))
                            }
                        </div>
                    </div>
                </div>
            )}

            {isMobileOpen && (
                <div className="fixed inset-0 bg-white text-black z-50 flex flex-col lg:hidden">
                    <div className="flex items-center justify-between p-4 border-b border-gray-200">
                        <div className="flex items-center gap-3 flex-1 max-w-md mx-auto relative">
                            <Sreach />
                            <input 
                                value={searchInput} 
                                onChange={(e) => setSearchInput(e.target.value)} 
                                type="text" 
                                placeholder="Search..." 
                                autoFocus
                                className="w-full appearance-none border-0 bg-transparent focus:outline-none py-2 text-lg" 
                            />
                        </div>
                        <button 
                            onClick={handleCloseMobile} 
                            className="ml-4 text-gray-500 text-sm font-medium p-2"
                        >
                            Cancel
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto p-6 max-w-md mx-auto w-full">
                        {results.length > 0 ? (
                            <div className="flex flex-col gap-6">
                                <div className="flex flex-col gap-4">
                                    {results.map((item) => (
                                        <SearchResult key={item.id} item={item} />
                                    ))}
                                </div>
                            </div>
                        ) : (
                            searchInput.trim().length > 3 && (
                                <p className="text-gray-400 text-center mt-8 text-sm">No results found</p>
                            )
                        )}
                    </div>
                </div>
            )}
        </>
    )
}