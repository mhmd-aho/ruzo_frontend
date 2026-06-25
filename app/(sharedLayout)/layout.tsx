import Footer from "@/components/app/desktop-footer";
import Header from "@/components/app/header";
import MobileFooter from "@/components/app/mobile-footer";

export default function Layout({children}: {children: React.ReactNode}) {
    return(
        <div className="flex flex-col flex-1">
            <Header />
            {children}
            <Footer/>
            <MobileFooter/>
        </div>
    )
}