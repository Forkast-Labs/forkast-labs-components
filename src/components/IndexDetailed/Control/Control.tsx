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

import React from "react";
import classNames from "classnames";
import { Dayjs } from "dayjs";
import { PossibleTimeRanges, TimeState } from "../../../types/ui";
import { useTheme } from "../../../hooks/useTheme";
import UserTime from "../../common/UserTime/UserTime";
import { Periods } from "./Periods/Periods";
import { IosSwitch } from "./IosSwitch/IosSwitch";
import { DatePicker } from "./DatePicker/DatePicker";
import { Checkbox } from "./Checkbox/Checkbox";

type Props = {
  isLoading: boolean;
  dataUpdatedAt: number;
  timeState: TimeState;
  isNewsEnabled: boolean;
  isTopMoversEnabled: boolean;
  onNewsToggle: (value: boolean) => void;
  onTopMoversToggle: (value: boolean) => void;
  onTimeRangeSelect: (period: PossibleTimeRanges) => void;
  onCustomTimeRangeSelect: (startTime: Dayjs, endTime: Dayjs) => void;
};

export const Control: React.FunctionComponent<Props> = ({
  isLoading,
  dataUpdatedAt,
  timeState,
  isTopMoversEnabled,
  isNewsEnabled,
  onNewsToggle,
  onTopMoversToggle,
  onTimeRangeSelect,
  onCustomTimeRangeSelect,
}) => {
  const { colors } = useTheme();

  return (
    <div className="fkl-flex fkl-flex-row fkl-items-center fkl-justify-between">
      <div
        style={{ color: colors.text }}
        className={classNames(
          "fkl-hidden fkl-font-black fkl-text-[16px] fkl-leading-[20px] fkl-uppercase",
          "lg:fkl-block"
        )}
      >
        {isLoading ? (
          <div
            className={
              "fkl-bg-grey fkl-animate-pulse fkl-rounded-3xl fkl-h-[20px] fkl-w-[100px]"
            }
          />
        ) : (
          <UserTime
            timestamp={dataUpdatedAt}
            format="[AS OF] MMMM D[,] YYYY h[:]mmA"
          />
        )}
      </div>

      <div
        className={classNames(
          "fkl-flex fkl-flex-row fkl-flex-wrap fkl-flex-1 fkl-justify-between fkl-gap-2",
          "lg:fkl-justify-end lg:fkl-gap-4"
        )}
      >
        <div className="fkl-hidden lg:fkl-flex">
          <Checkbox
            title="News"
            checked={isNewsEnabled}
            onChange={onNewsToggle}
          />
        </div>

        <IosSwitch
          title="Top 5 Movers"
          checked={isTopMoversEnabled}
          onChange={onTopMoversToggle}
        />

        <div className="fkl-flex fkl-flex-row fkl-gap-2 fkl-items-center">
          <Periods
            selectedTimeRange={timeState.timeRange}
            onSelect={onTimeRangeSelect}
          />

          <DatePicker
            timeState={timeState}
            onSelect={onCustomTimeRangeSelect}
          />
        </div>
      </div>
    </div>
  );
};
