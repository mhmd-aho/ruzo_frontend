import Image from "next/image";
import Link from "next/link";
export default async function HomePageCollection({name}:{name:string} ) {
    const collections: { [key: string]: { image: string, link: string, name: string,className:string } } = { 
        dresses:{
            image:'https://3yrpgg4xvr.ucarecd.net/543ea717-5e18-4e18-a684-357f925cc86f/0B7A7815copy.webp',
            link:'/collections/?category=dresses',
            name:'Dresses',
            className:'col-span-1 lg:col-start-1 lg:col-end-3 row-span-1 rounded-[10px] overflow-hidden relative flex justify-center items-end lg:pb-10 pb-3.5'
        },
        tops:{
            image:'https://3yrpgg4xvr.ucarecd.net/a26058c1-63a7-4bd1-bf97-1178f3f07927/0B7A8075copy.webp',
            link:'/collections/?category=tops',
            name:'Tops',
            className:'col-span-1 lg:row-span-1 row-span-2 rounded-[10px] overflow-hidden relative flex justify-center items-end lg:pb-10 pb-3.5'
        },
        sets:{
            image:'https://3yrpgg4xvr.ucarecd.net/c7f91348-98b5-4da0-8c9c-f7ca08093002/0B7A7981copy.webp',
            link:'/collections/?category=sets',
            name:'Sets',
            className:'col-span-1  row-span-2 rounded-[10px] overflow-hidden relative flex justify-center items-end lg:pb-10 pb-3.5'
        },
        skirts:{
            image:'https://3yrpgg4xvr.ucarecd.net/c7f91348-98b5-4da0-8c9c-f7ca08093002/0B7A7981copy.webp',
            link:'/collections/?category=skirts',
            name:'Skirts',
            className:'col-span-1 lg:row-span-1 row-span-1 rounded-[10px] overflow-hidden relative flex justify-center items-end lg:pb-10 pb-3.5'
        }
       
    }
    const image:string = collections[name].image
    const link:string = collections[name].link
    const btnName:string = collections[name].name
    const className:string = collections[name].className
    return(
        <Link href={link} className={className}>
            <div className="absolute top-0 left-0 w-full h-full">
                <Image src={image} alt="" fill className="object-cover object-top"/> 
            </div>
            <button className="bg-primary w-20 lg:w-36 h-8 lg:h-12 lg:text-xl rounded-lg lg:rounded-xl text-sm font-montserrat text-white z-20">{btnName}</button>
        </Link>
    )
}