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
import { formatePercentage } from '../../../../utils/formatting';
import { getChangeState } from '../../../../helpers/ui';
import { Triangle } from '../../../../components/common/Triangle/Triangle';

type Props = {
  change: number;
};

export const PriceChange: React.FunctionComponent<Props> = ({ change }) => {
  const state = getChangeState(change);

  return (
    <div
      className={classNames(
        'fkl-font-semibold fkl-flex fkl-flex-row fkl-items-center fkl-gap-1 fkl-text-[15px] fkl-leading-[15px]',
        'sm:fkl-text-[24px] sm:fkl-leading-[25px]',
        'md:fkl-text-[30px] md:fkl-leading-[30px]',
        {
          'fkl-text-green': state === 'positive',
          'fkl-text-red': state === 'negative',
          'fkl-text-neutral': state === 'zero',
        }
      )}
    >
      <Triangle state={state} />

      {formatePercentage(Math.abs(change))}
    </div>
  );
};
