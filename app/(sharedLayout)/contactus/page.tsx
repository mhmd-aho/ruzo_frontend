'use client'
import Input from '@/components/input/text-input';
import { toast } from "sonner";

export default function ContactUsPage() {

  const onSubmit = async (event:React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget);
    formData.append("access_key", "ad1f7cd2-de93-4b02-949d-2c0fd51a6dc0");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData
    });

    const data = await response.json();
    if (data.success) {
      toast.success("Form Submitted Successfully");
      event.currentTarget.reset();
    } else {
      toast.error("Error");
    }
  };

  return (
    <div className="w-full lg:h-[calc(100vh-80px)] h-[calc(100vh-48px)] flex flex-col lg:items-center lg:justify-center justify-start gap-8 p-4">
            <div className="flex flex-col lg:items-start lg:justify-start lg:w-1/2 w-full gap-2">
                <h2 className="font-boldonse text-4xl">Contact us</h2>
                <p className="font-montserrat text-sm text-mid">Have a question? Send us a message and we&apos;ll get back to you as soon as possible.</p>
            </div>
            <form onSubmit={onSubmit} className="lg:w-1/2 w-full flex flex-col gap-4">
            <div className="flex gap-4 w-full">
                <div className="flex flex-col gap-2 w-full">
                    <label htmlFor="name" className="text-sm">name</label>
                    <Input id='name' name='name' placeholder='name' required={true} type='text'/>
                </div>
            </div>
                <div className="flex flex-col gap-2 w-full">
                    <label htmlFor="email">email</label>
                    <Input id='email' name='email' placeholder='email' required={true} type='text'/>
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="message">message</label>
                    <textarea id="message" name='message' className="border-2 border-mid h-32 w-full p-2" placeholder="message" required></textarea>
                </div>
                <button type='submit' className="bg-primary w-full  h-10 rounded-lg text-white font-montserrat text-sm">send</button>
            </form>
        </div>
  );
}