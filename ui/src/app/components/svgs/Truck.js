import * as React from "react";
const Truck = (props) => (
  <svg
    width="150px"
    height="150px"
    viewBox="0 0 9 9"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      width={48}
      height={48}
      fill="white"
      fillOpacity={0.01}
      d="M0 0H9V9H0V0z"
    />
    <path d="M9 0H0v9h9z" fill="white" fillOpacity={0.01} />
    <path
      d="M2.25 7.313a0.75 0.75 0 1 0 0 -1.5 0.75 0.75 0 0 0 0 1.5Z"
      stroke="#000000"
      strokeWidth={0.75}
      strokeLinejoin="round"
    />
    <path
      d="M6.563 7.313a0.75 0.75 0 1 0 0 -1.5 0.75 0.75 0 0 0 0 1.5Z"
      stroke="#000000"
      strokeWidth={0.75}
      strokeLinejoin="round"
    />
    <path
      d="M1.5 6.563H0.375V2.063h5.438v4.5H3"
      stroke="#000000"
      strokeWidth={0.75}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M5.813 6.563V3.375h1.607L8.625 4.969V6.563h-1.16"
      stroke="#000000"
      strokeWidth={0.75}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
export default Truck;
