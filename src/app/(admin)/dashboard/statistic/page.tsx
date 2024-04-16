import { SummaryStatistic } from "./summary";
import { OrderStatisticByMonth } from "./order-by-month";

const StatisticPage = () => {
  return (
    <div className="space-y-4">
      <SummaryStatistic />

      <OrderStatisticByMonth />
    </div>
  );
};

export default StatisticPage;
