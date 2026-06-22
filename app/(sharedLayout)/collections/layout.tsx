import PageLocation from "@/components/app/page_location"

export default function Layout({children}: {children: React.ReactNode}) {
    return(
        <div className="flex flex-col">
            <PageLocation/>
            {children}
        </div>
    )
}