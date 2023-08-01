/*
 * Copyright (c) 2023 CryptoSlam, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React, { useCallback, useEffect, useState } from "react";
import { Dayjs } from "dayjs";
import { DEFAULT_TIME_STATE, TIME_WITH_REFETCH } from "../../constants/ui";
import { useIndexesSummaries } from "../../api/indexes";
import { PossibleTimeRanges, TimeState } from "../../types/ui";
import { useTheme } from "../../hooks/useTheme";
import { getChangeState } from "../../helpers/ui";
import { QueryProvider } from "../../components/common/QueryProvider/QueryProvider";
import { Control } from "./Control/Control";
import { Chart } from "./Chart/Chart";
import { IndexMovers } from "./IndexMovers/IndexMovers";
import { IndexDetailedProps } from "./IndexDetailed.types";
import { Summary } from "./Summary/Summary";
import { News } from "./News/News";
import useMediaQuery from "../../hooks/useMediaQuery";

const IndexDetailedUI: React.FC<IndexDetailedProps> = ({ symbol }) => {
  const { colors } = useTheme();
  const [isTopMoversEnabled, setIsTopMoversEnabled] = useState(false);
  const [isNewsEnabled, setIsNewsEnabled] = useState(false);
  const [timeState, setState] = useState<TimeState>(DEFAULT_TIME_STATE);
  const [point, setPoint] = useState<number | null>();
  const [pinnedMarkerId, setPinnedMarkerId] = useState<string>();
  // We should disable news for mobile devices
  const isNewsAllowed = useMediaQuery(`(min-width: 1024px)`);

  const { data, isLoading, dataUpdatedAt } = useIndexesSummaries({
    symbols: [symbol],
    timeState,
    shouldRefetch: TIME_WITH_REFETCH.includes(timeState.timeRange ?? ""),
  });

  const onTimeRangeSelect = (timeRange: PossibleTimeRanges) =>
    setState({ timeRange, custom: null });

  const onCustomTimeRangeSelect = (startTime: Dayjs, endTime: Dayjs) =>
    setState({ timeRange: null, custom: { startTime, endTime } });

  const makeNewsSwitch = (checked: boolean) => {
    setIsNewsEnabled(checked);

    if (!checked) {
      if (pinnedMarkerId) {
        setPinnedMarkerId(undefined);
      }

      if (!isTopMoversEnabled) {
        setPoint(null);
      }
    }
  };

  const makeMoversSwitch = (checked: boolean) => {
    setIsTopMoversEnabled(checked);

    if (!checked && !isNewsEnabled) {
      setPoint(null);
    }
  };

  const pointSelect = useCallback((timestamp: number | null) => {
    if (point !== timestamp) {
      setPoint(timestamp);
    }
  }, []);

  useEffect(() => {
    if (!isNewsAllowed && isNewsEnabled) {
      setIsNewsEnabled(false);
      setPinnedMarkerId(undefined);
    }
  }, [isNewsAllowed]);

  return (
    <div
      className="fkl-flex fkl-flex-col fkl-gap-4 fkl-py-6"
      style={{ backgroundColor: colors.background }}
    >
      <div className="fkl-flex fkl-flex-col fkl-gap-4">
        <Control
          isLoading={isLoading}
          dataUpdatedAt={dataUpdatedAt}
          timeState={timeState}
          isTopMoversEnabled={isTopMoversEnabled}
          isNewsEnabled={isNewsEnabled}
          onTopMoversToggle={makeMoversSwitch}
          onNewsToggle={makeNewsSwitch}
          onTimeRangeSelect={onTimeRangeSelect}
          onCustomTimeRangeSelect={onCustomTimeRangeSelect}
        />

        <div className="fkl-flex fkl-flex-row fkl-max-h-[393px]">
          <div className="fkl-flex-[2] fkl-flex fkl-flex-col fkl-gap-4">
            <Summary data={data?.[0]} isLoading={isLoading} />

            <div>
              <Chart
                title={data?.[0].name ?? ""}
                symbol={symbol}
                state={getChangeState(data?.[0].percentChange ?? 0)}
                timeState={timeState}
                isNewsEnabled={isNewsEnabled}
                onPointHover={
                  isTopMoversEnabled || isNewsEnabled ? pointSelect : undefined
                }
                onChartClick={setPinnedMarkerId}
              />
            </div>
          </div>

          {isNewsEnabled ? (
            <div className="fkl-flex-1">
              <News
                symbol={symbol}
                timeState={timeState}
                clickedDatePoint={pinnedMarkerId}
              />
            </div>
          ) : null}
        </div>
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
