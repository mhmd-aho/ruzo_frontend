export default function CollectionsLoading() {
    return (
        <main className="h-fit w-full flex flex-col lg:gap-12 gap-4">
            {/* Hero Banner Skeleton */}
            <section className="h-[calc(100vh-48px)] lg:h-[calc(100vh-80px)] relative bg-neutral-50 animate-pulse">
                <div className="absolute inset-0 bg-neutral-100" />
            </section>
            
            {/* Collections Content Skeleton */}
            <section className="min-h-screen flex flex-col lg:flex-row items-center lg:items-start lg:px-28 gap-6 pb-10 w-full">
                
                {/* Left Sidebar Filter Skeleton */}
                <div className="lg:w-1/4 w-full h-fit flex flex-col items-start justify-start gap-6 max-lg:px-5">
                    <div className="h-8 w-24 bg-neutral-100 animate-pulse rounded" />
                    <div className="w-full flex flex-col gap-5 max-lg:hidden">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="flex flex-col gap-2 w-full py-4 border-b border-neutral-100">
                                <div className="h-5 w-20 bg-neutral-100 animate-pulse rounded" />
                                <div className="flex flex-col gap-1.5 mt-2">
                                    <div className="h-4 w-3/4 bg-neutral-50 animate-pulse rounded" />
                                    <div className="h-4 w-1/2 bg-neutral-50 animate-pulse rounded" />
                                    <div className="h-4 w-2/3 bg-neutral-50 animate-pulse rounded" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Product Grid Skeleton */}
                <div className="flex flex-col items-center justify-start gap-8 flex-1 w-full">
                    <div className="grid grid-cols-2 sm:gap-5 gap-2 max-lg:px-2 w-fit">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <div 
                                key={i}
                                className="lg:h-[540px] h-[280px] lg:w-[392px] sm:h-[400px] sm:w-[250px] max-sm:w-[170px] flex flex-col items-start gap-3 select-none pointer-events-none"
                            >
                                {/* Image Placeholder */}
                                <div className="lg:h-[438px] sm:h-[340px] h-[150px] w-full bg-neutral-100 animate-pulse rounded-md" />
                                
                                {/* Metadata Placeholder */}
                                <div className="w-full flex flex-col gap-2">
                                    <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center w-full gap-2">
                                        <div className="h-5 w-1/2 bg-neutral-100 animate-pulse rounded" />
                                        <div className="h-5 w-16 bg-neutral-100 animate-pulse rounded" />
                                    </div>
                                    <div className="h-4 w-4/5 bg-neutral-100 animate-pulse rounded max-lg:hidden" />
                                    <div className="flex gap-2 max-lg:hidden mt-1">
                                        <div className="size-4 rounded-full bg-neutral-50 animate-pulse" />
                                        <div className="size-4 rounded-full bg-neutral-50 animate-pulse" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </section>
        </main>
    );
}
