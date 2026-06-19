import Sreach from "../svg/sreach";

export default function SearchBar() {
    return(
        <div className="rounded-full shadow-md w-2/5 h-8 size-12  justify-start items-center p-2 hidden lg:flex shadow-primary/50">
            <Sreach/>
            <input type="text" placeholder="Search..." className="hidden lg:block appearance-none border-0 bg-transparent focus:outline-none focus:border-0 " />
        </div>
    )
}