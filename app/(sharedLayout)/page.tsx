import BestSeller from "@/components/app/best-seller";
import HomePageCollection from "@/components/app/home-page-collection";
import SecondaryButton from "@/components/buttons/secondary";
import OurStoryLogo from "@/components/svg/ourstory-logo";
import VerticalLogo from "@/components/svg/vertical-logo";
import PrimaryButton from "@/components/buttons/primary";
import { Metadata } from "next";
import Link from "next/link";
import { getBestSellers } from "@/app/action";

export const metadata:Metadata = {
    title: "Ruzo | Home",
    description: "Welcome to Ruzo, where confidence becomes style. Discover our latest collections for women who move through the world on their own terms.",
};
export default async function Home() {
  let bestSellers = [];
  try {
      const res = await getBestSellers();
      if (res.success && res.data) {
          bestSellers = res.data;
      }
  } catch (err) {
      console.error("Failed to fetch best sellers:", err);
  }

  return (
    <main className="h-fit w-full relative  flex flex-col gap-10">
      <section className="flex justify-start  lg:h-[calc(100vh-80px)] h-[calc(100vh-48px)] w-full relative pl-10">
        <div className="h-full w-full absolute top-0 left-0 ">
          <video src="/hero.mp4" autoPlay loop muted playsInline className="h-full w-full object-cover object-top"/>
        </div>
        <div className="max-lg:absolute max-lg:top-15 max-lg:left-1/2 max-lg:-translate-x-1/2 flex flex-col justify-center lg:items-start items-center gap-5 z-10">
          <p className="font-montserrat text-mid text-center text-sm hidden lg:block">Summer Collection &apos;26</p>
          <h1 className="font-boldonse text-2xl lg:text-5xl lg:w-[400px] w-xs leading-normal text-black text-center lg:text-start">Where Confidence Becomes Style.</h1>
          <Link href="/collections">
              <SecondaryButton>SHOP NOW</SecondaryButton>
          </Link>
          <p className="font-montserrat text-black text-start text-sm lg:w-[300px] w-[200px] hidden lg:block">Curated pieces for women who move through the world on their own terms. Sustainable, elevated, unapologetic</p>
        </div>
      </section>
      <section className="w-full h-fit relative lg:px-10 px-5 flex flex-col justify-center items-center gap-5 ">
          <div className="flex flex-col items-start justify-center gap-5 self-start">
            <p className="text-primary font-montserrat text-center hidden lg:block text-[14px] font-bold tracking-widest">Most loved</p>
            <h2 className="text-2xl lg:text-4xl font-boldonse">Best Sellers</h2>
          </div>
          <BestSeller initialProducts={bestSellers}/>
      </section>
      <section className="min-h-[calc(100vh-80px)] h-auto w-full lg:px-10 px-5 flex flex-col gap-5 pb-5">
      <div className="flex flex-col items-start gap-5">
        <p className="text-primary font-montserrat text-center hidden lg:block text-[14px] font-bold tracking-widest">New</p>
        <h2 className="text-2xl lg:text-4xl font-boldonse">Collections</h2>
      </div>
      
      {/* Grid container handles explicit row spans */}
      <div className="grid lg:grid-cols-3 grid-cols-2 lg:grid-rows-2 grid-rows-3 gap-4 lg:gap-5 flex-1 min-h-[500px]">
        <HomePageCollection name="dresses"/>
        <HomePageCollection name="tops"/>
        <HomePageCollection name="sets"/>
        <HomePageCollection name="pants"/>
      </div>
    </section>
      <section className="h-fit w-full lg:px-20 px-5 lg:pb-10 pb-20  flex lg:justify-between items-center lg:gap-12 gap-6 relative">
              <div className="flex flex-col lg:w-1/3 w-3/4 lg:gap-12 gap-6">
                <h2 className="text-2xl lg:text-4xl font-boldonse">Our Story</h2> 
                <p className=" w-full text-mid lg:text-2xl text-sm font-montserrat">
                    RUZO was born from a simple belief: confidence starts with what you wear. What began as a passion for fashion and timeless style grew into a brand dedicated to creating pieces that make women feel powerful, comfortable, and effortlessly elegant. We wanted to move beyond fast-changing trends and focus on clothing that remains relevant, season after season.
                </p>
                <div className="max-lg:absolute max-lg:bottom-5 max-lg:left-1/2 max-lg:-translate-x-1/2">
                  <Link href="/ourstory"><PrimaryButton>Read more</PrimaryButton></Link>
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
