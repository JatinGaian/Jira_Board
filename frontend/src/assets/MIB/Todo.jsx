import * as React from "react"
const Todo = (props) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={16}
        height={16}
        fill="none"
        {...props}
    >
        <g
            stroke="#3D81DB"
            strokeLinecap="round"
            strokeLinejoin="round"
            clipPath="url(#a)"
        >
            <path d="M.5 2a1.5 1.5 0 1 0 3 0 1.5 1.5 0 0 0-3 0ZM.5 8a1.5 1.5 0 1 0 3 0 1.5 1.5 0 0 0-3 0ZM.5 14a1.5 1.5 0 1 0 3 0 1.5 1.5 0 0 0-3 0ZM5.5 2h10M5.5 8h10M5.5 14h10" />
        </g>
        <defs>
            <clipPath id="a">
                <path fill="#fff" d="M0 0h16v16H0z" />
            </clipPath>
        </defs>
    </svg>
)
export default Todo
