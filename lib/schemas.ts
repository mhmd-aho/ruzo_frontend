export type ProductSchema = {
    id: number;
    name: string;
    description: string;
    price: number;
    category: string;
    sale:number;
    best_sale:boolean;
}
export type ColorType = {
    id: number;
    name: string;
    color_code:string;
}
export type SizeType = {
    id: number;
    name:string;
}
export type ProductVariantsSchema = ProductSchema & {
    id: number;
    product: number;
    size: SizeType;
    color: ColorType;
    quantity: number;
    
}
export type MediaType = {
    id: number;
    media_url:string;
    product_variant:ProductVariantsSchema;
}
