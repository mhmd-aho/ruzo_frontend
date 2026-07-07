import Logo from "@/components/svg/logo";
import Link from "next/link";
import { Metadata } from "next";
import AdminMenu from "@/components/app/admin-menu";
export const metadata:Metadata = {
    title: "Ruzo | Admin",
    description: "Admin Portal",
};
export default function Layout({children}: {children: React.ReactNode}) {
    return(
        <div className="min-h-screen w-full flex flex-col">
            <header className="lg:h-28 h-18 lg:px-10 px-5 flex items-center justify-between">
                <AdminMenu/>
                <Link href="/admin" className="flex flex-col items-center gap-1">
                    <Logo/>
                    <p className="text-primary lg:text-xl text-sm ">ADMIN PORTAL</p>
                </Link>
                <div className="w-1/6 flex justify-end">
                    logout
                </div>
            </header>
            <main className="flex flex-col flex-1 w-full">
                {children}
            </main>
        </div>
    )
}