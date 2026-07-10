import Link from "next/link";
import Instagram from "../svg/instagram";

export default function Footer() {
    return(
        <footer className="lg:h-[450px] h-[200px] w-full bg-primary text-white font-montserrat flex flex-col max-lg:hidden">
            <div className="flex-1 flex pt-16 px-10  justify-between">
                <div className="flex flex-col gap-4 w-52">
                    <h2 className="text-2xl font-boldonse">RÜZO</h2>
                    <p className="text-muted text-sm ">Fashion with intention. Confidence with purpose. Worn by women who define their own style.</p>
                    <a href="https://www.instagram.com/ruzobeirut?igsh=MWFvazNxYWJsbnhrdA==" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity w-fit mt-1">
                        <Instagram fill="white" />
                    </a>
                </div>
                <div className="flex flex-col gap-4 w-52">
                    <h2 className="text-xl font-bold text-muted">HELP</h2>
                    <div className="flex flex-col gap-4 text-muted">
                        <a href="https://wa.me/96178707979" target="_blank" rel="noopener noreferrer">Help & Support</a>
                        <a href="https://wa.me/96178707979" target="_blank" rel="noopener noreferrer">Refunds & Exchanges</a>
                        <Link href="/contactus">Contact Us</Link>
                    </div>
                </div>
                <div className="flex flex-col gap-4 w-52">
                    <h2 className="text-xl font-bold text-muted">EXPLORE</h2>
                    <div className="flex flex-col gap-4 text-muted ">
                        <a href="">Collections</a>
                        <a href="">Best Sellers</a>
                    </div>
                </div>
                <div className="flex flex-col gap-4 w-52">
                    <h2 className="text-xl font-bold">COMPANY</h2>
                    <Link className="text-muted" href="/ourstory">About RÜZO</Link>
                </div>
            </div>
            <div className="h-14 w-full border-t border-muted/20 flex items-center justify-center">
                <p className="text-sm font-montserrat text-muted">© 2026 RÜZO. All rights reserved.</p>
            </div>
        </footer>
    )
}