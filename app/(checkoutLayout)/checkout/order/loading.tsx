export default function CheckoutOrderLoading() {
    return (
        <div className="lg:h-[calc(100vh-144px)] h-[calc(100vh-120px)] flex flex-col items-start justify-start lg:px-20 px-5 w-full">
            <div className="flex lg:justify-start justify-center items-center gap-6 select-none pointer-events-none mb-6">
                <div className="h-6 w-12 bg-neutral-100 animate-pulse rounded" />
                <div className="h-8 w-36 bg-neutral-100 animate-pulse rounded" />
            </div>
            
            <div className="w-full h-full flex flex-col gap-5 select-none pointer-events-none">
                {/* Desktop headers placeholder */}
                <div className="lg:flex gap-14 border-b-2 border-neutral-100 w-full hidden pb-3">
                    <div className="w-1/2 grid grid-cols-6">
                        <div className="col-span-3 h-5 w-20 bg-neutral-100 animate-pulse rounded" />
                        <div className="col-span-1 h-5 w-12 bg-neutral-100 animate-pulse rounded mx-auto" />
                        <div className="col-span-1 h-5 w-16 bg-neutral-100 animate-pulse rounded mx-auto" />
                        <div className="col-span-1 h-5 w-12 bg-neutral-100 animate-pulse rounded mx-auto" />
                    </div>
                </div>

                <div className="flex-1 flex max-lg:flex-col justify-start items-end w-full gap-10">
                    {/* Left: Cart Items List Placeholder */}
                    <div className="flex flex-col gap-4 lg:w-1/2 w-full h-full">
                        {[1, 2].map((i) => (
                            <div key={i} className="w-full h-32 border-b border-neutral-100 flex items-center justify-between gap-4 pb-4">
                                <div className="flex gap-4 w-full h-full items-center">
                                    <div className="h-full w-28 bg-neutral-100 animate-pulse rounded" />
                                    <div className="flex flex-col justify-center gap-2">
                                        <div className="h-5 w-40 bg-neutral-100 animate-pulse rounded" />
                                        <div className="h-4 w-24 bg-neutral-50 animate-pulse rounded" />
                                        <div className="h-4 w-16 bg-neutral-50 animate-pulse rounded" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Right: Checkout Summary Box Placeholder */}
                    <div className="lg:w-1/2 w-full h-64 border-t-2 border-neutral-100 flex flex-col gap-5 pt-5">
                        <div className="flex justify-between items-center">
                            <div className="h-6 w-16 bg-neutral-100 animate-pulse rounded" />
                            <div className="h-6 w-24 bg-neutral-100 animate-pulse rounded" />
                        </div>
                        <div className="flex flex-col gap-1.5 mt-2">
                            <div className="h-4 w-full bg-neutral-50 animate-pulse rounded" />
                            <div className="h-4 w-full bg-neutral-50 animate-pulse rounded" />
                        </div>
                        <div className="h-12 w-1/3 bg-neutral-100 animate-pulse rounded ml-auto" />
                    </div>
                </div>
            </div>
        </div>
    );
}
