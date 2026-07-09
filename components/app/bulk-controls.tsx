"use client";

import { useTransition } from "react";
import { toast } from "sonner";
import { closeBulk } from "@/app/action";

export default function BulkControls() {
    const [isPending, startTransition] = useTransition();

    const handleCloseBulk = () => {
        startTransition(async () => {
            const res = await closeBulk();
            if (res.success) {
                toast.success(res.message + (res.bulk_id ? ` (ID: ${res.bulk_id})` : ""));
            } else {
                toast.error(res.error || "Failed to close bulk session.");
            }
        });
    };

    return (
        <div className="flex flex-col gap-6 h-full justify-between p-2 font-montserrat">
            <div>
                <h1 className="font-boldonse text-xl">Wakilni Bulk</h1>
                <p className="text-xs text-mid mt-1.5 uppercase tracking-wider font-semibold">
                    Manage daily delivery batch logistics
                </p>
            </div>
            
            <div className="flex flex-col gap-3">
                <button
                    onClick={handleCloseBulk}
                    disabled={isPending}
                    type="button"
                    className="w-full h-12 bg-primary text-white hover:bg-black font-bold text-xs uppercase tracking-widest transition-all duration-300 rounded-none cursor-pointer disabled:opacity-50"
                >
                    {isPending ? "Processing..." : "Close Daily Bulk"}
                </button>
            </div>

            <div className="text-[10px] text-muted uppercase tracking-wider leading-relaxed">
                Warning: Bulk sessions group daily orders for Wakilni dispatch. Closing a bulk finalizes all shipments in the current run.
            </div>
        </div>
    );
}
