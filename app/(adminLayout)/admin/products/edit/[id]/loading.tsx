export default function AdminEditProductLoading() {
    return (
        <div className="bg-white py-12 px-4 sm:px-6 lg:px-8 font-montserrat flex flex-col gap-4 select-none pointer-events-none w-full">
            <div className="flex gap-4 items-center">
                <div className="h-6 w-16 bg-neutral-100 animate-pulse rounded" />
            </div>
            <div className="max-w-4xl mx-auto bg-white border border-neutral-100 shadow-sm w-full md:flex">
                {/* Product image block placeholder */}
                <div className="md:w-1/3 bg-neutral-50 relative min-h-[250px] md:min-h-[400px] border-b md:border-b-0 md:border-r border-neutral-100 animate-pulse" />

                {/* Form fields placeholder */}
                <div className="p-8 md:w-2/3 flex flex-col gap-6">
                    <div className="flex flex-col gap-2">
                        <div className="h-8 w-2/3 bg-neutral-100 animate-pulse rounded" />
                        <div className="h-6 w-20 bg-neutral-100 animate-pulse rounded" />
                    </div>
                    <div className="flex gap-3">
                        <div className="h-10 w-24 bg-neutral-100 animate-pulse rounded" />
                        <div className="h-10 w-24 bg-neutral-100 animate-pulse rounded" />
                        <div className="h-10 w-24 bg-neutral-100 animate-pulse rounded" />
                    </div>
                    <div className="flex flex-col gap-2 mt-4">
                        <div className="h-5 w-24 bg-neutral-100 animate-pulse rounded" />
                        <div className="h-12 w-full bg-neutral-50 animate-pulse rounded" />
                    </div>
                </div>
            </div>
        </div>
    );
}
