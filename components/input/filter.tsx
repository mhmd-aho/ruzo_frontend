import {useState} from "react"
import Plus from "../svg/plus"
import Minus from "../svg/minus"
export default function FilterDisplay({filterName,options}: {filterName: string,options: string[]}) {
    const [showFilter, setShowFilter] = useState(false)
    return(
        <div className={`border border-primary ${showFilter?'bg-white':'bg-primary'} w-full p-4 flex flex-col gap-5`}>
                    <div className="flex justify-between items-center w-full">
                        <h3 className={`font-bold ${showFilter?'text-primary':'text-white'}`}>{filterName}</h3>
                        <button onClick={() => setShowFilter(!showFilter)}>{showFilter ? <Minus/> : <Plus/>}</button>
                    </div>
                    {
                        showFilter && (
                            <ul className="flex flex-col gap-2">
                                {options.map((option,index) => {
                                    return (
                                        <div key={index} className="flex items-center gap-1">
                                            <input className="border border-primary size-4" type="checkbox" name={option} id={option} />
                                            <label htmlFor={option}>{option}</label>
                                        </div>
                                    )
                                })}
                            </ul>
                        )
                    }
                </div>
    )
}
    