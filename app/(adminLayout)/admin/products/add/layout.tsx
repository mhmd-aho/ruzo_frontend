import BackArrow from "@/components/svg/back-arrow";
import Link from "next/link";
export default function Layout({
    children
}:{
    children:React.ReactNode
}){
    return (
        <div className="lg:p-8 p-4">
            <div className="flex gap-4 items-center ">
                <Link className="lg:text-xl text-sm flex items-center gap-2" href="/admin/products"> <BackArrow/>Back</Link>
            </div>
            {children}
        </div>
    )
}
    