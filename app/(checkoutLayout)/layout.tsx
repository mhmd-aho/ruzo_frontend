import PageLocation from "@/components/app/page_location";
import Logo from "@/components/svg/logo";

export default function Layout({children}: {children: React.ReactNode}) {
    return(
        <body className="min-h-screen w-full flex flex-col">
            <header className="lg:h-20 h-12 lg:px-10 px-5 flex items-center">
                <Logo/>
            </header>
            <main className="flex flex-col flex-1 w-full">
                <PageLocation/>
                {children}
            </main>
      </body>
    )
}