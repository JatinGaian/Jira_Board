import * as React from "react"
const AddCommentButton = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={18}
    height={18}
    fill={props.fill}
    {...props}
  >
    <path
      stroke="#7C5CFC"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      strokeWidth={1.5}
      d="M8.434 6.3v4.667M6.1 8.633h4.667M8.5 1.5a7 7 0 0 1 7 7c0 1.333-.4 2.6-1.067 3.667L16.5 16.5l-4.333-2.067A6.935 6.935 0 0 1 8.5 15.5a7 7 0 0 1-7-7 7 7 0 0 1 7-7Z"
    />
  </svg>
)
export default AddCommentButton
