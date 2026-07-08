"use client";
import { useState } from "react";
export default function Input({type,id, name, placeholder,error,field,required,onChange}: {id: string, name: string, placeholder: string,error?: string,field?: any,required:boolean,type:string,onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void}){
    const [showPassword,setShowPassword] = useState(false);
    if(onChange){
        return (
            <div>
                <input type={type}  id={id} name={name} className={`border-2 ${error ? 'border-red-500' : 'border-mid'} h-12 w-full p-2`} placeholder={placeholder} required={required} onChange={onChange}/>
                {error && <p className="text-red-500">{error}</p>}
            </div>
        )
    }
    return(
        
        <div className="relative">
        <input type={type === "password" ? showPassword ? "text" : "password" : type} {...field} id={id} name={name} className={`border-2 ${error ? 'border-red-500' : 'border-mid'} h-12 w-full p-2`} placeholder={placeholder} required={required} />
        {error && <p className="text-red-500">{error}</p>}
        {type == "password" ? <button onClick={() => setShowPassword(!showPassword)} className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary px-4 py-2 rounded-md text-white" type="button">Show</button> : null}
        </div>
    )
}