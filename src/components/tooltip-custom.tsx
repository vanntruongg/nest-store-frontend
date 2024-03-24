import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "~/components/ui/tooltip";
import { cn } from "~/lib/utils";

export interface ITooltipCustomProps {
  content: string;
  trigger: any;
  customClick?: (params: any) => void;
  options?: any;
  className: string;
}

const TooltipCustom = ({
  trigger,
  content,
  customClick,
  options,
  className,
}: ITooltipCustomProps) => {
  const handleClick = () => {
    if (customClick) {
      if (options.layout) {
        customClick(options.layout === "grid" ? "list" : "grid");
      }
    }
  };
  return (
    <TooltipProvider>
      <Tooltip delayDuration={200}>
        <TooltipTrigger>
          <div onClick={handleClick} className={className}>
            {trigger}
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <div className="">{content}</div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default TooltipCustom;
