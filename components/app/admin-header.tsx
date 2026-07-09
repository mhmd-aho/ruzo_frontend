"use client";
import AdminMenu from "./admin-menu";
import Link from "next/link";
import Logo from "../svg/logo";
import LogoutIcon from "../svg/logout";
import { logout, closeBulk } from "@/app/action";
import { toast } from "sonner";
import { useRouter, usePathname } from "next/navigation";
import { useTransition } from "react";

export default function AdminHeader(){
    const router = useRouter();
    const pathname = usePathname();
    const [isPending, startTransition] = useTransition();

    const logoutHandler = async() => {
        const res = await logout();
        if(res.success){
            toast.success("Logged out successfully");
            router.push("/");
        }else{
            toast.error(res.error);
        }
    }

    const handleCloseBulk = () => {
        if (!confirm("Are you sure you want to close the daily bulk? This will finalize all shipments in the current run.")) {
            return;
        }
        startTransition(async () => {
            const res = await closeBulk();
            if (res.success) {
                toast.success(res.message + (res.bulk_id ? ` (ID: ${res.bulk_id})` : ""));
            } else {
                toast.error(res.error || "Failed to close bulk session.");
            }
        });
    };

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
                        <>
                            <button
                                onClick={handleCloseBulk}
                                disabled={isPending}
                                type="button"
                                className="h-10 lg:px-4 px-2 bg-primary text-white hover:bg-black font-semibold text-[10px] lg:text-xs uppercase tracking-widest transition-all duration-300 disabled:opacity-50 cursor-pointer"
                            >
                                {isPending ? "Closing..." : "Close Bulk"}
                            </button>
                            <button onClick={logoutHandler} className="flex items-center gap-1.5 text-xs lg:text-sm font-semibold text-mid hover:text-black uppercase">
                                <LogoutIcon className="w-4 h-4" />
                                <span className="lg:block hidden">logout</span>
                            </button>
                        </>
                    )}
                </div>
            </header>
    )
}