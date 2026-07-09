"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { ColorSchema, ProductSchema } from "@/lib/schemas";
import { createProductMedia } from "@/app/action";
import { FileUploaderRegular } from '@uploadcare/react-uploader/next';
import '@uploadcare/react-uploader/core.css';
import { toast } from "sonner";
export default function AddMedia({ product }: { product: ProductSchema }) {
    const router = useRouter();
    const [selectedColor, setSelectedColor] = useState<string>("");
    const [uploadedUrls, setUploadedUrls] = useState<string[]>([]);
    const [isPending, startTransition] = useTransition();

    const colors = Array.from(product.variants.map((v) => v.color)).filter(
        (c, i, a) => a.findIndex((variantColor) => variantColor.id === c.id) === i
    );
    type UploadedFileEntry = { status: string; cdnUrl?: string | null };
    type UploadCollection = { allEntries: UploadedFileEntry[] };
    const handleUploadChange = (collection: UploadCollection) => {
        const urls = collection.allEntries
            .filter((file) => file.status === "success")
            .map((file) => file.cdnUrl)
            .filter(Boolean) as string[];

        setUploadedUrls(urls);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!selectedColor) {
            toast.error("Please select a color variant group.");
            return;
        }
        if (uploadedUrls.length === 0) {
            toast.error("Please upload at least one media asset.");
            return;
        }

        startTransition(async () => {
            const result = await createProductMedia(
                product.id,
                Number(selectedColor),
                uploadedUrls[0]
            );

            if (result.success) {
                toast.success("Media gallery assets registered successfully!");
                router.replace(`/admin/products`);
            } else {
                toast.error(result.error || "Failed to associate uploaded media to backend parameters.");
            }
        });
    };

    return (
        <div className="max-w-2xl w-full mx-auto my-10 p-8 bg-white border border-muted font-montserrat shadow-sm">
            <header className="border-b border-muted pb-4 mb-6">
                <h1 className="text-3xl font-boldonse uppercase tracking-wider text-black">Upload Gallery Assets</h1>
                <p className="text-sm text-mid mt-2">
                    Assign product presentation imagery variants to target options for <span className="font-bold text-black">{product.name}</span>
                </p>
            </header>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="flex flex-col space-y-1.5">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-mid">Target Variant Color</label>
                    <select
                        value={selectedColor}
                        onChange={(e) => setSelectedColor(e.target.value)}
                        required
                        className="w-full border border-muted h-12 px-3 text-sm bg-white text-black outline-none focus:border-primary transition-all rounded-none appearance-none cursor-pointer"
                    >
                        <option value="">Select Option Target Color...</option>
                        {colors.map((color: ColorSchema) => (
                            <option key={color.id} value={color.id}>
                                {color.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="flex flex-col space-y-2">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-mid">Media Content Files</label>
                    <div className="p-6 bg-neutral-50 border border-dashed border-muted">
                        <FileUploaderRegular
                            pubkey={process.env.NEXT_PUBLIC_UPLOADCARE_PUBLIC_KEY as string}
                            onChange={handleUploadChange}
                            imgOnly={true}
                            multiple={true}
                            sourceList="local,url,camera"
                            className="uc-light uc-custom"
                            imageShrink="1600x1600 40%"
                        />
                    </div>
                </div>

                {uploadedUrls.length > 0 && (
                    <div className="flex items-center space-x-2.5 text-xs font-semibold uppercase tracking-wider text-primary bg-primary/5 border border-primary/20 p-4">
                        <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
                        <span>Ready Queue: {uploadedUrls.length} file(s) staged safely.</span>
                    </div>
                )}

                <div className="pt-6 border-t border-muted flex justify-end">
                    <button
                        type="submit"
                        disabled={isPending}
                        className="px-8 py-4 bg-primary hover:bg-black text-white font-montserrat text-sm uppercase tracking-widest font-bold transition-all duration-300 disabled:opacity-50 cursor-pointer rounded-none"
                    >
                        {isPending ? "Syncing Media..." : "Save and Commit Media"}
                    </button>
                </div>
            </form>
        </div>
    );
}