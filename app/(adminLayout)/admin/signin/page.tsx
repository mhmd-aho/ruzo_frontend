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
        <div className="flex flex-col gap-3">
            <h1 className="text-2xl font-boldonse">Welcome to Ruzo Admin Portal</h1>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-3 w-full">
                <Controller
                control={form.control}
                name="username"
                render={({field,fieldState}) => (
                    <Input error={fieldState.error?.message} field={field} id="username" name="username" placeholder="Username"/>
                )}
                />
                <Controller
                control={form.control}
                name="password"
                render={({field,fieldState}) => (
                    <Input error={fieldState.error?.message} field={field} id="password" name="password" placeholder="Password"/>
                )}
                />
                <button disabled={isPending} className="bg-primary px-4 py-2 rounded-md text-white" type="submit">
                    {isPending ? "Signing In..." : "Sign In"}
                </button>
            </form>
        </div>
    )
}