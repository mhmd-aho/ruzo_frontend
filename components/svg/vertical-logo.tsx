export default function VerticalLogo({ className }: { className?: string }) {
    return(
        <svg className={`lg:hidden block ${className || ""}`} width="100" height="320" viewBox="0 0 100 320" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g fill="black">
                {/* Top A */}
                <path d="M30 65L47 15H53L70 65H65L61.5 54H38.5L35 65H30ZM40.5 48H59.5L50 21L40.5 48Z" />
                {/* U */}
                <path d="M34 95H39V135C39 144 43 148 50 148C57 148 61 144 61 135V95H66V135C66 147 60 153 50 153C40 153 34 147 34 135V95Z" />
                {/* R */}
                <path d="M34 180H56C65 180 70 186 70 195C70 202 66 207 60 208.5L71 230H65L54.5 209.5H39V230H34V180ZM39 205H55.5C61.5 205 65 201.5 65 195C65 188.5 61.5 185 55.5 185H39V205Z" />
                {/* Bottom A */}
                <path d="M30 305L47 255H53L70 305H65L61.5 294H38.5L35 305H30ZM40.5 288H59.5L50 261L40.5 288Z" />
            </g>
        </svg>
    )
}

