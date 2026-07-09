import { updateTag } from "next/cache";
import { CACHE_TAGS } from "@/lib/cache-tags";

export function revalidateProductCaches(productId?: number | string) {
    updateTag(CACHE_TAGS.products);
    updateTag(CACHE_TAGS.bestSellers);
    updateTag(CACHE_TAGS.search);
    if (productId != null) {
        updateTag(CACHE_TAGS.product(productId));
        updateTag(CACHE_TAGS.productMedia(productId));
    }
}

export function revalidateCartCache() {
    updateTag(CACHE_TAGS.cart);
}

export function revalidateOrderCaches(orderId?: string) {
    updateTag(CACHE_TAGS.orders);
    if (orderId) {
        updateTag(CACHE_TAGS.order(orderId));
    }
}
