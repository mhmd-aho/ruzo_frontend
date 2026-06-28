export default function Input({id, name, placeholder}: {id: string, name: string, placeholder: string, className?: string}){
    return(
        <input type="text" id={id} name={name} className="border-2 border-mid h-12 w-full p-2" placeholder={placeholder} />

    )
}