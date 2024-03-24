import { ReactNode } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";
import { cn } from "~/lib/utils";

export interface DevelopingTooltipProps {
  children: ReactNode;
  className?: string;
}

const DevelopingTooltip = ({ children, className }: DevelopingTooltipProps) => {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={300}>
        <TooltipTrigger
          className={cn("text-muted-foreground opacity-50", className)}
        >
          {children}
        </TooltipTrigger>
        <TooltipContent className="p-1 text-xs select-none">
          Chức năng đang phát triển
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default DevelopingTooltip;
