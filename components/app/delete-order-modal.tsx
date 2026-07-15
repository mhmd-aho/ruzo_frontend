"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { deleteOrder } from "@/app/action";

interface DeleteOrderModalProps {
    orderId: string;
    token: string;
}

export default function DeleteOrderModal({ orderId, token }: DeleteOrderModalProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    const handleDelete = async (e: React.FormEvent) => {
        e.preventDefault();
        startTransition(async () => {
            try {
                const res = await deleteOrder(orderId);
                if (res.success) {
                    toast.success("Order deployment cancelled successfully.");
                    setIsOpen(false);
                    router.push("/admin/orders");
                    router.refresh();
                } else {
                    toast.error(res.error || "Failed to cancel order.");
                }
            } catch (err) {
                toast.error("An interface execution fault manifested.");
            }
        });
    };

    return (
        <>
            <button
                type="button"
                onClick={() => setIsOpen(true)}
                className="inline-flex items-center justify-center px-6 h-12 border border-primary text-primary hover:bg-primary hover:text-white font-montserrat text-xs uppercase tracking-widest font-bold transition-all duration-300 rounded-none cursor-pointer w-full sm:w-auto"
            >
                Cancel Order
            </button>

            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center font-montserrat">
                    <div 
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        onClick={() => !isPending && setIsOpen(false)}
                    />
                    
                    <div className="relative bg-white border border-muted p-8 shadow-xl max-w-md w-full mx-4 flex flex-col gap-6 animate-fade-in z-10">
                        <div>
                            <h3 className="text-xl font-boldonse uppercase tracking-wider text-black">Revoke Authorization</h3>
                            <p className="text-xs text-mid mt-1.5 font-semibold uppercase tracking-wider leading-relaxed">
                                Confirm terminal action criteria regarding Order allocation reference sequence #{orderId}.
                            </p>
                        </div>

                        <form onSubmit={handleDelete} className="flex flex-col gap-5">
                            <div className="flex flex-col">
                                <p className="text-black text-md">Are you sure you want to cancel this order?</p>
                            </div>

                            <div className="flex items-center justify-end gap-3 pt-2">
                                <button
                                    type="button"
                                    disabled={isPending}
                                    onClick={() => setIsOpen(false)}
                                    className="px-5 h-11 border border-muted text-black hover:bg-neutral-50 text-xs uppercase tracking-widest font-bold rounded-none cursor-pointer disabled:opacity-50 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={isPending}
                                    className="px-5 h-11 bg-primary text-white hover:bg-black text-xs uppercase tracking-widest font-bold rounded-none cursor-pointer disabled:opacity-30 transition-all"
                                >
                                    Confirm
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}