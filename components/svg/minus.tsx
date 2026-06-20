export default function Minus({
    fill
}:{
    fill:string
}){
    const color:Record<string,string> ={
        primary:'#731012',
        black:'#0C0C0C'
    }
    return(
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 11H18V13H6V11Z" fill={color[fill]}/>
        </svg>

    )
}