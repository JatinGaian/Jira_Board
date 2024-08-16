import * as React from "react"
const LinkArrow = (props) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={16}
        height={16}
        fill="none"
        {...props}
    >
        <circle cx={8} cy={8} r={8} fill="#F5F6F7" />
        <path
            stroke="#98A2B3"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.643 5.355 5 11M10.643 8.927V5.355H7.07"
        />
    </svg>
)
export default LinkArrow
