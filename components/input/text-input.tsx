export default function Input({id, name, placeholder,error,field,required,onChange}: {id: string, name: string, placeholder: string,error?: string,field?: any,required:boolean,onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void}){
    return(
        <div>
        <input type="text" {...field} id={id} name={name} className={`border-2 ${error ? 'border-red-500' : 'border-mid'} h-12 w-full p-2`} placeholder={placeholder} required={required} onChange={onChange}/>
        {error && <p className="text-red-500">{error}</p>}
        </div>
    )
}