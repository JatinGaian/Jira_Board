import * as React from "react"
const MemberIcon = (props) => (
     <svg
        xmlns="http://www.w3.org/2000/svg"
        width={30}
        height={30}
        fill={props.fill}
        {...props}
    >
        <rect width={30} height={30}  rx={15} />
        <path
            stroke={props.strokeColor}
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M11.667 10.833a3.334 3.334 0 1 0 6.667 0 3.334 3.334 0 0 0-6.667 0ZM9.166 21.667a5.834 5.834 0 0 1 11.667 0"
        />
    </svg>
)
export default MemberIcon
