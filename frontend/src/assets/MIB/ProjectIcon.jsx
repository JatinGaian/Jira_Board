import * as React from "react"
const ProjectIcon = (props) => (
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
      <path d="M18.167 20.606a1.268 1.268 0 0 1-.931.411h-1.128M8.35 17.217v-6.333a1.267 1.267 0 0 1 1.266-1.267H11.2M15.634 9.617h1.583a1.267 1.267 0 0 1 1.267 1.267v5.637M14.512 8.35a1.267 1.267 0 0 0-2.191 0h-.488a.633.633 0 0 0-.633.633v1.267a.633.633 0 0 0 .633.633H15a.633.633 0 0 0 .633-.633V8.983A.633.633 0 0 0 15 8.35h-.488ZM7.717 22.284v-1.691a2.11 2.11 0 0 1 2.109-2.11h1.057v-2.85a.95.95 0 0 1 1.9 0v4.434l.817-.684a.792.792 0 0 1 1.216 1.013l-1.57 1.9" />
      <path d="m19.883 17.716-.95-.95a.75.75 0 0 0-1.083 1.039c1.4 1.45 1.045 2.166 2.217 3.344l1.267 1.134M18.483 13.098 21.2 16.13a1.529 1.529 0 0 1 .45 1.083v.95a1.68 1.68 0 0 0 .633 1.267" />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M7 7h16v16H7z" />
      </clipPath>
    </defs>
  </svg>
)
export default ProjectIcon
