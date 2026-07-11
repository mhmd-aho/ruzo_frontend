export default function PaymentLoading() {
    return (
        <div className="lg:h-[calc(100vh-144px)] flex lg:flex-row flex-col lg:justify-between items-start lg:gap-12 gap-3 lg:px-20 px-5 max-lg:pb-50 w-full select-none pointer-events-none">
            {/* Left: Address Form Skeleton */}
            <div className="w-full lg:w-1/2 flex flex-col gap-5 pt-8">
                <div className="h-8 w-48 bg-neutral-100 animate-pulse rounded" />
                <div className="flex gap-4">
                    <div className="h-12 w-1/2 bg-neutral-100 animate-pulse rounded" />
                    <div className="h-12 w-1/2 bg-neutral-100 animate-pulse rounded" />
                </div>
                <div className="h-12 w-full bg-neutral-100 animate-pulse rounded" />
                <div className="h-12 w-full bg-neutral-100 animate-pulse rounded" />
            </div>

            {/* Right: Order summary Skeleton */}
            <div className="lg:w-1/2 w-full h-5/6 flex flex-col items-center gap-5 pt-8">
                <div className="h-8 w-32 bg-neutral-100 animate-pulse rounded" />
                <div className="w-full flex flex-col gap-4">
                    {[1, 2].map((i) => (
                        <div key={i} className="h-32 flex gap-4 w-full">
                            <div className="h-full w-28 bg-neutral-100 animate-pulse rounded" />
                            <div className="flex flex-col gap-2 justify-center">
                                <div className="h-5 w-36 bg-neutral-100 animate-pulse rounded" />
                                <div className="h-4 w-24 bg-neutral-50 animate-pulse rounded" />
                                <div className="h-4 w-16 bg-neutral-50 animate-pulse rounded" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
