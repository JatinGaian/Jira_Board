import * as React from "react"
const AccordionArrow = (props) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={14}
        height={8}
        fill="none"
        {...props}
    >
        <path
            stroke="#98A2B3"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M12.512 1.32 7.26 6.573a.368.368 0 0 1-.519 0L1.487 1.32"
        />
    </svg>
)
export default AccordionArrow
