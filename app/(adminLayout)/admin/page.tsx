import Link from "next/link";
export default function AdminPage(){
    return (
        <div className="w-full h-[150vh] lg:h-[calc(100vh-112px)] grid grid-cols-2 grid-rows-6  gap-4 p-5">
            <div className="border border-muted rounded-md col-span-1 row-span-1 lg:row-span-2 p-2 flex flex-col justify-between">
                <h2 className="text-mid">Total Revenue</h2>
                <h1 className="text-3xl font-boldonse">$4500</h1>
                <p className="text-muted">Revenue from all sales</p>
            </div>
            <div className="border border-muted rounded-md col-span-1 row-span-1 lg:row-span-2 p-2 flex flex-col justify-between">
                <h2 className="text-mid">Total Orders</h2>
                <h1 className="text-3xl font-boldonse">38</h1>
                <p className="text-muted">Orders from all sales</p>
            </div>
            <div className="border border-muted rounded-md col-span-2 lg:col-span-1 lg:row-span-4 row-span-2 p-2 flex flex-col justify-between ">
                
            </div>
            <div className="border border-muted rounded-md col-span-2 lg:col-span-1 row-span-3 lg:row-span-4 p-2 flex flex-col justify-between">
                <div className="flex justify-between items-center">
                    <h1 className="font-boldonse text-xl">Recent Orders</h1>
                    <Link href="/admin/orders" className="text-primary">View All </Link>
                </div>
                <div className="flex-1 w-full ">

                </div>
                
            </div>
        </div>
    )
}