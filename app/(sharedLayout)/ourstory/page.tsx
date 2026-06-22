import Image from "next/image";
import processing from '@/public/processing.png'
import materials from '@/public/materials.png'
export default function OurStory() {
    return(
        <main className="w-full min-h-screen flex flex-col gap-20">
            <section className="h-[calc(100vh-80px)] w-full bg-center bg-cover bg-no-repeat flex items-center justify-center" style={{backgroundImage: `url('/ourStoryFirstPic.png')`}}>
            </section>
            <section className="flex flex-col items-start justify-start w-full h-[calc(100vh-80px)] px-12 gap-10">
                <h2 className="text-2xl lg:text-4xl font-boldonse">Our story</h2>
                <div className="w-1/3">
                    <p>RUZO was born from a simple belief: confidence starts with what you wear.
What began as a passion for fashion and timeless style grew into a brand dedicated to creating pieces that make women feel powerful, comfortable, and effortlessly elegant. We wanted to move beyond fast-changing trends and focus on clothing that remains relevant, season after season.
At RUZO, every collection is designed with attention to detail, quality fabrics, and modern silhouettes that celebrate individuality. Our goal is not just to create clothing, but to create confidence—pieces that become part of your everyday story.
More than a fashion brand, RUZO is a statement of self-expression. A brand for women who embrace their identity, pursue their ambitions, and wear confidence wherever they go.</p>
                </div>
            </section>
            <section className="flex items-start justify-center w-full h-[calc(100vh-80px)] gap-10">
                <Image 
                    src={processing}
                    alt=""
                    width={488}
                    height={643}
                />
                <Image 
                    src={materials}
                    alt=""
                    width={488}
                    height={643}
                />

            </section>
        </main>
    )
}