export default function AdminPageLoading() {
    return (
        <div className="w-full h-[150vh] lg:h-[calc(100vh-112px)] grid grid-cols-2 grid-rows-6 gap-4 p-5 select-none pointer-events-none">
            {/* Revenue card skeleton */}
            <div className="border border-neutral-100 rounded-md col-span-1 row-span-1 lg:row-span-2 p-4 flex flex-col justify-between">
                <div className="h-5 w-24 bg-neutral-100 animate-pulse rounded" />
                <div className="h-10 w-32 bg-neutral-100 animate-pulse rounded" />
                <div className="h-4 w-36 bg-neutral-50 animate-pulse rounded" />
            </div>

            {/* Orders card skeleton */}
            <div className="border border-neutral-100 rounded-md col-span-1 row-span-1 lg:row-span-2 p-4 flex flex-col justify-between">
                <div className="h-5 w-24 bg-neutral-100 animate-pulse rounded" />
                <div className="h-10 w-16 bg-neutral-100 animate-pulse rounded" />
                <div className="h-4 w-36 bg-neutral-50 animate-pulse rounded" />
            </div>

            {/* Sales Analytics skeleton */}
            <div className="border border-neutral-100 rounded-md col-span-2 lg:col-span-1 lg:row-span-4 row-span-2 p-4 flex flex-col justify-between">
                <div className="h-5 w-32 bg-neutral-100 animate-pulse rounded" />
                <div className="flex-1 flex flex-col items-center justify-center gap-3">
                    <div className="h-8 w-24 bg-neutral-100 animate-pulse rounded" />
                    <div className="h-4 w-40 bg-neutral-50 animate-pulse rounded" />
                </div>
                <div className="h-4 w-44 bg-neutral-50 animate-pulse rounded" />
            </div>

            {/* Recent Orders skeleton */}
            <div className="border border-neutral-100 rounded-md col-span-2 lg:col-span-1 row-span-3 lg:row-span-4 p-4 flex flex-col justify-between">
                <div className="flex justify-between items-center pb-3 border-b border-neutral-100">
                    <div className="h-6 w-32 bg-neutral-100 animate-pulse rounded" />
                    <div className="h-5 w-16 bg-neutral-100 animate-pulse rounded" />
                </div>
                <div className="flex-1 w-full flex flex-col gap-4 mt-4">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="flex justify-between items-center py-2">
                            <div className="h-5 w-20 bg-neutral-100 animate-pulse rounded" />
                            <div className="flex flex-col gap-1.5 items-center">
                                <div className="h-5 w-32 bg-neutral-100 animate-pulse rounded" />
                                <div className="h-4 w-24 bg-neutral-50 animate-pulse rounded" />
                            </div>
                            <div className="h-4 w-24 bg-neutral-100 animate-pulse rounded" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
