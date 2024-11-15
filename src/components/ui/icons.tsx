import React from "react";
import type { SVGProps } from "react";

type Icon = SVGProps<SVGSVGElement> & {
  size: number;
};

export function BurgerIcon(props: Icon) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.size}
      height={props.size}
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2.5}
        d="M3 6h18M3 12h18M3 18h18"
      ></path>
    </svg>
  );
}
