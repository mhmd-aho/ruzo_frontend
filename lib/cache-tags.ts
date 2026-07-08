export const CACHE_REVALIDATE_SECONDS = 3600;

export const CACHE_TAGS = {
    products: "products",
    product: (id: number | string) => `product-${id}`,
    productMedia: (id: number | string) => `product-media-${id}`,
    categories: "categories",
    colors: "colors",
    sizes: "sizes",
    bestSellers: "best-sellers",
    search: "search",
    orders: "orders",
    order: (id: string) => `order-${id}`,
    cart: "cart",
    areas: "areas",
} as const;

export function withCacheTags(...tags: string[]) {
    return { next: { tags, revalidate: CACHE_REVALIDATE_SECONDS } };
}
