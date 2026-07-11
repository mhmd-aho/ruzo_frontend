"use client"
import { Exit } from "../svg/exit";
import Plus from "../svg/plus"
import { useState } from "react";
import { createCategory, createSize, createColor } from "@/app/action";
import { toast } from "sonner";
interface Props {
    type: "Category" | "Size" | "Color";
}
export default function AddPopup({type}:Props) {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState("");
    const [color, setColor] = useState("#000000");
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const res = type === "Category" ? await createCategory(name) : type === "Size" ? await createSize(name) : await createColor({name, color_code: color});
        if (res.success) {
            setOpen(false);
            setName("");
            setColor("#000000");
            toast.success(`${type} created successfully!`);
        } else {
            toast.error(res.error || `Failed to create ${type}`);
        }
    }
    return (
        <div>
            <button onClick={() => setOpen(!open)} className="lg:px-4 lg:py-2 py-1 px-2 bg-primary text-white rounded-md flex items-center lg:gap-2 gap-1 max-lg:text-xs"><Plus fill="white"/>Add {type}</button>
           { open && 
            <div className={`flex items-center justify-center absolute top-0 left-0 w-screen h-screen bg-black/20 z-20 rounded-t-md `}>
                <div className="flex justify-center items-center bg-white w-96 h-82 rounded-lg relative">
                    <button onClick={() => setOpen(!open)} className="p-2 absolute top-2 right-2"><Exit fill="primary"/></button>
                    <div className="flex flex-col items-center justify-center gap-4">
                        <h1 className="text-xl font-boldonse">Add {type}</h1>
                        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder={`${type} Name`} className="border border-gray-300 rounded-md p-2" />
                            {
                                type === "Color" && <input type="color" value={color} onChange={(e) => setColor(e.target.value)} className="border border-gray-300 rounded-md p-2" />
                            }
                            <button type="submit" className="bg-primary text-white rounded-md p-2">Add {type}</button>
                        </form>
                    </div>
                </div>
            </div>
            }
        </div>
    )
}