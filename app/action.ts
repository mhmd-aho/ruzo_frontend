"use server"
import { cookies } from "next/headers";
import { AddressFormSchema } from "@/lib/schemas";
import { z } from "zod";
type addressFormType = z.infer<typeof AddressFormSchema>
// get variant
const getVariant = async (id: number, selectedColor: string, selectedSize: string) => {
    const res = await fetch(`${process.env.BACKEND_URL}products/${id}/variants/?color=${selectedColor}&size=${selectedSize}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        cache: "no-store",
    });
    const data = await res.json();
    return data;
}

export const getVariantImage = async (id: number) => {
    const res = await fetch(`${process.env.BACKEND_URL}products/${id}/media/`,{
        headers: {
            "Content-Type": "application/json",
        },
        cache: "no-store",
    })
    const data = await res.json();
    if(!res.ok){
        throw new Error("Failed to fetch product variant image")
    }
    return data[0].media_url;
}
// handle submit 
export const addToCart = async (id: number, selectedColor: string, selectedSize: string, quantity: number) => {
    if (!selectedColor || !selectedSize) {
        return { success: false, error: "Missing color or size selection" };
    }
    
    const variantList = await getVariant(id, selectedColor, selectedSize);
    if (!variantList || variantList.length <= 0) {
        return { success: false, error: "Variant not found" };
    }
    
    const variant = variantList[0];
    const cookieStore = await cookies();
    const cookieHeader = cookieStore.getAll().map(c => `${c.name}=${c.value}`).join('; ');
    
    const res = await fetch(`${process.env.BACKEND_URL}cart/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Cookie": cookieHeader,
        },
        body: JSON.stringify({
            variant_id: variant?.id,
            quantity: quantity,
        })
    });

    const setCookies = res.headers.getSetCookie();
    if (setCookies && setCookies.length > 0) {
        for (const cookieStr of setCookies) {
            const parts = cookieStr.split(';');
            const nameValue = parts[0];
            const [name, ...valueParts] = nameValue.split('=');
            const value = valueParts.join('=');
            
            let maxAge: number | undefined = undefined;
            for (let i = 1; i < parts.length; i++) {
                const part = parts[i].trim();
                if (part.toLowerCase().startsWith('max-age=')) {
                    maxAge = parseInt(part.split('=')[1], 10);
                }
            }
            
            cookieStore.set(name.trim(), value.trim(), maxAge ? { maxAge } : undefined);
        }
    }

    const data = await res.json();

    // Return a plain object instead of the raw 'res' object
    if (!res.ok) {
        return { success: false, error: data.error || "Failed to add item to cart" };
    }

    return { success: true, message: data.message || "Item added to cart" };
}

export const getCartItems = async () =>{
    const cookieStore = await cookies();
    const cookieHeader = cookieStore.getAll().map(c => `${c.name}=${c.value}`).join('; ');

    const res = await fetch(`${process.env.BACKEND_URL}cart/`, {
        method: "GET",
        headers: { 
            "Content-Type": "application/json",
            "Cookie": cookieHeader,
        },
        cache: "no-store",
    });
    const data = await res.json();
    if(!res.ok){
        return {success:false,error:data.error || "Failed to get cart items"};
    }
    return {success:true,data:data.items,total:data.cart_total};
}
export const deleteItemFromCart = async (id: number) => {
    
    const cookieStore = await cookies();
    const cookieHeader = cookieStore.getAll().map(c => `${c.name}=${c.value}`).join('; ');

    const res = await fetch(`${process.env.BACKEND_URL}cart/cartitem/${id}/`, {
        method: "DELETE",
        headers: { 
            "Content-Type": "application/json",
            "Cookie": cookieHeader,
        },
    });
    const data = await res.json();
    if(!res.ok){
        return {success:false,error:data.error || "Failed to delete item from cart"};
    }
    return {success:true,message:data.message || "Item deleted from cart"};
}
export const updateCartItemQuantity = async (id: number, action: 'increase' | 'decrease') => {
    
    const cookieStore = await cookies();
    const cookieHeader = cookieStore.getAll().map(c => `${c.name}=${c.value}`).join('; ');

    const res = await fetch(`${process.env.BACKEND_URL}cart/cartitem/${id}/?action=${action}`, {
        method: "PATCH",
        headers: { 
            "Content-Type": "application/json",
            "Cookie": cookieHeader,
        },
    });
    const data = await res.json();
    if(!res.ok){
        return {success:false,error:data.error || "Failed to update item from cart"};
    }
    return {success:true,message:data.message || "Item updated from cart"};
}

// get wakilni areas
export const getWakilniAreas = async () => {
    const res = await fetch(`${process.env.BACKEND_URL}order/get-areas/`, {
        method: "GET",
        headers: { 
            "Content-Type": "application/json",
        },
        cache: "no-store",
    });
    const data = await res.json();
    if(!res.ok){
        return {success:false,error:data.error || "Failed to get areas"};
    }
    return {success:true,data:data.data};
}
export const placeOrder = async (data: addressFormType) =>{
    const cookieStore = await cookies();
    const cookieHeader = cookieStore.getAll().map(c => `${c.name}=${c.value}`).join('; ');
    const res = await fetch(`${process.env.BACKEND_URL}order/checkout/`, {
        method: "POST",
        headers: { 
            "Content-Type": "application/json",
            "Cookie": cookieHeader,
        },
        body: JSON.stringify(data),
    });
    const result = await res.json();
    if(!res.ok){
        return {success:false,error:result.error || "Failed to place order"};
    }
    return {success:true,message:result.message || "Order placed successfully"};
}
export const getCategories = async () => {
    const res = await fetch(`${process.env.BACKEND_URL}products/categories/`)
    const data = await res.json();
    if(!res.ok){
        return {success:false,error:data.error || "Failed to get categories"};
    }
    return {success:true,data:data};
}
export const getBestSellers = async () => {
    const res = await fetch(`${process.env.BACKEND_URL}products/?sort=best_selling`)
    const data = await res.json();
    if(!res.ok){
        return {success:false,error:data.error || "Failed to get best sellers"};
    }
    const bestThree = data.results.slice(0, 3);
    return {success:true,data:bestThree};
}
export const getSearchResults = async (input:string) => {
    const res = await fetch(`${process.env.BACKEND_URL}products/?search=${input}`)
    const data = await res.json();
    if(!res.ok){
        return {success:false,error:data.error || "Failed to get search results"};
    }
    return {success:true,data:data.results};
}