import { ReactNode } from "react";
import { cn } from "~/lib/utils";

export interface IGridLayoutProps {
  children: ReactNode;
}

export function GridLayout({ children }: IGridLayoutProps) {
  return (
    <div className={cn("grid grid-cols-1 lg:grid-cols-5 gap-4 gap-y-8")}>
      <>{children}</>
    </div>
  );
}
