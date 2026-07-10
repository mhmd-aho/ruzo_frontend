import Image from "next/image";
import processing from '@/public/processing.png'
import materials from '@/public/materials.png'
import ourStoryFirstPic from '@/public/ourStoryFirstPic.jpg'
import { Metadata } from "next";
import OurStoryLogo from "@/components/svg/ourstory-logo";
import VerticalLogo from "@/components/svg/vertical-logo";

export const metadata:Metadata = {
    title: "Ruzo | Our Story",
    description: "Discover the story of Ruzo and our commitment to quality and style.",
};

export default function OurStory() {
    return(
        <main className="w-full min-h-screen flex flex-col gap-10 pb-16">
            <div className="h-fit relative">
                <img
                    src={ourStoryFirstPic.src}
                    alt="Our Story Header Image"
                    className="w-full lg:h-[calc(100vh-80px)] h-fit lg:object-cover"
                />
                <p className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white lg:text-2xl  w-fit font-bold text-center">Elegance in simplicity, Earth’s harmony</p>
            </div>
            <section className="h-fit w-full lg:px-20 px-5 lg:py-10 py-5 flex justify-between items-center lg:gap-12 gap-6 relative">
                <div className="flex flex-col lg:w-1/2 w-3/4 lg:gap-10 gap-6">
                    <h2 className="text-2xl lg:text-4xl font-boldonse">Our story</h2>
                    <div className="text-mid lg:text-xl text-sm font-montserrat flex flex-col gap-5 leading-relaxed">
                        <p>
                            RUZO was born from a simple belief: confidence starts with what you wear.
                            What began as a passion for fashion and timeless style grew into a brand dedicated to creating pieces that make women feel powerful, comfortable, and effortlessly elegant. We wanted to move beyond fast-changing trends and focus on clothing that remains relevant, season after season.
                        </p>
                        <p>
                            At RUZO, every collection is designed with attention to detail, quality fabrics, and modern silhouettes that celebrate individuality. Our goal is not just to create clothing, but to create confidence—pieces that become part of your everyday story.
                        </p>
                        <p>
                            More than a fashion brand, RUZO is a statement of self-expression. A brand for women who embrace their identity, pursue their ambitions, and wear confidence wherever they go.
                        </p>
                    </div>
                </div>
                <div className="h-fit flex flex-col items-center flex-shrink-0">
                    <OurStoryLogo/>
                    <VerticalLogo className="w-14 sm:w-20 md:w-24 lg:w-32" />
                </div>
            </section>

            <section className="flex flex-col lg:flex-row items-center lg:items-start justify-center w-full h-fit lg:p-10 p-5 gap-6 lg:gap-10">
                <Image 
                    src={processing}
                    alt="processing"
                    width={488}
                    height={643}
                    className="w-full h-auto max-w-[488px] object-cover rounded-lg"
                />
                <Image 
                    src={materials}
                    alt="materials"
                    width={488}
                    height={643}
                    className="w-full h-auto max-w-[488px] object-cover rounded-lg"
                />
            </section>
        </main>
    )
}