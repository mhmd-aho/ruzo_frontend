import { revalidateTag } from "next/cache";
import { CACHE_TAGS } from "@/lib/cache-tags";

const REVALIDATE_PROFILE = "max" as const;

export function revalidateProductCaches(productId?: number | string) {
    revalidateTag(CACHE_TAGS.products, REVALIDATE_PROFILE);
    revalidateTag(CACHE_TAGS.bestSellers, REVALIDATE_PROFILE);
    revalidateTag(CACHE_TAGS.search, REVALIDATE_PROFILE);
    if (productId != null) {
        revalidateTag(CACHE_TAGS.product(productId), REVALIDATE_PROFILE);
        revalidateTag(CACHE_TAGS.productMedia(productId), REVALIDATE_PROFILE);
    }
}

export function revalidateCartCache() {
    revalidateTag(CACHE_TAGS.cart, REVALIDATE_PROFILE);
}

export function revalidateOrderCaches(orderId?: string) {
    revalidateTag(CACHE_TAGS.orders, REVALIDATE_PROFILE);
    if (orderId) {
        revalidateTag(CACHE_TAGS.order(orderId), REVALIDATE_PROFILE);
    }
}
