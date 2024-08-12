import * as React from "react"
const InProgress = (props) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={16}
        height={16}
        fill="none"
        {...props}
    >
        <path
            stroke="#C4990F"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9.25 9.998a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"
        />
        <path
            stroke="#C4990F"
            strokeWidth={1.5}
            d="M1 8.248a.25.25 0 1 1 0-.5M1 8.248a.25.25 0 1 0 0-.5"
        />
        <path
            stroke="#C4990F"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M4.25 8.998a1 1 0 1 0 0-2 1 1 0 0 0 0 2ZM14.25 8.998a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
        />
    </svg>
)
export default InProgress
