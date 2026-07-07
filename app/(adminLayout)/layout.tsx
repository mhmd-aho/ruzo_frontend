import { Metadata } from "next";
import AdminHeader from "@/components/app/admin-header";
export const metadata:Metadata = {
    title: "Ruzo | Admin",
    description: "Admin Portal",
};
export default function Layout({children}: {children: React.ReactNode}) {
    return(
        <div className="min-h-screen w-full flex flex-col">
           <AdminHeader/>
            <main className="flex flex-col flex-1 w-full">
                {children}
            </main>
        </div>
    )
}