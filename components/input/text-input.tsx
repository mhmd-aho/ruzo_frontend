export default function Input({id, name, placeholder,error,field}: {id: string, name: string, placeholder: string,error?: string,field: any}){
    return(
        <div>
        <input type="text" {...field} id={id} name={name} className={`border-2 ${error ? 'border-red-500' : 'border-mid'} h-12 w-full p-2`} placeholder={placeholder} />
        {error && <p className="text-red-500">{error}</p>}
        </div>
    )
}