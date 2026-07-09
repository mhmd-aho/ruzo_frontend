"use client"
import {z} from "zod";
import {useForm,Controller} from "react-hook-form";
import { AdminSignInSchema } from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "@/components/input/text-input";
import { useTransition } from "react";
import {adminLogin} from "@/app/action";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
export default function AdminSignIn(){
    const [isPending,startTransition] = useTransition();
    const router = useRouter();
    const form = useForm<z.infer<typeof AdminSignInSchema>>({
        resolver: zodResolver(AdminSignInSchema),
        mode:"onSubmit",
        defaultValues:{
            username:"",
            password:"",
        }
    })
    const onSubmit = (data: z.infer<typeof AdminSignInSchema>) => {
        startTransition(async () => {
            const adminSignIn = await adminLogin(data);
            if(adminSignIn.success){
                toast.success("Welcome back");
                router.push("/admin");
            }else{
                toast.error(adminSignIn.error);
            }
        })
    }
    return (
        <div className="min-h-[calc(100vh-112px)] w-full flex items-center justify-center bg-neutral-50 px-4 py-12 font-montserrat">
            <div className="w-full max-w-md bg-white border border-muted p-8 shadow-md flex flex-col gap-6 rounded-none">
                <div className="flex flex-col gap-1.5 text-center">
                    <h1 className="text-2xl font-boldonse uppercase tracking-wider text-black">Admin Access</h1>
                    <p className="text-xs text-mid uppercase font-semibold tracking-wider">
                        Ruzo Administrative Portal
                    </p>
                </div>
                
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5">
                    <div className="flex flex-col gap-1">
                        <label className="text-[11px] font-bold uppercase tracking-wider text-mid mb-0.5">
                            Username
                        </label>
                        <Controller
                            control={form.control}
                            name="username"
                            render={({field,fieldState}) => (
                                <Input error={fieldState.error?.message} field={field} id="username" name="username" placeholder="Enter username..." required={true} type="text"/>
                            )}
                        />
                    </div>
                    
                    <div className="flex flex-col gap-1">
                        <label className="text-[11px] font-bold uppercase tracking-wider text-mid mb-0.5">
                            Password
                        </label>
                        <Controller
                            control={form.control}
                            name="password"
                            render={({field,fieldState}) => (
                                <Input error={fieldState.error?.message} field={field} id="password" name="password" placeholder="Enter password..." required={true} type="password"/>
                            )}
                        />
                    </div>

                    <button 
                        disabled={isPending} 
                        className="w-full h-12 mt-2 bg-primary text-white hover:bg-black font-bold text-xs uppercase tracking-widest transition-all duration-300 rounded-none cursor-pointer disabled:opacity-50" 
                        type="submit"
                    >
                        {isPending ? "Authenticating..." : "Sign In"}
                    </button>
                </form>
            </div>
        </div>
    )
}