"use client";

import { ReactNode } from "react";

export const Button = ({ onClick, children, disabled, colour }: 
  {onClick: () => void, 
  children: ReactNode, 
  disabled: boolean,
  colour?: string
}) => {
  return (
    <button onClick={onClick} disabled={disabled} type="button" className={`font-medium rounded-full  ${colour} text-bold px-6 py-2 text-center mb-2`}>
      {children}
    </button>

  );
};
