import * as React from "react"
const AskForHelp = (props) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={16}
        height={16}
        fill="none"
        {...props}
    >
        <circle cx={8} cy={8} r={8} fill="#FDF5F3" />
        <path
            stroke="#C72F08"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5.892 11.97 3.679 9.518a.758.758 0 0 1-.067-.921.758.758 0 0 1 1.013-.23l1.187.717-.62-4.37a.763.763 0 0 1 1.5-.255l.566 2.821V4.033A.717.717 0 0 1 8 3.313a.72.72 0 0 1 .72.72V7.28l.53-2.842a.742.742 0 0 1 1.356-.25.746.746 0 0 1 .102.542l-.583 2.917 1.104-2.204a.662.662 0 0 1 .967-.259.658.658 0 0 1 .25.804l-1.083 2.717a2.124 2.124 0 0 0-.155.804v1.025a2.163 2.163 0 0 1-.866 1.73 2.15 2.15 0 0 1-1.3.416H7.5a2.154 2.154 0 0 1-1.608-.708Z"
        />
    </svg>
)
export default AskForHelp