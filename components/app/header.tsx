import Link from "next/link";
import Logo from "../svg/logo";
import Cart from "../svg/cart";
import SearchBar from "../input/search-bar";
import MobileMenu from "./mobile-menu";

export default function Header() {
    return (
        <header className="flex items-center justify-between lg:px-10 px-5 bg-white w-full lg:h-20 h-12 sticky top-0 left-0 z-50">
            <div className="flex justify-start items-center gap-2 lg:hidden w-14">
                <MobileMenu/>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M15.755 14.2549H14.965L14.685 13.9849C15.665 12.8449 16.255 11.3649 16.255 9.75488C16.255 6.16488 13.345 3.25488 9.755 3.25488C6.165 3.25488 3.255 6.16488 3.255 9.75488C3.255 13.3449 6.165 16.2549 9.755 16.2549C11.365 16.2549 12.845 15.6649 13.985 14.6849L14.255 14.9649V15.7549L19.255 20.7449L20.745 19.2549L15.755 14.2549ZM9.755 14.2549C7.26501 14.2549 5.255 12.2449 5.255 9.75488C5.255 7.26488 7.26501 5.25488 9.755 5.25488C12.245 5.25488 14.255 7.26488 14.255 9.75488C14.255 12.2449 12.245 14.2549 9.755 14.2549Z" fill="#0C0C0C"/>
                </svg>
            </div>
            <Link href='/'><Logo/></Link>
            <nav className="text-black gap-12 font-montserrat hidden lg:flex">
                <Link href="/">Home</Link>
                <Link href="/collections">Collections</Link>
                <Link href="/contactus">Contact Us</Link>
                <Link href="/ourstroy">Our Stroy</Link>
            </nav>
            <SearchBar/>
            <Cart/>
        </header>
    );
}   