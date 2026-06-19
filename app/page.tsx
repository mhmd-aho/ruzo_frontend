import Image from "next/image";
import hero from '@/public/hero.png'
import ItemCard from "@/components/app/item-card";
import SecondaryButton from "@/components/buttons/secondary";
import Footer from "@/components/app/desktop-footer";
import MobileFooter from "@/components/app/mobile-footer";
export default function Home() {
  return (
    <main className="h-fit w-full">
      <section className="flex lg:justify-start justify-center items-end lg:h-[calc(100vh-80px)] h-[calc(100vh-48px)] w-full relative pl-10">
        <div className="h-full w-full absolute top-0 left-0 ">
          <Image src={hero} alt="" fill className="object-cover object-top"/>
        </div>
        <div className="flex flex-col justify-center lg:items-start items-center mb-15 gap-5 z-10">
          <p className="font-montserrat text-muted text-center text-sm hidden lg:block">Summer Collection '26</p>
          <h1 className="font-boldonse text-2xl lg:text-5xl lg:w-[400px] w-2xs leading-normal text-white text-center lg:text-start">Where Confidence Becomes Style.</h1>
          <SecondaryButton>SHOP NOW</SecondaryButton>
          <p className="font-montserrat text-muted text-start text-sm lg:w-[300px] w-[200px] hidden lg:block">Curated pieces for women who move through the world on their own terms. Sustainable, elevated, unapologetic</p>
        </div>
      </section>
      <section className="w-full lg:h-[calc(100vh-80px)] h-96 relative lg:px-10 px-5 lg:pt-12 pt-10">
          <div className="flex flex-col items-start gap-5">
            <p className="text-primary font-montserrat text-center hidden lg:block text-[14px] font-bold tracking-widest">Most loved</p>
            <h2 className="text-2xl lg:text-4xl font-boldonse">Best Sellers</h2>
          </div>
          <div className="flex w-full gap-4">
              <ItemCard/>
          </div>
      </section>
      <section className="lg:h-[calc(100vh-80px)] h-[calc(100vh-48px)] w-full lg:px-10 px-5 lg:pt-12 pt-10 flex flex-col gap-5">
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
                <Image src={hero} alt="" fill className="object-cover object-top"/>
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
      <section className="lg:h-[calc(100vh-80px)] h-[calc(100vh-48px)] w-full lg:px-10 px-5 lg:pt-12 pt-10 flex flex-col gap-5">
          <h2 className="text-2xl lg:text-4xl font-boldonse">Our Story</h2>
          <div className="w-full flex">
            <p className="lg:w-1/3 w-full text-mid text-lg font-montserrat">
              RUZO was born from a simple belief: confidence starts with what you wear. What began as a passion for fashion and timeless style grew into a brand dedicated to creating pieces that make women feel powerful, comfortable, and effortlessly elegant. We wanted to move beyond fast-changing trends and focus on clothing that remains relevant, season after season.
            </p>
            <div className="h-full">
              
            </div>
          </div>
      </section>
    </main>
  );
}
