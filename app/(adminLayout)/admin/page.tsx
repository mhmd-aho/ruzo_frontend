import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { OrderSchema } from "@/lib/schemas";
import { getOrders } from "@/app/action";

export default async function AdminPage(){
    const cookieStore = await cookies();
    const token = cookieStore.get("admin_token");
    if(!token){
        redirect("/admin/signin");
    }
    let orders: OrderSchema[] = [];
    try{
        const res = await getOrders();
        if (res.success && Array.isArray(res.data)) {
            orders = res.data;
        } else if (res.error && (res.error.toLowerCase().includes("unauthorized") || res.error.toLowerCase().includes("token") || res.error.toLowerCase().includes("not found"))) {
            redirect("/admin/signin");
        }
    }catch(error){
        if ((error as { digest?: string })?.digest?.startsWith("NEXT_REDIRECT")) {
            throw error;
        }
        console.log(error);
    }
    if (!Array.isArray(orders)) {
        orders = [];
    }
    const totalRevenue = orders.reduce((acc:number,order:OrderSchema) => acc + Number(order.total_price),0);
    return (
        <div className="w-full h-[150vh] lg:h-[calc(100vh-112px)] grid grid-cols-2 grid-rows-6  gap-4 p-5">
            <div className="border border-muted rounded-md col-span-1 row-span-1 lg:row-span-2 p-2 flex flex-col justify-between">
                <h2 className="text-mid">Total Revenue</h2>
                <h1 className="text-3xl font-boldonse">${totalRevenue.toFixed(2)}</h1>
                <p className="text-muted">Revenue from all sales</p>
            </div>
            <div className="border border-muted rounded-md col-span-1 row-span-1 lg:row-span-2 p-2 flex flex-col justify-between">
                <h2 className="text-mid">Total Orders</h2>
                <h1 className="text-3xl font-boldonse">{orders.length}</h1>
                <p className="text-muted">Orders from all sales</p>
            </div>
            <div className="border border-muted rounded-md col-span-2 lg:col-span-1 lg:row-span-4 row-span-2 p-2 flex flex-col justify-between">
                <h2 className="text-mid">Sales Analytics</h2>
                <div className="flex-1 flex flex-col items-center justify-center text-muted">
                    <p className="font-semibold text-lg">Chart</p>
                    <p className="text-xs text-mid mt-1 font-montserrat">Chart will be available soon</p>
                </div>
                <p className="text-muted">Analytics and visual trends</p>
            </div>
            <div className="border border-muted rounded-md col-span-2 lg:col-span-1 row-span-3 lg:row-span-4 p-2 flex flex-col justify-between">
                <div className="flex justify-between items-center">
                    <h1 className="font-boldonse text-xl">Recent Orders</h1>
                    <Link href="/admin/orders" className="text-primary">View All </Link>
                </div>
                <div className="flex-1 w-full ">
                    <div className="w-full flex justify-between text-mid text-center">
                        <p className="w-32">Status</p>
                        <p className="w-32">Customer</p>
                        <p className="w-32">Date</p>

                    </div>
                    {orders.map((order:OrderSchema) => {
                        const date = new Date(order.created_at);
                        
                        return(
                        <div key={order.id} className="flex justify-between items-center text-center">
                                <p className={`${order.status === "pending" ? "text-yellow-500" : order.status === "shipped" ? "text-blue-500" : "text-green-500"} w-32`}>{order.status.charAt(0).toUpperCase() + order.status.slice(1)}</p>
                                <div className="w-fit ">
                                    <p className="font-boldonse">{order.address.receiver_first_name + " " + order.address.receiver_last_name}</p>
                                    <p className="text-sm text-muted">{order.address.receiver_phone_number}</p>
                                </div>
                            <p className="text-muted w-32">{date.toDateString()}</p>
                        </div>
                        )
})}
                </div>
                
            </div>
        </div>
    )
}