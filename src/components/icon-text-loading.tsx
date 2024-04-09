import { Loader2 } from "lucide-react";
import React from "react";

function IconTextLoading() {
  return (
    <div className="flex items-center gap-1 text-muted-foreground text-sm">
      <Loader2 className="size-4 animate-spin" />
      <p>Loading...</p>
    </div>
  );
}

export default IconTextLoading;
