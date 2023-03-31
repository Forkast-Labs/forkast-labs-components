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
import { formatCurrency } from '../../../../utils/formatting';
import { TooltipData } from '../SeriesChart/types';

type Props = Partial<TooltipData> & {
  title: string;
  formatValue?: (value: number) => string | number;
};

export const ChartTooltip: React.FunctionComponent<Props> = ({
  values,
  date,
  title,
  formatValue = (value) => formatCurrency(value),
}) => {
  if (typeof values?.[0] !== 'number' || date === undefined) {
    return <div>N/A</div>;
  }

  return (
    <div className="fkl-flex fkl-flex-col fkl-px-2 fkl-py-1 fkl-bg-[#FCFDFC] fkl-rounded-[4px] fkl-text-black fkl-text-[14px] fkl-border fkl-border-grey">
      <div className="fkl-flex fkl-flex-row fkl-justify-between">
        <div>
          <b>{date.format('MMMM D, YYYY')}</b>
        </div>
        <div>{date.format('hh:mma')}</div>
      </div>
      <div>
        {title}: <b>{formatValue(values[0])}</b>
      </div>
    </div>
  );
};
