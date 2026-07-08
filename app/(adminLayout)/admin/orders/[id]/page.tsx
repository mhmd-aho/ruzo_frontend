import { OrderSchema } from "@/lib/schemas";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import DeleteOrderModal from "@/components/app/delete-order-modal";

export default async function OrderDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    let order: OrderSchema | null = null;
    const cookieStore = await cookies();
    const token = cookieStore.get("admin_token");
    
    if (!token) {
        redirect("/admin/signin");
    }

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}order/${id}`, {
            headers: {
                "Authorization": `Token ${token.value}`,
            },
            cache: "no-store",
        });
        const data = await res.json();
        if (res.ok) {
            order = data.data || data;
        }
    } catch (err) {
        console.error(err);
    }

    if (!order) {
        return (
            <div className="min-h-screen bg-white flex flex-col items-center justify-center font-montserrat">
                <p className="text-sm text-mid uppercase font-bold tracking-widest mb-4">Order details could not be resolved.</p>
                <Link 
                    href="/admin/orders" 
                    className="inline-flex items-center justify-center text-xs font-bold uppercase tracking-widest text-primary hover:text-white border border-primary hover:bg-primary px-6 py-3 transition-all duration-300 rounded-none"
                >
                    Back to Orders
                </Link>
            </div>
        );
    }

    const date = new Date(order.created_at);

    return (
        <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8 font-montserrat">
            <div className="max-w-4xl mx-auto bg-white border border-muted p-8 shadow-sm flex flex-col gap-8">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-muted pb-6">
                    <div>
                        <div className="flex items-center gap-3">
                            <h1 className="text-3xl font-boldonse uppercase tracking-wider text-black">Order Summary</h1>
                            <span className={`inline-flex items-center px-3 py-1 border text-xs font-semibold uppercase tracking-wider ${
                                order.status === "pending"
                                    ? "border-yellow-200 bg-yellow-50 text-yellow-700"
                                    : order.status === "shipped"
                                    ? "border-blue-200 bg-blue-50 text-blue-700"
                                    : "border-green-200 bg-green-50 text-green-700"
                            }`}>
                                {order.status}
                            </span>
                        </div>
                        <p className="text-sm text-mid mt-1 font-semibold uppercase tracking-wider">
                            ID Reference: #{id}
                        </p>
                    </div>
                    <div className="flex items-center gap-3 w-full sm:w-auto">
                        <Link 
                            href="/admin/orders" 
                            className="inline-flex items-center justify-center text-xs font-bold uppercase tracking-widest text-black hover:bg-neutral-50 border border-muted px-6 h-12 transition-all duration-300 rounded-none w-full sm:w-auto"
                        >
                            Back
                        </Link>
                        <DeleteOrderModal orderId={id} token={token.value} />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="border border-muted p-6 flex flex-col gap-4">
                        <h2 className="text-sm font-bold tracking-widest text-primary uppercase border-b border-neutral-100 pb-2">
                            Customer Profile
                        </h2>
                        <div className="flex flex-col gap-3 text-sm text-black">
                            <div>
                                <label className="text-[11px] font-bold uppercase tracking-wider text-mid block mb-0.5">Full Name</label>
                                <p className="font-medium uppercase tracking-wide">{order.address.receiver_first_name} {order.address.receiver_last_name}</p>
                            </div>
                            <div>
                                <label className="text-[11px] font-bold uppercase tracking-wider text-mid block mb-0.5">Email Link</label>
                                <p className="font-medium">{order.address.receiver_email || "N/A"}</p>
                            </div>
                            <div>
                                <label className="text-[11px] font-bold uppercase tracking-wider text-mid block mb-0.5">Contact Line</label>
                                <p className="font-medium tracking-wider">{order.address.receiver_phone_number}</p>
                            </div>
                            <div>
                                <label className="text-[11px] font-bold uppercase tracking-wider text-mid block mb-0.5">Payment Method</label>
                                <p className="font-medium uppercase tracking-wide">{order.address.receiver_payment_method === "cash_on_delivery" ? "Cash on Delivery" : "E-Payment"}</p>
                            </div>
                        </div>
                    </div>

                    <div className="border border-muted p-6 flex flex-col gap-4">
                        <h2 className="text-sm font-bold tracking-widest text-primary uppercase border-b border-neutral-100 pb-2">
                            Fulfillment Log
                        </h2>
                        <div className="flex flex-col gap-3 text-sm text-black">
                            <div>
                                <label className="text-[11px] font-bold uppercase tracking-wider text-mid block mb-0.5">Timestamp</label>
                                <p className="font-medium uppercase tracking-wide">
                                    {date.toLocaleDateString("en-US", {
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                        hour: "2-digit",
                                        minute: "2-digit"
                                    })}
                                </p>
                            </div>
                            <div>
                                <label className="text-[11px] font-bold uppercase tracking-wider text-mid block mb-0.5">Destination Route</label>
                                <p className="font-medium text-xs uppercase tracking-wide leading-relaxed">
                                    {order.address.receiver_area}
                                    <br />
                                    Building {order.address.receiver_building}, Floor {order.address.receiver_floor}
                                    <br />
                                    {order.address.receiver_directions}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-4">
                    <h3 className="text-xl font-boldonse uppercase tracking-wider text-black">Manifest Summary</h3>
                    <div className="overflow-x-auto border border-muted bg-white">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-muted bg-black text-white text-xs uppercase tracking-widest font-montserrat">
                                    <th className="py-4 px-6 font-semibold">Product Meta</th>
                                    <th className="py-4 px-6 font-semibold text-center">Unit Matrix</th>
                                    <th className="py-4 px-6 font-semibold text-center">Volume</th>
                                    <th className="py-4 px-6 font-semibold text-right">Total Net</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-muted text-sm text-black">
                                {order.items?.map((item) => (
                                    <tr key={item.id} className="hover:bg-neutral-50/70 transition-colors">
                                        <td className="py-4 px-6">
                                            <div className="flex flex-col">
                                                <span className="font-boldonse uppercase tracking-wide text-xs text-black">
                                                    {item.product_name || "Product Item"}
                                                </span>
                                                <span className="text-[11px] text-mid mt-1 font-semibold uppercase tracking-widest flex items-center gap-2">
                                                    Size: {item.size_name || "OS"} 
                                                    <span className="w-1.5 h-1.5 rounded-full bg-neutral-300" />
                                                    Color: {item.color_name || "Default"}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="py-4 px-6 text-center font-medium text-xs tracking-wider">
                                            ${item.price}
                                        </td>
                                        <td className="py-4 px-6 text-center font-bold text-xs tracking-wider">
                                            {item.quantity}
                                        </td>
                                        <td className="py-4 px-6 text-right font-boldonse text-xs tracking-wider text-primary">
                                            ${(Number(item.price) * Number(item.quantity)).toFixed(2)}
                                        </td>
                                    </tr>
                                )) || (
                                    <tr>
                                        <td colSpan={4} className="py-8 text-center text-xs uppercase font-bold text-mid tracking-widest">
                                            No explicit item lines itemized in record.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                    
                    <div className="flex justify-end mt-2">
                        <div className="w-full sm:w-72 border border-muted p-5 flex flex-col gap-3">
                            <div className="flex justify-between items-center text-xs uppercase tracking-wider font-semibold text-mid">
                                <span>Gross Allocation</span>
                                <span>${order.total_price}</span>
                            </div>
                            <div className="flex justify-between items-center text-xs uppercase tracking-wider font-semibold text-mid border-b border-neutral-100 pb-3">
                                <span>Logistics Tariff</span>
                                <span>$0.00</span>
                            </div>
                            <div className="flex justify-between items-center pt-1">
                                <span className="text-xs uppercase tracking-widest font-bold text-black">Aggregate Net</span>
                                <span className="text-lg font-boldonse text-primary">${order.total_price}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}