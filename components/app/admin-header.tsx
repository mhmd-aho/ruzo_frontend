"use client";
import AdminMenu from "./admin-menu";
import Link from "next/link";
import Logo from "../svg/logo";
import LogoutIcon from "../svg/logout";
import { logout } from "@/app/action";
import { toast } from "sonner";
import { useRouter, usePathname } from "next/navigation";

export default function AdminHeader(){
    const router = useRouter();
    const pathname = usePathname();

    const logoutHandler = async() => {
        const res = await logout();
        if(res.success){
            toast.success("Logged out successfully");
            router.push("/");
        }else{
            toast.error(res.error);
        }
    }

    const isSignInPage = pathname === "/admin/signin";

    return(
         <header className="lg:h-28 h-18 lg:px-10 px-5 flex items-center justify-between border-b border-muted">
                <div className="w-1/4 flex justify-start">
                    {!isSignInPage && <AdminMenu/>}
                </div>
                <Link href="/admin" className="flex flex-col items-center gap-1">
                    <Logo/>
                    <p className="text-primary lg:text-xl text-sm ">ADMIN PORTAL</p>
                </Link>
                <div className="w-1/4 flex justify-end items-center lg:gap-6 gap-3">
                    {!isSignInPage && (
                        <button onClick={logoutHandler} className="flex items-center gap-1.5 text-xs lg:text-sm font-semibold text-mid hover:text-black uppercase cursor-pointer">
                            <LogoutIcon className="w-4 h-4" />
                            <span className="lg:block hidden">logout</span>
                        </button>
                    )}
                </div>
            </header>
    )
}