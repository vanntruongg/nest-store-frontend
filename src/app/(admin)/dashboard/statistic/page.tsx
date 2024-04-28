import SummaryStatistic from "./summary";
import OrderStatisticByMonth from "./order-by-month";
import Revenue from "./revenue";
import TotalRevenue from "./total-revenue";

const StatisticPage = () => {
  console.log("page re-render");

  return (
    <div className="space-y-4">
      <SummaryStatistic />

      <Revenue />
      <div className="grid grid-cols-3 gap-4">
        <TotalRevenue />
        <div className="col-span-2">
          <OrderStatisticByMonth />
        </div>
      </div>
    </div>
  );
};

export default StatisticPage;
