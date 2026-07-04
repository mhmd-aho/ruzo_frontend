"use client";
import { useState } from "react";
import Plus from "../svg/plus";
import Minus from "../svg/minus";

export default function FilterDisplay({
    filterName,
    options,
    selectedValue,
    onSelect,
}: {
    filterName: { key: string; value: string };
    options: { key: string; value: string }[];
    selectedValue: string | null;
    onSelect: (filterName: string, option: string) => void;
}) {
    const [showFilter, setShowFilter] = useState(false);

    return (
        <div className={`border border-primary ${showFilter ? 'bg-white' : 'bg-primary'} w-full p-2 flex flex-col gap-5`}>
            <div className="flex justify-between items-center w-full">
                <h3 className={`font-bold ${showFilter ? 'text-primary' : 'text-white'}`}>{filterName.value}</h3>
                <button type="button" onClick={() => setShowFilter(!showFilter)} className="cursor-pointer">
                    {showFilter ? <Minus fill="primary" /> : <Plus fill="white" />}
                </button>
            </div>
            {showFilter && (
                <ul className="flex flex-col gap-2">
                    {options.map((option) => {
                        const isChecked = selectedValue === option.key;
                        return (
                            <div 
                                onClick={() => onSelect(filterName.key, option.key)} 
                                key={option.key} 
                                className={`flex items-center gap-2 cursor-pointer py-1 transition-colors select-none ${showFilter ? 'text-black hover:text-primary' : 'text-white hover:text-muted'}`}
                            >
                                <div className={`size-4 border-2 border-primary flex items-center justify-center rounded-sm transition-all ${isChecked ? 'bg-primary' : 'bg-transparent'}`}>
                                    {isChecked && (
                                        <svg className="size-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3.5}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                        </svg>
                                    )}
                                </div>
                                <label className="cursor-pointer text-sm font-medium">{option.value}</label>
                            </div>
                        );
                    })}
                </ul>
            )}
        </div>
    );
}
    