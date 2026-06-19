export default function PrimaryButton({children, onClick}: {children: React.ReactNode, classNames?: string, onClick?: () => void}) {
    return(
        <button className="lg:h-[70px] lg:w-3xs w-32 h-[40px] lg:font-bold font-montserrat lg:text-lg text-sm bg-primary text-white lg:rounded-[20px] rounded-[10px]" onClick={onClick}>
            {children}
        </button>
    )
}