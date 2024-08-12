import * as React from "react"
const TeamsIcon = (props) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={30}
        height={30}
        fill={props.fill}
        {...props}
    >
        <rect width={30} height={30}  rx={15} />
        <path
            stroke={props.strokecolor}
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13.426 17.709a1.875 1.875 0 1 0 3.75 0 1.875 1.875 0 0 0-3.75 0ZM7.176 17.709a1.875 1.875 0 1 0 3.75 0 1.875 1.875 0 0 0-3.75 0ZM19.676 17.709a1.875 1.875 0 1 0 3.75 0 1.875 1.875 0 0 0-3.75 0ZM24.268 22.084a3.817 3.817 0 0 0-5.944 0 3.966 3.966 0 0 0-3.023-1.42M6.333 22.084a3.817 3.817 0 0 1 5.945 0 3.965 3.965 0 0 1 3.023-1.42M16.55 10.209a1.875 1.875 0 1 0 3.75 0 1.875 1.875 0 0 0-3.75 0ZM10.3 10.209a1.875 1.875 0 1 0 3.75 0 1.875 1.875 0 0 0-3.75 0ZM20.384 13.62a3.894 3.894 0 0 0-2.233-.7"
        />
        <path
            stroke={props.strokecolor}
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M18.154 12.92a3.838 3.838 0 0 0-2.073.603M14.183 13.524a3.833 3.833 0 0 0-4.083 0"
        />
    </svg>
)
export default TeamsIcon
