
import AddMedia from "@/components/app/add-media"
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
export default async function AddMediaPage({params}:{params:{id:string}}) {
   const {id} = await params;
   let product = null
   const cookieStore = await cookies();
   const token = cookieStore.get("admin_token")?.value;
   if(!token){
    return redirect("/admin/signin");
   }
   try{
     const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/products/${id}`)
     product = await res.json();
   }catch(err){
    return (
        <div>
            <h1>Add Media</h1>
            <p>Something went wrong</p>
        </div>
    )
   }
    return (
        <div className="flex flex-col items-center justify-center">
        <AddMedia product={product} token={token}/>
        </div>
    )
}
