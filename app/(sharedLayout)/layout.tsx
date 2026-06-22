import Footer from "@/components/app/desktop-footer";
import Header from "@/components/app/header";
import MobileFooter from "@/components/app/mobile-footer";

export default function Layout({children}: {children: React.ReactNode}) {
    return(
        <main className="flex flex-col">
            <Header />
            {children}
            <Footer/>
            <MobileFooter/>
        </main>
    )
}