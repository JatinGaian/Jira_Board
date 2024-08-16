import * as React from "react"
const IButton = (props) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={30}
        height={30}
        fill="none"
        {...props}
    >
        <circle cx={15} cy={15} r={15} fill="#FBF9FF" />
        <path
            stroke="#7C5CFC"
            strokeWidth={1.5}
            d="M15 18.5a.25.25 0 1 1 0-.5M15 18.5a.25.25 0 1 0 0-.5"
        />
        <path
            stroke="#7C5CFC"
            strokeLinecap="round"
            strokeMiterlimit={10}
            strokeWidth={1.5}
            d="M15 16v-5.5"
        />
        <path
            stroke="#7C5CFC"
            strokeMiterlimit={10}
            strokeWidth={1.5}
            d="M15 22.5a7.5 7.5 0 1 0 0-15 7.5 7.5 0 0 0 0 15Z"
        />
    </svg>
)
export default IButton
