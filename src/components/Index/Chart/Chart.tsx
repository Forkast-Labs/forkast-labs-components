import React from 'react';
import numbro from 'numbro';
import { ChangeState, PossibleTimeRanges } from 'types/ui';
import { useIndexesHistory } from 'api/indexes';
import { formatLargeNumber } from 'utils/formatting';
import { getDateTimeUTCTimestamp } from 'helpers/lightweight-chart';
import SeriesChart from 'components/common/Chart/SeriesChart/SeriesChart';
import { ChartTooltip } from 'components/common/Chart';

type Props = {
  symbol: string;
  title: string;
  timeRange: PossibleTimeRanges;
  state: ChangeState;
  chartFontSize?: number;
  chartHeight?: number;
};

export const Chart: React.FunctionComponent<Props> = ({
  symbol,
  title,
  timeRange,
  state,
  chartFontSize,
  chartHeight = 100,
}) => {
  const { data, isLoading } = useIndexesHistory({
    symbol,
    timeState: { timeRange, custom: null },
  });

  return (
    <SeriesChart
      chartHeight={chartHeight}
      type="Area"
      data={[
        {
          lineData:
            data?.map((item) => ({
              time: getDateTimeUTCTimestamp(item.startTime),
              value: item.startValue,
            })) ?? [],
          priceFormat: {
            type: 'custom',
            formatter: (price: number) =>
              `${numbro(price).format({
                average: true,
                mantissa: 2,
                optionalMantissa: true,
              })}`,
          },
          trend: state === 'negative' ? 'negative' : 'positive',
        },
      ]}
      isLoading={isLoading}
      tooltipComponent={(props) => (
        <ChartTooltip
          {...props}
          title={title}
          formatValue={(value) => formatLargeNumber(value, true)}
        />
      )}
      chartOptions={{
        isVisibleGrid: false,
        isVisibleLeftPriceScale: false,
        fontSize: chartFontSize,
      }}
    />
  );
};

export default React.memo(Chart);
