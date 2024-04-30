import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { cn } from "~/lib/utils";
import { orderStatus } from "~/static";

export function OrderStatus() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const status = searchParams.get("orderStatus") || orderStatus[0].type;

  const handleSelectStatus = (status: string) => {
    const params = new URLSearchParams();
    params.set("orderStatus", status);
    router.replace(pathname + "?" + params.toString());
  };

  const renderStatus = ({
    type,
    typeName,
  }: {
    type: string;
    typeName: string;
  }) => {
    const isSelected = type === status;
    const className = isSelected
      ? "text-nowrap text-primary rounded-sm transition-all duration-200"
      : "cursor-pointer hover:text-primary";
    return (
      <div
        key={type}
        className={cn("w-full p-3 text-center text-sm font-bold", className)}
        onClick={() => handleSelectStatus(type)}
      >
        {typeName}
      </div>
    );
  };
  return (
    <div className="bg-white flex justify-between font-medium">
      {orderStatus.map(renderStatus)}
    </div>
  );
}
