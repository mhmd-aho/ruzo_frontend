import Link from "next/link";
import Instagram from "../svg/instagram";

export default function MobileFooter() {
    return(
        <footer className="lg:hidden h-[320px] w-full bg-primary text-white font-montserrat flex flex-col justify-center items-center gap-4">
            <a href="https://wa.me/96178707979" target="_blank" rel="noopener noreferrer">Help & Support</a>
            <a href="https://wa.me/96178707979" target="_blank" rel="noopener noreferrer">Refunds & Exchanges</a>
            <Link href="/contactus">Contact Us</Link>
            <a href="https://www.instagram.com/ruzo.official/" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity my-2">
                <Instagram fill="white" />
            </a>
            <p className="text-muted font-bold">© 2026 RÜZO. All rights reserved.</p>
        </footer>
    )
}