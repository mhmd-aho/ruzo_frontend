import Link from "next/link";
import Instagram from "../svg/instagram";

export default function MobileFooter() {
    return(
        <footer className="lg:hidden h-[320px] w-full bg-primary text-white font-montserrat flex flex-col justify-center items-center gap-4">
            <Link href="/contactus">Help & Support</Link>
            <Link href="/contactus">Refunds & Exchanges</Link>
            <Link href="/contactus">Contact Us</Link>
            <p className="text-muted font-bold">© 2026 AURA. All rights reserved.</p>
        </footer>
    )
}