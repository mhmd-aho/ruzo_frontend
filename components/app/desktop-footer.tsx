export default function Footer() {
    return(
        <footer className="lg:h-[450px] h-[200px] w-full bg-primary text-white font-montserrat flex flex-col max-lg:hidden">
            <div className="flex-1 flex pt-16 px-10  justify-between">
                <div className="flex flex-col gap-4 w-52">
                    <h2 className="text-2xl font-boldonse">RÜZO</h2>
                    <p className="text-muted text-sm ">Fashion with intention. Confidence with purpose. Worn by women who define their own style.</p>
                </div>
                <div className="flex flex-col gap-4 w-52">
                    <h2 className="text-xl font-bold text-muted">HELP</h2>
                    <div className="flex flex-col gap-4 text-muted">
                        <a href="">Orders & Shipping</a>
                        <a href="">Refunds & Exchanges</a>
                        <a href="">Contact Us</a>
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
                    <a className="text-muted" href="">About RÜZO</a>
                </div>
            </div>
            <div className="h-14 w-full border-t border-muted/20 flex items-center justify-center">
                <p className="text-sm font-montserrat text-muted">© 2026 RÜZO. All rights reserved.</p>
            </div>
        </footer>
    )
}