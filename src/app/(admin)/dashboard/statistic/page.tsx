import { SummaryStatistic } from "./summary";
import { OrderStatisticByMonth } from "./order-by-month";
import { RevenueByMonth } from "./revenue-by-month";
import { TotalRevenue } from "./total-revenue";

const StatisticPage = () => {
  return (
    <div className="space-y-4">
      <SummaryStatistic />

      <RevenueByMonth />
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
