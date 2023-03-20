import * as React from 'react';
import { SVGProps } from 'react';

export const Alert = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={60}
    height={60}
    viewBox="0 0 60 60"
    fill="none"
    {...props}
  >
    <path
      d="M30.3667 41.5861H30.4049"
      stroke="white"
      strokeWidth={6}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M4.5542 23.8336L23.8336 4.55421C27.2392 1.1486 32.7608 1.1486 36.1664 4.5542L55.4458 23.8336C58.8514 27.2392 58.8514 32.7608 55.4458 36.1664L36.1664 55.4458C32.7608 58.8514 27.2392 58.8514 23.8336 55.4458L4.55421 36.1664C1.1486 32.7608 1.1486 27.2392 4.5542 23.8336Z"
      stroke="white"
      strokeWidth={4}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M30.3667 17.4484V30.9656"
      stroke="white"
      strokeWidth={6}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
