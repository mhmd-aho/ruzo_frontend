import Logo from "@/components/svg/logo";
import Link from "next/link";

export default function Layout({children}: {children: React.ReactNode}) {
    return(
        <div className="min-h-screen w-full flex flex-col">
            <header className="lg:h-28 h-18 lg:px-10 px-5 flex items-center justify-center">
                <Link href="/admin" className="flex flex-col items-center gap-1">
                    <Logo/>
                    <p className="text-primary ">ADMIN PORTAL</p>
                </Link>
            </header>
            <main className="flex flex-col flex-1 w-full">
                {children}
            </main>
        </div>
    )
}