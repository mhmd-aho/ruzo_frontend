"use client";
import AdminMenu from "./admin-menu";
import Link from "next/link";
import Logo from "../svg/logo";
import { logout } from "@/app/action";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
export default function AdminHeader(){
    const router = useRouter();
    const logoutHandler = async() => {
        const res = await logout();
        if(res.success){
            toast.success("Logged out successfully");
            router.push("/");
        }else{
            toast.error(res.error);
        }
    }
    return(
         <header className="lg:h-28 h-18 lg:px-10 px-5 flex items-center justify-between">
                <AdminMenu/>
                <Link href="/admin" className="flex flex-col items-center gap-1">
                    <Logo/>
                    <p className="text-primary lg:text-xl text-sm ">ADMIN PORTAL</p>
                </Link>
                <button onClick={logoutHandler} className="w-1/6 flex justify-end">
                    logout
                </button>
            </header>
    )
}