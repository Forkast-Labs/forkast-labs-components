import React, { useCallback, useState } from 'react';
import { Dayjs } from 'dayjs';
import { DEFAULT_TIME_STATE, TIME_WITH_REFETCH } from '../../constants/ui';
import { useIndexesSummaries } from '../../api/indexes';
import { PossibleTimeRanges, TimeState } from '../../types/ui';
import { useTheme } from '../../hooks/useTheme';
import { getChangeState } from '../../helpers/ui';
import { QueryProvider } from '../../components/common/QueryProvider/QueryProvider';
import { IndexSummary } from './IndexSummary/IndexSummary';
import { Chart } from './Chart/Chart';
import { IndexMovers } from './IndexMovers/IndexMovers';
import { IndexDetailedProps } from './IndexDetailed.types';

const IndexDetailedUI: React.FC<IndexDetailedProps> = ({ symbol }) => {
  const { colors } = useTheme();
  const [isTopMoversEnabled, setIsTopMoversEnabled] = useState(false);
  const [timeState, setState] = useState<TimeState>(DEFAULT_TIME_STATE);
  const [point, setPoint] = useState<number | null>();

  const { data, isLoading, dataUpdatedAt } = useIndexesSummaries({
    symbol,
    timeState,
    shouldRefetch: TIME_WITH_REFETCH.includes(timeState.timeRange ?? ''),
  });

  const onTimeRangeSelect = (timeRange: PossibleTimeRanges) =>
    setState({ timeRange, custom: null });

  const onCustomTimeRangeSelect = (startTime: Dayjs, endTime: Dayjs) =>
    setState({ timeRange: null, custom: { startTime, endTime } });

  const makeSwitch = (checked: boolean) => {
    setIsTopMoversEnabled(checked);

    if (!checked) {
      setPoint(null);
    }
  };

  const pointSelect = useCallback((timestamp: number | null) => {
    if (point !== timestamp) {
      setPoint(timestamp);
    }
  }, []);

  return (
    <div
      className="fkl-flex fkl-flex-col fkl-gap-4 fkl-py-6"
      style={{ backgroundColor: colors.background }}
    >
      <IndexSummary
        data={data}
        isLoading={isLoading}
        dataUpdatedAt={dataUpdatedAt}
        symbol={symbol}
        timeState={timeState}
        isTopMoversEnabled={isTopMoversEnabled}
        onToggle={makeSwitch}
        onTimeRangeSelect={onTimeRangeSelect}
        onCustomTimeRangeSelect={onCustomTimeRangeSelect}
      />

      <div>
        <Chart
          title={data?.[0].name ?? ''}
          symbol={symbol}
          state={getChangeState(data?.[0].percentChange ?? 0)}
          timeState={timeState}
          onPointHover={isTopMoversEnabled ? pointSelect : undefined}
        />
      </div>
      {isTopMoversEnabled ? (
        <IndexMovers symbol={symbol} timeState={timeState} point={point} />
      ) : null}
    </div>
  );
};

export const IndexDetailed: React.FC<IndexDetailedProps> = (props) => (
  <QueryProvider>
    <IndexDetailedUI key={props.symbol} {...props} />
  </QueryProvider>
);
