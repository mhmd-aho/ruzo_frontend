import { z } from "zod";

export const AddressFormSchema = z.object({
    receiver_first_name: z.string().min(3, "First name is required"),
    receiver_last_name: z.string().min(3, "Last name is required"),
    receiver_email: z.string().email("Invalid email"),
    receiver_phone_number: z.string().min(1, "Phone number is required").regex(/^\+?[0-9]+$/, "Invalid phone number"),
    receiver_secondary_phone_number: z.string().regex(/^\+?[0-9]+$/, "Invalid phone number").optional().or(z.literal('')),
    receiver_gender: z.enum(['1', '2']),
    receiver_area: z.string(),
    receiver_building: z.string().min(1, "Building is required"),
    receiver_floor: z.string().min(1, "Floor is required"),
    receiver_directions: z.string().min(5, "Address Details is required"),
})
export type ProductSchema = {
    id: number;
    name: string;
    description: string;
    price: number;
    category: string;
    sale:number;
    best_sale:boolean;
}
export type ColorSchema = {
    id: number;
    name: string;
    color_code:string;
}
export type SizeSchema = {
    id: number;
    name:string;
}
export type ProductVariantsSchema = {
    id: number;
    product: ProductSchema;
    size: SizeSchema;
    color: ColorSchema;
    quantity: number;
    
}
export type MediaSchema = {
    id: number;
    media_url:string;
    product_variant:ProductVariantsSchema;
}
export type CartItemSchema = {
    id: number;
    cart_id:number;
    product_variant:ProductVariantsSchema;
    quantity: number;
    item_total: number;
}
export type areaSchema = {
    district_id: number;
    district_name: string;
    governorate_id: number;
    governorate_name: string;
    id: number;
    is_confirmation_required: boolean;
    is_hidden: boolean;
    latitude: number;
    longitude: number;
    name: string;
    name_ar: string;
    name_en: string;
    office: {
        code: string;
        id: number;
        name: string;
    }
} 
export type categorySchema = {
    id: number;
    name: string 
}