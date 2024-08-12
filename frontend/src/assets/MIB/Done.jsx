import * as React from "react"
const Done = (props) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={18}
        height={18}
        fill="none"
        {...props}
    >
        <path
            stroke="#719919"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="m5.5 7 2.196 3.074a1.018 1.018 0 0 0 1.61.06L16.5 1.499"
        />
        <path
            stroke="#719919"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M12.189 3.55a6.991 6.991 0 1 0 2.678 3.035"
        />
    </svg>
)
export default Done
