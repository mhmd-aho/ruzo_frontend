import Link from "next/link";
import { getAdminProducts } from "@/app/action";
import ItemCard from "@/components/app/item-card";
import { ProductSchema } from "@/lib/schemas";
import Plus from "@/components/svg/plus";
import AddPopup from "@/components/app/add-popup";

export default async function AdminProducts(){
    let products:ProductSchema[] = [];
    try {
        const data = await getAdminProducts();
        if (data.success) {
            products = data.data;
        }
    } catch (error) {
        console.log(error);
    }
    return (
        <div className="flex flex-col justify-center items-center ">
            <div className="flex flex-col gap-4 w-full p-4">
            <h1 className="lg:text-2xl text-lg font-boldonse">Products</h1>
            <div className="flex justify-between">
                <Link className="lg:px-4 lg:py-2 py-1 px-2 bg-primary text-white rounded-md flex items-center lg:gap-2 gap-1 max-lg:text-xs" href="/admin/products/add"><Plus fill="white"/>New Product</Link>
                <AddPopup type="Category"/>
                <AddPopup type="Size"/>
            </div>
            </div>
            <div className="flex justify-between items-center flex-wrap lg:p-10 p-4">
                {products.map((product: ProductSchema) => (
                    <ItemCard key={product.id} product={product} admin={true} />
                ))}
            </div>
        </div>
    )
}