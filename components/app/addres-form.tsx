'use client'
import Input from "@/components/input/text-input";
import BackArrow from "@/components/svg/back-arrow";
import { useForm,Controller } from "react-hook-form";
import { useEffect, useState,useTransition } from "react";
import {getWakilniAreas} from "@/app/action";
import { areaSchema,AddressFormSchema  } from "@/lib/schemas";
import {zodResolver} from "@hookform/resolvers/zod"
import { placeOrder } from "@/app/action";
import { z } from "zod";
type addressFormType = z.infer<typeof AddressFormSchema>
export default function AddressForm(){
  const [isPending,startTransition] = useTransition();
  const [areas,setAreas] = useState<areaSchema[]>([]);
   useEffect(() => {
      const getAreas = async () => {
         const result = await getWakilniAreas();
         if(result.success){
            setAreas(result.data);
         }
      }
      getAreas();
   },[])
    const form = useForm({
      resolver: zodResolver(AddressFormSchema),
      mode: "onSubmit",
      defaultValues:{
        receiver_first_name:"",
        receiver_last_name:"",
        receiver_phone_number:"",
        receiver_secondary_phone_number:"",
        receiver_gender:"1",
        receiver_area:'',
        receiver_building:"",
        receiver_floor:"",
        receiver_email:"",
        receiver_directions:"",
      }
    })
    const onSubmit = async (data:addressFormType) => {
      startTransition(async () => {
        const res = await placeOrder(data);
        if(res.success){
          alert(res.message);
        }else{
          alert(res.error);
        }
      })
    }
    return(
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-3 w-full lg:w-1/2 lg:pb-20" action="">
          <div className="flex gap-3">
              <Controller
              control={form.control}
              name="receiver_first_name"
              render={({field,fieldState}) => (
                <Input error={fieldState.error?.message} field={field} id="receiver_first_name" name="receiver_first_name" placeholder="First Name"/>
              )}
              />
            <Controller
            control={form.control}
            name="receiver_last_name"
            render={({field,fieldState}) => (
              <Input error={fieldState.error?.message} field={field} id="receiver_last_name" name="receiver_last_name" placeholder="Last Name"/>
            )}
            />
            </div>
            <div className="flex gap-3">
                <Controller
                control={form.control}
                name="receiver_phone_number"
                render={({field,fieldState}) => (
                  <Input error={fieldState.error?.message} field={field} id="receiver_phone_number" name="receiver_phone_number" placeholder="Phone Number"/>
                )}
                />
                <Controller
                control={form.control}
                name="receiver_secondary_phone_number"
                render={({field,fieldState}) => (
                  <Input error={fieldState.error?.message} field={field} id="phonenumber2" name="phonenumber2" placeholder="Phone Number"/>
                )}
                />
            </div>
            <div className="flex gap-3">
                <Controller
                control={form.control}
                name="receiver_gender"
                render={({field,fieldState}) => (
                  <div>
                    <select {...field} id="receiver_gender" name="receiver_gender">
                      <option value="">Gender</option>
                      <option value="1">Male</option>
                      <option value="2">Female</option>
                    </select>
                    {fieldState.error?.message && <p className="text-error">{fieldState.error.message}</p>}
                  </div>
                )}
                />
              <Controller
                control={form.control}
                name="receiver_area"
                render={({field,fieldState}) => (
                  <div>
                    <select {...field} id="receiver_area" name="receiver_area">
                      <option value="">Area</option>
                      {areas.map((area) => (
                          <option key={area.id} value={area.name}>{area.name}</option>
                      ))}
                  </select>
                  {fieldState.error?.message && <p className="text-error">{fieldState.error.message}</p>}
                  </div>
                )}
                />
              </div>
              <div className="flex gap-3">
                <Controller
                control={form.control}
                name="receiver_building"
                render={({field,fieldState}) => (
                  <Input error={fieldState.error?.message} field={field} id="receiver_building" name="receiver_building" placeholder="Building"/>
                )}
                />
                <Controller
                control={form.control}
                name="receiver_floor"
                render={({field,fieldState}) => (
                  <Input error={fieldState.error?.message} field={field} id="receiver_floor" name="receiver_floor" placeholder="Floor"/>
                )}
                />
              </div>
                <Controller
                control={form.control}
                name="receiver_email"
                render={({field,fieldState}) => (
                  <Input error={fieldState.error?.message} field={field} id="receiver_email" name="receiver_email" placeholder="Email"/>
                )}
                />
                <Controller
                control={form.control}
                name="receiver_directions"
                render={({field,fieldState}) => (
                  <Input error={fieldState.error?.message} field={field} id="receiver_directions" name="receiver_directions" placeholder="Address Details"/>

                )}
                />
               <div className="flex flex-col gap-2">
                    <h2 className="text-lg">Payment method</h2>
                    <div className="flex justify-between border-2 border-mid p-3">
                            <label htmlFor="cash-on-delivery">Cash on Delivery</label>
                            <input className="size-5 checked:bg-primary rounded-full border border-muted appearance-none" type="radio" name="shipping" id="cash-on-delivery" />
                    </div>
                    <div className="flex justify-between border-2 border-mid p-3 opacity-50">
                            <label htmlFor="e-payment">E-payment</label>
                            <input disabled={true} className="size-5 checked:bg-primary rounded-full border border-muted appearance-none" type="radio" name="shipping" id="e-payment" />
                    </div>
               </div>
               <div className="lg:w-full flex justify-between max-lg:absolute max-lg:bottom-20 w-11/12">
                <button className="text-primary flex justify-center items-center gap-2"><BackArrow/> Return to Cart</button>
                <button disabled={isPending} type="submit" className={`text-white bg-primary px-5 py-1 ${isPending?'opacity-50':''}`}>{isPending ? 'Placing Order...' : 'Place Order'}</button>
               </div>
           </form>
    )
}