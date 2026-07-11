export default function AdminOrdersLoading() {
    return (
        <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8 font-montserrat select-none pointer-events-none w-full">
            <div className="max-w-5xl mx-auto bg-white border border-neutral-100 lg:p-8 p-4 shadow-sm flex flex-col gap-8">
                <div className="border-b border-neutral-100 pb-6">
                    <div className="h-9 w-64 bg-neutral-100 animate-pulse rounded" />
                    <div className="h-5 w-32 bg-neutral-50 animate-pulse rounded mt-2" />
                </div>

                <div className="overflow-x-auto border border-neutral-100 bg-white">
                    <div className="w-full h-12 bg-black flex items-center justify-between px-6">
                        <div className="h-4 w-16 bg-neutral-700 animate-pulse rounded" />
                        <div className="h-4 w-32 bg-neutral-700 animate-pulse rounded" />
                        <div className="h-4 w-20 bg-neutral-700 animate-pulse rounded" />
                        <div className="h-4 w-16 bg-neutral-700 animate-pulse rounded" />
                    </div>
                    <div className="divide-y divide-neutral-100 px-6">
                        {[1, 2, 3, 4, 5].map((i) => (
                            <div key={i} className="flex justify-between items-center py-5">
                                <div className="h-7 w-20 bg-neutral-100 animate-pulse rounded" />
                                <div className="flex flex-col gap-1.5 w-40">
                                    <div className="h-4 w-full bg-neutral-100 animate-pulse rounded" />
                                    <div className="h-3.5 w-2/3 bg-neutral-50 animate-pulse rounded" />
                                </div>
                                <div className="h-4 w-24 bg-neutral-100 animate-pulse rounded" />
                                <div className="h-8 w-24 bg-neutral-100 animate-pulse rounded" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
