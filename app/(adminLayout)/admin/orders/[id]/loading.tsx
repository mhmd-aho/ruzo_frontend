export default function AdminOrderDetailLoading() {
    return (
        <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8 font-montserrat select-none pointer-events-none w-full">
            <div className="max-w-4xl mx-auto bg-white border border-neutral-100 p-8 shadow-sm flex flex-col gap-8">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-neutral-100 pb-6">
                    <div className="flex flex-col gap-2">
                        <div className="h-9 w-64 bg-neutral-100 animate-pulse rounded" />
                        <div className="h-5 w-40 bg-neutral-50 animate-pulse rounded" />
                    </div>
                    <div className="h-8 w-24 bg-neutral-100 animate-pulse rounded" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Customer Info Card Placeholder */}
                    <div className="border border-neutral-100 p-6 flex flex-col gap-4">
                        <div className="h-5 w-32 bg-neutral-100 animate-pulse rounded border-b border-neutral-100 pb-2" />
                        <div className="flex flex-col gap-2">
                            <div className="h-4 w-1/2 bg-neutral-100 animate-pulse rounded" />
                            <div className="h-4 w-3/4 bg-neutral-50 animate-pulse rounded" />
                            <div className="h-4 w-2/3 bg-neutral-50 animate-pulse rounded" />
                        </div>
                    </div>

                    {/* Order Details Card Placeholder */}
                    <div className="border border-neutral-100 p-6 flex flex-col gap-4">
                        <div className="h-5 w-32 bg-neutral-100 animate-pulse rounded border-b border-neutral-100 pb-2" />
                        <div className="flex flex-col gap-2">
                            <div className="h-4 w-2/3 bg-neutral-100 animate-pulse rounded" />
                            <div className="h-4 w-1/2 bg-neutral-50 animate-pulse rounded" />
                            <div className="h-4 w-1/3 bg-neutral-50 animate-pulse rounded" />
                        </div>
                    </div>
                </div>

                {/* Items Table Placeholder */}
                <div className="border border-neutral-100">
                    <div className="h-10 bg-neutral-100 animate-pulse w-full rounded-t" />
                    <div className="p-6 divide-y divide-neutral-100">
                        {[1, 2].map((i) => (
                            <div key={i} className="flex justify-between items-center py-4">
                                <div className="flex items-center gap-4">
                                    <div className="h-16 w-12 bg-neutral-100 animate-pulse rounded" />
                                    <div className="flex flex-col gap-1.5">
                                        <div className="h-4 w-32 bg-neutral-100 animate-pulse rounded" />
                                        <div className="h-3.5 w-16 bg-neutral-50 animate-pulse rounded" />
                                    </div>
                                </div>
                                <div className="h-4 w-20 bg-neutral-100 animate-pulse rounded" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
