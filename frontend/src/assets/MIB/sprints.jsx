import * as React from "react"
const sprints = (props) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={30}
        height={30}
        fill="none"
        {...props}
    >
        <circle cx={15} cy={15} r={15} fill="#FBF9FF" />
        <g
            stroke="#7C5CFC"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            clipPath="url(#a)"
        >
            <path d="M9 22h12a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1ZM17.333 22V8M12.667 22V8" />
        </g>
        <defs>
            <clipPath id="a">
                <path fill="#fff" d="M7 7h16v16H7z" />
            </clipPath>
        </defs>
    </svg>
)
export default sprints
