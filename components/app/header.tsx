import Link from "next/link";
import Logo from "../svg/logo";
import SearchBar from "../input/search-bar";
import MobileMenu from "./mobile-menu";
import CollectionButton from "./collection-button";
import Cart from "./cart";

export default function Header() {
    return (
        <header className="flex items-center justify-between lg:px-10 px-5 bg-white w-full lg:h-20 h-12 sticky top-0 left-0 z-50">
            <div className="flex justify-start items-center gap-2 lg:hidden w-14">
                <MobileMenu/>
                <div className="lg:hidden">
                    <SearchBar/>
                </div>
                
            </div>
            <Link href='/'><Logo/></Link>
            <nav className="text-black gap-12 font-montserrat hidden lg:flex items-center h-full ">
                <Link href="/">Home</Link>
                <CollectionButton/>
                <Link href="/contactus">Contact Us</Link>
                <Link href="/ourstory">Our Story</Link>
            </nav>
            <div className="hidden lg:block w-2/5">
                <SearchBar/>
            </div>
            <Cart/>
        </header>
    );
}   