import Image from "next/image";
import hero from '@/public/hero.png'
import ItemCard from "@/components/app/item-card";
import SecondaryButton from "@/components/buttons/secondary";
import OurStoryLogo from "@/components/svg/ourstory-logo";
import VerticalLogo from "@/components/svg/vertical-logo";
import PrimaryButton from "@/components/buttons/primary";
import Link from "next/link";

export default function Home() {
  return (
    <main className="h-fit w-full flex flex-col lg:gap-12 gap-7">
      <section className="flex lg:justify-start justify-center items-end lg:h-[calc(100vh-80px)] h-[calc(100vh-48px)] w-full relative pl-10">
        <div className="h-full w-full absolute top-0 left-0 ">
          <Image src={hero} alt="" fill className="object-cover object-top"/>
        </div>
        <div className="flex flex-col justify-center lg:items-start items-center mb-16 gap-5 z-10">
          <p className="font-montserrat text-muted text-center text-sm hidden lg:block">Summer Collection &apos;26</p>
          <h1 className="font-boldonse text-2xl lg:text-5xl lg:w-[400px] max-w-xs leading-normal text-white text-center lg:text-start">Where Confidence Becomes Style.</h1>
          <Link href="/collections">
              <SecondaryButton>SHOP NOW</SecondaryButton>
          </Link>
          <p className="font-montserrat text-muted text-start text-sm lg:w-[300px] w-[200px] hidden lg:block">Curated pieces for women who move through the world on their own terms. Sustainable, elevated, unapologetic</p>
        </div>
      </section>
      <section className="w-full lg:h-[calc(100vh-80px)] h-96 relative lg:px-10 px-5">
          <div className="flex flex-col items-start gap-5">
            <p className="text-primary font-montserrat text-center hidden lg:block text-[14px] font-bold tracking-widest">Most loved</p>
            <h2 className="text-2xl lg:text-4xl font-boldonse">Best Sellers</h2>
          </div>
          <div className="flex w-full gap-4">
              <ItemCard/>
          </div>
      </section>
      <section className="lg:h-[calc(100vh-80px)] h-[calc(100vh-48px)] w-full lg:px-10 px-5 flex flex-col gap-5">
          <div className="flex flex-col items-start gap-5">
              <p className="text-primary font-montserrat text-center hidden lg:block text-[14px] font-bold tracking-widest">New</p>
              <h2 className="text-2xl lg:text-4xl font-boldonse">Collections</h2>
          </div>
          <div className="grid lg:grid-cols-3 grid-cols-2 lg:grid-rows-2 grid-rows-3 gap-4 lg:gap-5 flex-1">
            <div className="col-span-1 lg:col-start-1 lg:col-end-3 row-span-1 rounded-[10px] overflow-hidden relative flex justify-center items-end lg:pb-10 pb-3.5">
              <div className="absolute top-0 left-0 w-full h-full">
                  <Image src={hero} alt="" fill className="object-cover object-top"/> 
              </div>
              <button className="bg-primary w-20 lg:w-36 h-8 lg:h-12 lg:text-xl rounded-lg lg:rounded-xl text-sm font-montserrat text-white z-20">Dresses</button>
            </div>
            <div className="col-span-1  row-span-2 rounded-[10px] overflow-hidden relative">
              <div className="absolute top-0 left-0 w-full h-full">
                <Image src='https://3yrpgg4xvr.ucarecd.net/b06ea220-ca39-4a3e-9852-fc0c03ab54b9/-/preview/750x1000/' alt="" fill className="object-cover object-top"/>
              </div>
              <button className="bg-primary w-20 lg:w-36 h-8 lg:h-12 lg:text-xl rounded-lg lg:rounded-xl text-sm font-montserrat text-white z-20">Sets</button>
            </div>
            <div className="col-span-1 lg:row-span-1 row-span-2 rounded-[10px] overflow-hidden relative">
              <div className="absolute top-0 left-0 w-full h-full">
                <Image src={hero} alt="" fill className="object-cover object-top"/> 
              </div>
              <button className="bg-primary w-20 lg:w-36 h-8 lg:h-12 lg:text-xl rounded-lg lg:rounded-xl text-sm font-montserrat text-white z-20">Tops</button>
            </div>
            <div className="col-span-1 lg:row-span-1 row-span-1 rounded-[10px] overflow-hidden relative">
              <div className="absolute top-0 left-0 w-full h-full">
                  <Image src={hero} alt="" fill className="object-cover object-top"/> 
              </div>
              <button className="bg-primary w-20 lg:w-36 h-8 lg:h-12 lg:text-xl rounded-lg lg:rounded-xl text-sm font-montserrat text-white z-20">Skirts</button>
            </div>
          </div>
      </section>
      <section className="h-fit w-full lg:px-20 px-5 lg:pb-10 pb-20  flex lg:justify-between items-center lg:gap-12 gap-6 relative">
              <div className="flex flex-col lg:w-1/3 w-3/4 lg:gap-12 gap-6">
                <h2 className="text-2xl lg:text-4xl font-boldonse">Our Story</h2> 
                <p className=" w-full text-mid lg:text-2xl text-sm font-montserrat">
                    RUZO was born from a simple belief: confidence starts with what you wear. What began as a passion for fashion and timeless style grew into a brand dedicated to creating pieces that make women feel powerful, comfortable, and effortlessly elegant. We wanted to move beyond fast-changing trends and focus on clothing that remains relevant, season after season.
                </p>
                <div className="max-lg:absolute max-lg:bottom-5 max-lg:left-1/2 max-lg:-translate-x-1/2">
                  <PrimaryButton>read more</PrimaryButton>
                </div>
              </div>
              <div className="h-fit ">
                <OurStoryLogo/>
                <VerticalLogo/>
              </div>
      </section>
    </main>
  );
}
