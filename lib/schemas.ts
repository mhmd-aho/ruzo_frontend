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
    receiver_payment_method: z.enum(['cash_on_delivery', 'e_payment'], {
        message: "Please select a payment method",
    }),
})
export const AdminSignInSchema = z.object({
    username: z.string().min(3, "Username is too short"),
    password: z.string().min(8, "Password is too short"),
})
export type ProductSchema = {
    id: number;
    name: string;
    description: string;
    price: number;
    category: CategorySchema;
    sale:number;
    best_seller:boolean;
    variants:ProductVariantsSchema[];
    default_img:ProductMediaSchema;
}
export type ColorSchema = {
    id: number;
    name: string;
    color_code:string;
}
export type ProductMediaSchema = {
    id: number;
    product: ProductSchema;
    color: ColorSchema;
    media_url: string;
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
export type CartItemSchema = {
    id: number;
    cart_id:number;
    product_variant:ProductVariantsSchema;
    quantity: number;
    item_total: number;
}


export type CategorySchema = {
    id: number;
    name: string 
}
export type OrderItemSchema = {
    id: number;
    order?: number;
    product_variant?: ProductVariantsSchema;
    product_name?: string;
    size_name?: string;
    color_name?: string;
    price?: number;
    quantity: number;
}
export type OrderSchema = {
    id: number;
    status: "pending"|"shipped"|"delivered";
    created_at: string;
    total_price: number;
    items: OrderItemSchema[];
    address: z.infer<typeof AddressFormSchema>;
    barcode?: string;
}
export type ProductInputSchema = {
    name: string;
    description: string;
    price: number;
    category_id: number;
    best_seller: boolean;
}
export type ProductVaraintInputSchema ={
    id: number;
    color_id: number;
    size_id: number;
    quantity: number;
    product_id: number;
}
