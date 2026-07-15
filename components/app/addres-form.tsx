'use client'
import Input from "@/components/input/text-input";
import BackArrow from "@/components/svg/back-arrow";
import { useForm,Controller } from "react-hook-form";
import { useEffect, useState,useTransition } from "react";
import {AddressFormSchema  } from "@/lib/schemas";
import {zodResolver} from "@hookform/resolvers/zod"
import { placeOrder } from "@/app/action";
import { z } from "zod";
import Link from "next/link";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
type addressFormType = z.infer<typeof AddressFormSchema>
export default function AddressForm(){
  const [isPending,startTransition] = useTransition();
  const areas = [
    'kuwait',
    'iraq',
    'syria',
    'lebanon',
    'jordan',
    'palestine',
    'egypt',
    'saudi arabia',
    'qatar',
    'bahrain',
    'oman',
    'uae',
    'yemen',
    'tunisia',
    'algeria',
    'libya',
    'morocco',
    'mauritania',
    'somalia',
    'djibouti',
    'eritrea',
    'ethiopia',
    'sudan',
    'south sudan',
    'chad',
    'niger',
    'mali',
    'burkina faso',
    'senegal',
    'gambia',
    'guinea',
    'guinea-bissau',
    'sierra leone',
    'liberia',
    'côte d\'ivoire',
    'ghana',
    'togo',
    'benin',
    'nigeria',
    'cameroon',
    'central african republic',
    'south sudan',
    'dr congo',
    'republic of congo',
    'gabon',
    'equatorial guinea',
    'são tomé and príncipe',
    'angola',
    'zambia',
    'zimbabwe',
    'mozambique',
    'malawi',
    'madagascar',
    'mauritius',
    'seychelles',
    'comoros',
    'tanzania',
    'kenya',
    'uganda',
    'rwanda',
    'burundi',
    'somalia',
    'djibouti',
    'eritrea',
    'ethiopia',
    'south sudan',
    'chad',
    'niger',
    'mali',
    'burkina faso',
    'senegal',
    'gambia',
    'guinea',
    'guinea-bissau',
    'sierra leone',
    'liberia',
    'côte d\'ivoire',
    'ghana',
    'togo',
    'benin',
    'nigeria',
    'cameroon',
    'central african republic',
    'south sudan',
    'dr congo',
    'republic of congo',
    'gabon',
    'equatorial guinea',
    'são tomé and príncipe',
    'angola',
    'zambia',
    'zimbabwe',
    'mozambique',
    'malawi',
    'madagascar',
    'mauritius',
    'seychelles',
    'comoros',
    'tanzania',
    'kenya',
    'uganda',
    'rwanda',
    'burundi',
  ]
  const router = useRouter();
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
        receiver_payment_method:"cash_on_delivery",
      }
    })
    const onSubmit = async (data:addressFormType) => {
      startTransition(async () => {
        const res = await placeOrder(data);
        if(res.success){
          toast.success(res.message);
          window.dispatchEvent(new Event("cart-updated"));
          router.push("/");
        }else{
          toast.error(res.error);
        }
      })
    }
    return(
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-3 w-full lg:w-1/2 lg:pb-20" action="">
          <div className="flex gap-3 w-full">
              <Controller
              control={form.control}
              name="receiver_first_name"
              render={({field,fieldState}) => (
                <div className="w-1/2">
                <Input error={fieldState.error?.message} field={field} id="receiver_first_name" name="receiver_first_name" placeholder="First Name" required={true} type="text"/>
                </div>
              )}
              />
            <Controller
            control={form.control}
            name="receiver_last_name"
            render={({field,fieldState}) => (
              <div className="w-1/2">
              <Input error={fieldState.error?.message} field={field} id="receiver_last_name" name="receiver_last_name" placeholder="Last Name" required={true} type="text"/>
              </div>
            )}
            />
            </div>
            <div className="flex gap-3 w-full">
                <Controller
                control={form.control}
                name="receiver_phone_number"
                render={({field,fieldState}) => (
                  <div className="w-1/2">
                  <Input error={fieldState.error?.message} field={field} id="receiver_phone_number" name="receiver_phone_number" placeholder="Phone Number" required={true} type="text"/>
                  </div>
                )}
                />
                <Controller
                control={form.control}
                name="receiver_secondary_phone_number"
                render={({field,fieldState}) => (
                  <div className="w-1/2">
                  <Input error={fieldState.error?.message} field={field} id="phonenumber2" name="phonenumber2" placeholder="Phone Number" required={true} type="text"/>
                  </div>
                )}
                />
            </div>
            <div className="flex gap-3 w-full">
                <Controller
                control={form.control}
                name="receiver_gender"
                render={({field,fieldState}) => (
                  <div className="w-1/2 relative">
                    <select {...field} id="receiver_gender" name="receiver_gender" className={`border-2 ${fieldState.error?.message ? 'border-red-500' : 'border-mid'} h-12 w-full p-2 bg-transparent outline-none cursor-pointer`}>
                      <option value="">Gender</option>
                      <option value="1">Male</option>
                      <option value="2">Female</option>
                    </select>
                    {fieldState.error?.message && <p className="text-red-500 text-xs mt-1">{fieldState.error.message}</p>}
                  </div>
                )}
                />
              <Controller
                control={form.control}
                name="receiver_area"
                render={({field,fieldState}) => (
                  <div className="w-1/2  relative">
                    <select {...field} id="receiver_area" name="receiver_area" className={`border-2 ${fieldState.error?.message ? 'border-red-500' : 'border-mid'} h-12 w-full p-2 bg-transparent outline-none cursor-pointer`}>
                      <option value="">Area</option>
                      {areas.map((area) => (
                          <option key={area} value={area}>{area}</option>
                      ))}
                  </select>
                  {fieldState.error?.message && <p className="text-red-500 text-xs mt-1">{fieldState.error.message}</p>}
                  </div>
                )}
                />
              </div>
              <div className="flex gap-3 w-full">
                <Controller
                control={form.control}
                name="receiver_building"
                render={({field,fieldState}) => (
                  <div className="w-1/2">
                  <Input error={fieldState.error?.message} field={field} id="receiver_building" name="receiver_building" placeholder="Building" required={true} type="text"/>
                  </div>
                )}
                />
                <Controller
                control={form.control}
                name="receiver_floor"
                render={({field,fieldState}) => (
                  <div className="w-1/2">
                  <Input error={fieldState.error?.message} field={field} id="receiver_floor" name="receiver_floor" placeholder="Floor" required={true} type="text"/>
                  </div>
                )}
                />
              </div>
                <Controller
                control={form.control}
                name="receiver_email"
                render={({field,fieldState}) => (
                  <div className="w-full">
                  <Input error={fieldState.error?.message} field={field} id="receiver_email" name="receiver_email" placeholder="Email" required={false} type="email"/>
                  </div>
                )}
                />
                <Controller
                control={form.control}
                name="receiver_directions"
                render={({field,fieldState}) => (
                  <div className="w-full">
                  <Input error={fieldState.error?.message} field={field} id="receiver_directions" name="receiver_directions" placeholder="Address Details" required={true} type="text"/>
                  </div>

                )}
                />
               <Controller
               control={form.control}
               name="receiver_payment_method"
               render={({field,fieldState}) => (
                 <div className="flex flex-col gap-2">
                      <h2 className="text-lg">Payment method</h2>
                      <div className="flex justify-between border-2 border-mid p-3">
                              <label htmlFor="cash-on-delivery">Cash on Delivery</label>
                              <input
                                checked={field.value === "cash_on_delivery"}
                                onChange={() => field.onChange("cash_on_delivery")}
                                className="size-5 checked:bg-primary rounded-full border border-muted appearance-none"
                                type="radio"
                                name="receiver_payment_method"
                                id="cash-on-delivery"
                              />
                      </div>
                      <div className="flex justify-between border-2 border-mid p-3 opacity-50">
                              <label htmlFor="e-payment">E-payment</label>
                              <input
                                checked={field.value === "e_payment"}
                                onChange={() => field.onChange("e_payment")}
                                disabled={true}
                                className="size-5 checked:bg-primary rounded-full border border-muted appearance-none"
                                type="radio"
                                name="receiver_payment_method"
                                id="e-payment"
                              />
                      </div>
                      {fieldState.error?.message && <p className="text-error">{fieldState.error.message}</p>}
                 </div>
               )}
               />
               <div className="lg:w-full flex justify-between max-lg:absolute max-lg:bottom-20 w-11/12">
                <Link href='/checkout/order' className="text-primary flex justify-center items-center gap-2"><BackArrow/> Return to Cart</Link>
                <button disabled={isPending} type="submit" className={`text-white bg-primary px-5 py-1 ${isPending?'opacity-50':''}`}>{isPending ? 'Placing Order...' : 'Place Order'}</button>
               </div>
           </form>
    )
}