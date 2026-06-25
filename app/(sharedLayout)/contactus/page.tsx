import Input from "@/components/input/text-input";

export default function ContactUsPage(){
    return(
        <div className="w-full lg:h-[calc(100vh-80px)] h-[calc(100vh-48px)] flex flex-col lg:items-center lg:justify-center justify-start gap-8 p-4">
            <div className="flex flex-col lg:items-start lg:justify-start lg:w-1/2 w-full gap-2">
                <h2 className="font-boldonse text-4xl">Contact us</h2>
                <p className="font-montserrat text-sm text-mid">Have a question? Send us a message and we'll get back to you as soon as possible.</p>
            </div>
            <form action="" className="lg:w-1/2 w-full flex flex-col gap-4">
            <div className="flex gap-4 w-full">
                <div className="flex flex-col gap-2 w-full">
                    <label htmlFor="firstName" className="text-sm">first name</label>
                    <Input id='firstName' name='firstName' placeholder='first name'/>
                </div>
                <div className="flex flex-col gap-2 w-full">
                    <label htmlFor="lastName" className="text-sm">last name</label>
                    <Input id='lastName' name='lastName' placeholder='last name'/>
                </div>
            </div>
                <div className="flex flex-col gap-2 w-full">
                    <label htmlFor="email">email</label>
                    <Input id='email' name='email' placeholder='email'/>
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="message">message</label>
                    <textarea id="message" className="border-2 border-mid h-32 w-full p-2" placeholder="message"></textarea>
                </div>
                <button className="bg-primary w-full  h-10 rounded-lg text-white font-montserrat text-sm">send</button>
            </form>
        </div>
    )
}