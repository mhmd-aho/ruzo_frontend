export default function Arrow({open}:{
    open:boolean
}) {
    return (
        <svg className={`${open ? "rotate-180" : "rotate-0"} transition-all duration-300`} width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3.5 5.25L7 8.75L10.5 5.25" stroke="#0C0C0C" strokeWidth="1.16667" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    )
}