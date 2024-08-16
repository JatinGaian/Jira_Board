import * as React from "react"
const SubmitComment = (props) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={20}
        height={20}
        fill="none"
        {...props}
    >
        <circle cx={10} cy={10} r={10} fill="#7C5CFC" />
        <g
            stroke="#fff"
            strokeLinecap="round"
            strokeLinejoin="round"
            clipPath="url(#a)"
        >
            <path
                fill="#7C5CFC"
                d="M5.7 5.872a.75.75 0 0 1 .987-1.039l9.506 4.83a.375.375 0 0 1 0 .668l-9.506 4.836A.75.75 0 0 1 5.7 14.13l2.529-4.132L5.7 5.872Z"
            />
            <path d="M16.399 9.996H8.227" />
        </g>
        <defs>
            <clipPath id="a">
                <path fill="#fff" d="M5 4h12v12H5z" />
            </clipPath>
        </defs>
    </svg>
)
export default SubmitComment
