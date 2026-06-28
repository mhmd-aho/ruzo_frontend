"use server"

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
    const res = await fetch(`${process.env.BACKEND_URL}cart/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            variant_id: variant?.id,
            quantity: quantity,
        })
    });

    const data = await res.json();

    // Return a plain object instead of the raw 'res' object
    if (!res.ok) {
        return { success: false, error: data.error || "Failed to add item to cart" };
    }

    return { success: true, message: data.message || "Item added to cart" };
}