import React from "react";
import Loading from "~/components/loading";

import { Button } from "~/components/ui/button";

const page = () => {
  return (
    <div className="bg-green-500 flex justify-center items-center flex-col gap-4">
      <div className="bg-blue-500 h-full flex-1 ">{}</div>
      <Button type="submit">Tìm kiếm</Button>

      <Loading />
    </div>
  );
};

export default page;
