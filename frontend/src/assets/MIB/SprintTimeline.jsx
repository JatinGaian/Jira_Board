import * as React from "react"
const SprintTimeline = (props) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={16}
        height={16}
        fill="none"
        {...props}
    >
        <rect
            width={10.556}
            height={3.333}
            x={2.5}
            y={1.5}
            stroke="#242F3E"
            rx={0.5}
        />
        <rect
            width={9.111}
            height={3.333}
            x={5.388}
            y={6.556}
            stroke="#242F3E"
            rx={0.5}
        />
        <rect
            width={7.667}
            height={3.333}
            x={2.5}
            y={11.611}
            stroke="#242F3E"
            rx={0.5}
        />
    </svg>
)
export default SprintTimeline
