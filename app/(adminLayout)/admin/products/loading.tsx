export default function AdminProductsLoading() {
    return (
        <div className="flex flex-col justify-center items-center select-none pointer-events-none w-full">
            <div className="flex flex-col gap-4 w-full p-4">
                <div className="h-8 w-32 bg-neutral-100 animate-pulse rounded" />
                <div className="flex justify-between w-full">
                    <div className="h-10 w-36 bg-neutral-100 animate-pulse rounded-md" />
                    <div className="flex gap-3">
                        <div className="h-10 w-24 bg-neutral-100 animate-pulse rounded-md" />
                        <div className="h-10 w-24 bg-neutral-100 animate-pulse rounded-md" />
                    </div>
                </div>
            </div>
            <div className="flex justify-between items-center flex-wrap lg:p-10 p-4 gap-6 w-full justify-items-center">
                {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="lg:h-[540px] h-[200px] lg:w-[392px] sm:h-[400px] sm:w-[250px] max-sm:w-[170px] flex flex-col items-start gap-3">
                        <div className="lg:h-[438px] sm:h-[340px] h-[150px] w-full bg-neutral-100 animate-pulse rounded" />
                        <div className="w-full flex flex-col gap-2">
                            <div className="flex justify-between w-full">
                                <div className="h-5 w-1/2 bg-neutral-100 animate-pulse rounded" />
                                <div className="h-5 w-12 bg-neutral-100 animate-pulse rounded" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
