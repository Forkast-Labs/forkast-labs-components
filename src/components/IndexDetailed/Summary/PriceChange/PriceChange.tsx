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
import { getChangeState } from '../../../../helpers/ui';
import {
  formatePercentage,
  formatLargeNumber,
} from '../../../../utils/formatting';

type Props = {
  change: number;
  percentChange: number;
};

export const PriceChange: React.FunctionComponent<Props> = ({
  change,
  percentChange,
}) => {
  const state = getChangeState(percentChange);

  return (
    <div
      className={classNames(
        'fkl-flex fkl-flex-row fkl-items-center fkl-gap-1 fkl-text-center fkl-text-[16px] fkl-leading-[18px] fkl-font-semibold',
        'lg:fkl-text-[32px] lg:fkl-leading-[40px]',
        {
          'fkl-text-green': state === 'positive',
          'fkl-text-red': state === 'negative',
          'fkl-text-neutral': state === 'zero',
        }
      )}
    >
      {state === 'negative' ? '-' : state === 'positive' ? '+' : ''}
      {formatLargeNumber(Math.abs(change))} (
      {formatePercentage(Math.abs(percentChange))})
    </div>
  );
};
