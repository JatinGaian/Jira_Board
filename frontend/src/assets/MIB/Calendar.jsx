import * as React from "react"
const Calendar = (props) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={16}
        height={16}
        fill="none"
        {...props}
    >
        <path
            stroke="#B4B9C1"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeMiterlimit={10}
            d="M14.563 13.688a.897.897 0 0 1-.876.874H2.313a.897.897 0 0 1-.876-.874V4.062c0-.466.409-.875.875-.875h11.376c.466 0 .874.409.874.876v9.625ZM1.438 6.688h13.124M4.938 4.47V1.439M11.063 4.47V1.439"
        />
        <path
            stroke="#B4B9C1"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeMiterlimit={10}
            d="M4.237 11.238a.25.25 0 0 0-.233.234.25.25 0 0 0 .233.233M4.238 11.238a.25.25 0 0 1 .233.234.25.25 0 0 1-.233.233M7.417 9.168l-.904 1.78 1.895.845M6.513 10.945l5.25-1.75"
        />
    </svg>
)
export default Calendar
