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

import React from 'react';
import classNames from 'classnames';
import { TIME_RANGE } from '../../../../constants/ui';
import { useTheme } from '../../../../hooks/useTheme';
import { PossibleTimeRanges } from '../../../../types/ui';

type Props = {
  selectedTimeRange: PossibleTimeRanges | null;
  onSelect: (timeRange: PossibleTimeRanges) => void;
};

export const Periods: React.FunctionComponent<Props> = ({
  selectedTimeRange,
  onSelect,
}) => {
  const { colors } = useTheme();

  return (
    <div className="fkl-flex fkl-flex-row fkl-gap-2">
      {TIME_RANGE.map((timeRange) => (
        <div
          style={
            selectedTimeRange === timeRange.id
              ? { color: colors.background, backgroundColor: colors.headline }
              : { color: colors.text }
          }
          className={classNames(
            'fkl-font-bold fkl-text-[8px] fkl-leading-[10x] fkl-uppercase fkl-cursor-pointer fkl-py-1 fkl-px-[6px]',
            { ['fkl-rounded-lg']: selectedTimeRange === timeRange.id },
            'sm:fkl-text-[12px] sm:fkl-leading-[14px]',
            'lg:fkl-text-[16px] lg:fkl-leading-[24px]'
          )}
          key={timeRange.id}
          onClick={() => onSelect(timeRange.id)}
        >
          {timeRange.title}
        </div>
      ))}
    </div>
  );
};
