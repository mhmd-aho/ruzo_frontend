"use server"
import { cookies } from "next/headers";
import { AddressFormSchema, AdminSignInSchema, ProductInputSchema, ProductVaraintInputSchema } from "@/lib/schemas";
import { CACHE_TAGS, withCacheTags } from "@/lib/cache-tags";
import { revalidateCartCache, revalidateOrderCaches, revalidateProductCaches } from "@/lib/revalidate";
import { z } from "zod";

type addressFormType = z.infer<typeof AddressFormSchema>
// get variant
const getVariant = async (id: number, selectedColor: string, selectedSize: string) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}products/${id}/variants/?color=${selectedColor}&size=${selectedSize}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        cache: "no-store",
    });
    const data = await res.json();
    return data;
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
    
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}cart/`, {
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

    revalidateCartCache();
    revalidateProductCaches(id);

    return { success: true, message: data.message || "Item added to cart" };
}

export const getCartItems = async () =>{
    const cookieStore = await cookies();
    const cookieHeader = cookieStore.getAll().map(c => `${c.name}=${c.value}`).join('; ');

    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}cart/`, {
        method: "GET",
        headers: { 
            "Content-Type": "application/json",
            "Cookie": cookieHeader,
        },
        ...withCacheTags(CACHE_TAGS.cart),
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

    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}cart/cartitem/${id}/`, {
        method: "DELETE",
        headers: { 
            "Content-Type": "application/json",
            "Cookie": cookieHeader,
        },
    });

    if (!res.ok) {
        let errorMsg = "Failed to delete item from cart";
        try {
            const data = await res.json();
            errorMsg = data.error || errorMsg;
        } catch {
            // ignore
        }
        return { success: false, error: errorMsg };
    }

    let message = "Item deleted from cart";
    if (res.status !== 204) {
        try {
            const data = await res.json();
            message = data.message || message;
        } catch {
            // ignore
        }
    }
    revalidateCartCache();
    return { success: true, message };
}
export const updateCartItemQuantity = async (id: number, action: 'increase' | 'decrease') => {
    
    const cookieStore = await cookies();
    const cookieHeader = cookieStore.getAll().map(c => `${c.name}=${c.value}`).join('; ');

    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}cart/cartitem/${id}/?action=${action}`, {
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
    revalidateCartCache();
    return {success:true,message:data.message || "Item updated from cart"};
}

// get wakilni areas
export const getWakilniAreas = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}order/get-areas/`, {
        method: "GET",
        headers: { 
            "Content-Type": "application/json",
        },
        ...withCacheTags(CACHE_TAGS.areas),
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
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}order/checkout/`, {
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
    revalidateCartCache();
    revalidateOrderCaches();
    return {success:true,message:result.message || "Order placed successfully"};
}
export const getCategories = async () => {
    try {
        const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}products/categories/`;
    
        const res = await fetch(url, {
            ...withCacheTags(CACHE_TAGS.categories),
        });
        if (!res.ok) {
            const contentType = res.headers.get("content-type");
            let errorMsg = "Failed to get categories";
            if (contentType && contentType.includes("application/json")) {
                const errorData = await res.json();
                errorMsg = errorData.error || errorMsg;
            }
            return { success: false, error: errorMsg };
        }
        const data = await res.json();
        return { success: true, data: data };
    } catch (err) {
        return { success: false, error: err instanceof Error ? err.message : "Failed to get categories" };
    }
}
export const getColors = async () => {
    try {
        const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}products/colors/`;

        const res = await fetch(url, {
            ...withCacheTags(CACHE_TAGS.colors),
        });
        if (!res.ok) {
            const contentType = res.headers.get("content-type");
            let errorMsg = "Failed to get colors";
            if (contentType && contentType.includes("application/json")) {
                const errorData = await res.json();
                errorMsg = errorData.error || errorMsg;
            }
            return { success: false, error: errorMsg };
        }
        const data = await res.json();
        return { success: true, data: data };
    } catch (err) {
        return { success: false, error: err instanceof Error ? err.message : "Failed to get colors" };
    }
}
export const getSizes = async () => {
    try {
        const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}products/sizes/`;
        const res = await fetch(url, {
            ...withCacheTags(CACHE_TAGS.sizes),
        });
        if (!res.ok) {
            const contentType = res.headers.get("content-type");
            let errorMsg = "Failed to get sizes";
            if (contentType && contentType.includes("application/json")) {
                const errorData = await res.json();
                errorMsg = errorData.error || errorMsg;
            }
            return { success: false, error: errorMsg };
        }
        const data = await res.json();
        return { success: true, data: data };
    } catch (err) {
        return { success: false, error: err instanceof Error ? err.message : "Failed to get sizes" };
    }
}

export const getBestSellers = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}products/?sort=best_selling`, withCacheTags(CACHE_TAGS.bestSellers, CACHE_TAGS.products))
    const data = await res.json();
    if(!res.ok){
        return {success:false,error:data.error || "Failed to get best sellers"};
    }
    const bestThree = data.results.slice(0, 3);
    return {success:true,data:bestThree};
}
export const getSearchResults = async (input:string) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}products/?search=${input}`, withCacheTags(CACHE_TAGS.search, CACHE_TAGS.products))
    const data = await res.json();
    if(!res.ok){
        return {success:false,error:data.error || "Failed to get search results"};
    }
    return {success:true,data:data.results};
}
export const adminLogin = async (data:z.infer<typeof AdminSignInSchema>) => {
    try{
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}login/`, {
            method: "POST",
            headers: { 
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify(data),
        });
        
        const contentType = res.headers.get("content-type");
        let result: any;
        if (contentType && contentType.includes("application/json")) {
            result = await res.json();
        } else {
            return {success:false,error:`Server returned non-JSON response (${res.status})`};
        }

        if(!res.ok){
            const errorMsg = result.error || 
                             (result.non_field_errors && result.non_field_errors[0]) || 
                             (result.username && `Username: ${result.username[0]}`) ||
                             (result.password && `Password: ${result.password[0]}`) ||
                             "Failed to login";
            return {success:false,error:errorMsg};
        }
        const cookieStore = await cookies();
        cookieStore.set("admin_token", result.token, { maxAge: 60 * 60 * 24 * 7, httpOnly: true });
        if(result.is_superuser){
            return {success:true,data:result};
        }else{
            return {success:false,error:"You are not authorized to login as admin"};
        }
    }catch(err){
        return {success:false,error: err instanceof Error ? err.message : "Failed to login"};
    }
}
export const getAdminProducts = async () => {
    const cookieStore = await cookies();
    const token = cookieStore.get("admin_token");
    if(!token){
        return {success:false,error:"Admin token not found"};
    }
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}products/`,{
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Token ${token.value}`,
        },
        cache: "no-store",
    })
    const data = await res.json();
    if(!res.ok){
        return {success:false,error:data.error || "Failed to get products"};
    }
    return {success:true,data:data.results};
}
export async function createProductWithVariants(productData: ProductInputSchema, variantsData: ProductVaraintInputSchema[]) {
    try {
        // 1. Get the admin token securely from the server session cookies
        const cookieStore = await cookies();
        const token = cookieStore.get("admin_token")?.value;
        if (!token) {
            return { success: false, error: "Unauthorized: Missing admin access token." };
        }

        // 2. Create the parent Base Product in Django
        const productResponse = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}products/create/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${token}`,
            },
            body: JSON.stringify(productData),
        });

        if (!productResponse.ok) {
            const errDetails = await productResponse.json();
            return { success: false, error: "Failed to create base product", details: errDetails };
        }

        const newProduct = await productResponse.json();
        const newProductId = newProduct.id; // Grab the newly generated database ID

        // 3. Fire parallel creation posts for all the generated combinations
        const variantPromises = variantsData.map((variant) => {
            return createVariant(newProductId, {
                color_id: variant.color_id,
                size_id: variant.size_id,
                quantity: variant.quantity,
            });
        });

        const variantResults = await Promise.all(variantPromises);

        const anyFailed = variantResults.some(res => !res.success);
        if (anyFailed) {
            revalidateProductCaches(newProductId);
            return { 
                success: true, 
                warning: "Product was created, but some variants failed to register correctly.",
                productId: newProductId 
            };
        }

        revalidateProductCaches(newProductId);
        return { success: true, productId: newProductId };

    } catch (error) {
        return { success: false, error: error instanceof Error ? error.message : "An unexpected network error occurred." };
    }
}

export async function createVariant(productId: number, variant: { color_id: number; size_id: number; quantity: number }) {
    const cookieStore = await cookies();
    const token = cookieStore.get("admin_token")?.value;
    if (!token) {
        return { success: false, error: "Unauthorized: Missing admin access token." };
    }
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}products/variants/create/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${token}`,
            },
            body: JSON.stringify({
                product_id: productId,
                color_id: variant.color_id,
                size_id: variant.size_id,
                quantity: variant.quantity,
            }),
        });
        const data = await res.json();
        if (!res.ok) {
            return { success: false, error: data.error || "Failed to create variant" };
        }
        revalidateProductCaches(productId);
        return { success: true, data };
    } catch (error) {
        return { success: false, error: error instanceof Error ? error.message : "Failed to create variant due to network error." };
    }
}

export async function updateVariant(data:ProductVaraintInputSchema) {
    const cookieStore = await cookies();
    const token = cookieStore.get("admin_token")?.value;
    if (!token) {
        return { success: false, error: "Unauthorized: Missing admin access token." };
    }
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}products/variants/${data.id}/update/`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${token}`,
            },
            body: JSON.stringify(data),
        });
        const result = await res.json();
        if (!res.ok) {
            return { success: false, error: result.error || "Failed to update variant" };
        }
        revalidateProductCaches(data.product_id);
        return { success: true, data };
    } catch (error) {
        return { success: false, error: error instanceof Error ? error.message : "Failed to update variant due to network error." };
    }
}

export const updateProduct = async (id:number, data:ProductInputSchema) => {
    const cookieStore = await cookies();
    const token = cookieStore.get("admin_token")?.value;
    if(!token){
        return {success:false,error:"Admin token not found"};
    }
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}products/${id}/update`,{
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Token ${token}`,
        },
        body: JSON.stringify(data),
    })
    const result = await res.json();
    if(!res.ok){
        return {success:false,error:result.error || "Failed to update product"};
    }
    revalidateProductCaches(id);
    return {success:true,data:result};
}
export const deleteOrder = async (orderId:string,reason:string) => {
    const cookieStore = await cookies();
    const token = cookieStore.get("admin_token")?.value;
    if(!token){
        return {success:false,error:"Admin token not found"};
    }
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}order/${orderId}/`,{
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Token ${token}`,
        },
        body: JSON.stringify({ reason }),
    })
    const result = await res.json();
    if(!res.ok){
        return {success:false,error:result.error || "Failed to delete order"};
    }
    revalidateOrderCaches(orderId);
    return {success:true,data:result};
}
export const logout = async () => {
    const cookieStore = await cookies();
    const token = cookieStore.get("admin_token")?.value;
    if(!token){
        return {success:false,error:"Admin token not found"};
    }
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}logout/`,{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Token ${token}`,
        },
    })
    const result = await res.json();
    if(!res.ok){
        return {success:false,error:result.error || "Failed to logout"};
    }
    cookieStore.delete("admin_token");
    return {success:true,data:result};
}

export async function createProductMedia(productId: number, colorId: number, mediaUrl: string) {
    const cookieStore = await cookies();
    const token = cookieStore.get("admin_token")?.value;
    if (!token) {
        return { success: false, error: "Unauthorized: Missing admin access token." };
    }

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}products/media/create/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${token}`,
            },
            body: JSON.stringify({
                product_id: productId,
                color_id: colorId,
                media_url: mediaUrl,
            }),
        });

        if (!res.ok) {
            const data = await res.json();
            return { success: false, error: data.error || "Failed to create product media" };
        }

        revalidateProductCaches(productId);
        return { success: true };
    } catch {
        return { success: false, error: "Network error saving uploaded media." };
    }
}

export const closeBulk = async () => {
    const cookieStore = await cookies();
    const token = cookieStore.get("admin_token")?.value;
    if(!token){
        return {success:false,error:"Admin token not found"};
    }
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}order/close-bulk/`, {
            method: "POST",
            headers: { 
                "Content-Type": "application/json",
                "Authorization": `Token ${token}`,
            },
        });
        const result = await res.json();
        if(!res.ok){
            return {success:false,error:result.error || result.message || "Failed to close bulk session"};
        }
        return {success:true,message:result.message || "Bulk session successfully closed.", bulk_id: result.bulk_id};
    } catch {
        return {success:false,error:"Failed to close bulk session due to network error."};
    }
}
export const createCategory = async (name: string) => {
    const cookieStore = await cookies();
    const token = cookieStore.get("admin_token")?.value;
    if(!token){
        return {success:false,error:"Admin token not found"};
    }
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}products/categories/create/`, {
            method: "POST",
            headers: { 
                "Content-Type": "application/json",
                "Authorization": `Token ${token}`,
            },
            body: JSON.stringify({ name }),
        });
        const result = await res.json();
        if(!res.ok){
            return {success:false,error:result.error || "Failed to create category"};
        }
        return {success:true,data:result};
    } catch {
        return {success:false,error:"Failed to create category due to network error."};
    }
}
export const createSize = async (name: string) => {
    const cookieStore = await cookies();
    const token = cookieStore.get("admin_token")?.value;
    if(!token){
        return {success:false,error:"Admin token not found"};
    }
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}products/sizes/create/`, {
            method: "POST",
            headers: { 
                "Content-Type": "application/json",
                "Authorization": `Token ${token}`,
            },
            body: JSON.stringify({ name }),
        });
        const result = await res.json();
        if(!res.ok){
            return {success:false,error:result.error || "Failed to create category"};
        }
        return {success:true,data:result};
    } catch {
        return {success:false,error:"Failed to create category due to network error."};
    }
}