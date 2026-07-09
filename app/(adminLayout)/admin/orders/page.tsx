import { cookies } from "next/headers";
import { OrderSchema } from "@/lib/schemas";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function OrdersPage() {
    const cookieStore = await cookies();
    const token = cookieStore.get("admin_token");
    if (!token) {
        redirect("/admin/signin");
    }
    
    let orders: OrderSchema[] = [];
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}order/`, {
            headers: {
                "Authorization": `Token ${token.value}`,
            },
            cache: "no-store",
        });
        if (response.ok) {
            orders = await response.json();
        }
    } catch (error) {
        console.log(error);
    }

    return (
        <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8 font-montserrat">
            <div className="max-w-5xl mx-auto bg-white border border-muted lg:p-8 p-4 shadow-sm flex flex-col gap-8">
                <div className="border-b border-muted pb-6">
                    <h1 className="text-3xl font-boldonse uppercase tracking-wider text-black">Order Management</h1>
                    <p className="text-sm text-mid mt-1 font-semibold uppercase tracking-wider">
                        Total Orders: {orders.length}
                    </p>
                </div>

                {orders.length > 0 ? (
                    <div className="overflow-x-auto border border-muted bg-white">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-muted bg-black text-white text-xs uppercase tracking-widest font-montserrat">
                                    <th className="py-4 px-6 font-semibold">Status</th>
                                    <th className="py-4 px-6 font-semibold">Customer Details</th>
                                    <th className="py-4 px-6 font-semibold">Date Placed</th>
                                    <th className="py-4 px-6 font-semibold text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-muted text-sm text-black">
                                {orders.map((order: OrderSchema) => {
                                    const date = new Date(order.created_at);
                                    return (
                                        <tr key={order.id} className="hover:bg-neutral-50/70 transition-colors">
                                            <td className="py-4 px-6">
                                                <span className={`inline-flex items-center px-3 py-1 border text-xs font-semibold uppercase tracking-wider ${
                                                    order.status === "pending"
                                                        ? "border-yellow-200 bg-yellow-50 text-yellow-700"
                                                        : order.status === "shipped"
                                                        ? "border-blue-200 bg-blue-50 text-blue-700"
                                                        : "border-green-200 bg-green-50 text-green-700"
                                                }`}>
                                                    {order.status}
                                                </span>
                                            </td>
                                            <td className="py-4 px-6">
                                                <div className="flex flex-col">
                                                    <span className="font-boldonse uppercase tracking-wide text-xs text-black">
                                                        {order.address.receiver_first_name} {order.address.receiver_last_name}
                                                    </span>
                                                    <span className="text-xs text-mid mt-0.5 font-medium tracking-wider">
                                                        {order.address.receiver_phone_number}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="py-4 px-6 text-mid text-xs font-medium uppercase tracking-wider">
                                                {date.toLocaleDateString("en-US", {
                                                    year: "numeric",
                                                    month: "short",
                                                    day: "numeric"
                                                })}
                                            </td>
                                            <td className="py-4 px-6 text-right">
                                                <Link
                                                    href={`/admin/orders/${order.id}`}
                                                    className="inline-flex items-center justify-center text-xs font-bold uppercase tracking-widest text-primary hover:text-white border border-primary hover:bg-primary px-4 py-2 transition-all duration-300 rounded-none"
                                                >
                                                    View Details
                                                </Link>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="text-center py-24 border border-dashed border-muted">
                        <p className="text-xs text-mid uppercase font-bold tracking-widest">No customer orders found in the database.</p>
                    </div>
                )}
            </div>
        </div>
    );
}