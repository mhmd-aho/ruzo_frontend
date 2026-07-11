import { ProductSchema } from "@/lib/schemas";
import Image from "next/image";
import Link from "next/link";
import { getOptimizedImageUrl } from "@/lib/utils";
export default function SearchResult({item}: {item: ProductSchema}){
    const media = item.default_img.media_url
    return (
        <Link href={`/collections/product/${item.id}`} key={item.id} className="flex gap-2 h-32">
            <div className="h-full w-28 relative">
                {media ? (
                    <Image
                    fill
                    src={getOptimizedImageUrl(media, 224, 256, "scale_crop", "center")}
                    alt={item.name}
                    className="object-center object-cover"
            />
                ) : (
                    <div className="bg-muted animate-pulse h-full w-28"/>
                )}
            </div>
            <div className="flex justify-between items-end flex-1 border-b-2 p-2 mb-2" >
                <div className="flex flex-col">
                    <p className="text-black font-bold">{item.name}</p>
                    <p className="text-mid text-sm">{item.description.slice(0,20)}...</p>
                </div>
                <p className="text-black font-bold">$ {item.price}</p>
                
            </div>
        </Link>
    )
}