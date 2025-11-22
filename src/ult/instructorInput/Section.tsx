import React from "react";

export const Section = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div>
    <h3 className="text-sm font-medium text-zinc-600 mb-2">{title}</h3>
    {children}
  </div>
);
