import React from "react";

export function Card({
  title,
  children,
  className
}: {
  title: string;
  className?: string;
  children?: React.ReactNode;
}): JSX.Element {
  return (
    <div className={`border p-6 bg-white rounded-xl overflow-y-auto ${className}`}>
      <h1 className="text-xl border-b pb-2">
        {title}
      </h1>
      <p>{children}</p>
    </div>
  );
}
