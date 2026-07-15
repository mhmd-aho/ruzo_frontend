export default function ProductLoading() {
    return (
        <main className="w-full min-h-screen flex flex-col gap-10 pb-16">
            <section className="w-full flex flex-col">
                <div className="flex flex-col lg:flex-row items-start justify-center lg:gap-16 gap-6 h-fit lg:h-[calc(100vh-80px)] lg:p-10 px-5 pb-8 w-full">
                    
                    {/* Left: Product Gallery Skeleton */}
                    <div className="lg:w-1/2 w-full lg:h-full h-[500px] flex flex-col-reverse lg:flex-row gap-5 items-center justify-between select-none pointer-events-none">
                        {/* Thumbnails list */}
                        <div className="flex lg:flex-col flex-row gap-3 h-fit lg:h-full w-full lg:w-20 overflow-x-auto lg:overflow-y-auto shrink-0 justify-center max-lg:hidden">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="h-20 w-16 lg:h-28 lg:w-20 bg-neutral-100 animate-pulse rounded" />
                            ))}
                        </div>
                        {/* Main Image Box */}
                        <div className="flex-1 w-full h-full bg-neutral-100 animate-pulse rounded-md min-h-[400px] lg:min-h-full" />
                    </div>

                    {/* Right: Product Options Skeleton */}
                    <div className="flex flex-col gap-8 lg:w-1/2 w-full h-full select-none pointer-events-none pr-10">
                        {/* Title and Price */}
                        <div className="flex flex-col gap-4">
                            <div className="h-10 w-3/4 bg-neutral-100 animate-pulse rounded" />
                            <div className="h-6 w-24 bg-neutral-100 animate-pulse rounded" />
                        </div>
                        {/* Description */}
                        <div className="flex flex-col gap-2 mt-4">
                            <div className="h-4 w-full bg-neutral-50 animate-pulse rounded" />
                            <div className="h-4 w-full bg-neutral-50 animate-pulse rounded" />
                            <div className="h-4 w-2/3 bg-neutral-50 animate-pulse rounded" />
                        </div>
                        {/* Colors */}
                        <div className="flex flex-col gap-3 mt-4">
                            <div className="h-5 w-20 bg-neutral-100 animate-pulse rounded" />
                            <div className="flex gap-3">
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className="size-8 rounded-full bg-neutral-100 animate-pulse" />
                                ))}
                            </div>
                        </div>
                        {/* Sizes */}
                        <div className="flex flex-col gap-3 mt-4">
                            <div className="h-5 w-20 bg-neutral-100 animate-pulse rounded" />
                            <div className="flex gap-3">
                                {[1, 2, 3, 4, 5].map((i) => (
                                    <div key={i} className="h-10 w-12 bg-neutral-100 animate-pulse rounded" />
                                ))}
                            </div>
                        </div>
                        {/* Quantity and CTA */}
                        <div className="flex flex-col gap-4 mt-6">
                            <div className="h-12 w-1/3 bg-neutral-100 animate-pulse rounded" />
                            <div className="h-14 w-full bg-neutral-100 animate-pulse rounded" />
                        </div>
                    </div>

                </div>
            </section>
            
            {/* You May Also Like Section Skeleton */}
            <section className="lg:h-[calc(100vh-80px)] w-full lg:px-10 px-5 pt-8 pb-12">
                <div className="flex flex-col gap-8">
                    <h2 className="text-2xl lg:text-4xl font-boldonse animate-pulse bg-neutral-100 h-10 w-64 rounded" />
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="flex flex-col gap-3">
                                <div className="h-64 bg-neutral-100 animate-pulse rounded" />
                                <div className="h-4 w-3/4 bg-neutral-100 animate-pulse rounded" />
                                <div className="h-4 w-1/4 bg-neutral-100 animate-pulse rounded" />
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}
