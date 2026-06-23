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
export type ProductVariantsSchema = ProductSchema & {
    id: number;
    product: number;
    size: number;
    color: ColorType;
    quantity: number;
    
}
