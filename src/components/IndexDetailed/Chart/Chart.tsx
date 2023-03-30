import React from 'react';
import SeriesChart from '../../../components/common/Chart/SeriesChart/SeriesChart';
import { ChartTooltip } from '../../../components/common/Chart';
import { ChangeState, TimeState } from '../../../types/ui';
import { useIndexesHistory } from '../../../api/indexes';
import { getDateTimeUTCTimestamp } from '../../../helpers/lightweight-chart';
import { formatLargeNumber } from '../../../utils/formatting';
import { DEFAULT_CHART_HEIGHT } from './config';

type Props = {
  title: string;
  symbol: string;
  timeState: TimeState;
  state: ChangeState;
  onPointHover?: (timestamp: number | null) => void;
};

export const Chart: React.FunctionComponent<Props> = React.memo(
  ({ title, symbol, timeState, state, onPointHover }) => {
    const { data: indexHistory, isLoading } = useIndexesHistory({
      symbol,
      timeState,
    });

    return (
      <SeriesChart
        chartHeight={DEFAULT_CHART_HEIGHT}
        type="Area"
        data={[
          {
            lineData:
              indexHistory?.map((item) => ({
                time: getDateTimeUTCTimestamp(item.startTime),
                value: item.startValue,
              })) ?? [],
            priceFormat: {
              type: 'price',
              minMove: 1,
              precision: 0,
            },
            trend: state === 'negative' ? 'negative' : 'positive',
          },
        ]}
        isLoading={isLoading}
        chartOptions={{ isVisibleGrid: false, hasWatermark: true }}
        tooltipComponent={(props) => (
          <ChartTooltip
            {...props}
            title={title}
            formatValue={(value) => formatLargeNumber(value, true)}
          />
        )}
        onPointHover={onPointHover}
      />
    );
  }
);
