import { ReactNode } from "react";

export interface IListLayoutProps {
  children: ReactNode;
}

export function ListLayout({ children }: IListLayoutProps) {
  return <div className="grid grid-cols-2 gap-16">{children}</div>;
}
