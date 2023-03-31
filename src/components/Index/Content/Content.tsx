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
import { FORKAST_WEB_URL } from '../../../constants/variables';
import { formatLargeNumber } from '../../../utils/formatting';
import { IndexSummary } from '../../../api/indexes';
import { useTheme } from '../../../hooks/useTheme';
import { Loader } from './Loader/Loader';
import { PriceChange } from './PriceChange/PriceChange';

type Props = {
  info?: IndexSummary;
  isLoading?: boolean;
};

export const Content: React.FC<Props> = ({ info, isLoading }) => {
  const { colors } = useTheme();

  if (isLoading) {
    return <Loader />;
  }

  if (!info) {
    return null;
  }

  const { name, symbol, endValue, percentChange, high, low } = info;

  return (
    <>
      <a href={`${FORKAST_WEB_URL}/topic/index/${symbol.toLowerCase()}`}>
        <div
          className={classNames(
            'fkl-font-bold fkl-text-[16px] fkl-leading-[21px]',
            'sm:fkl-text-[26px] sm:fkl-leading-[33px]',
            'md:fkl-text-[32px] md:fkl-leading-[40px]'
          )}
          style={{ color: colors.text }}
        >
          {name}
        </div>
      </a>
      <div
        className={classNames(
          'fkl-flex fkl-flex-row fkl-content-between fkl-items-center fkl-gap-2',
          'md:fkl-gap-5'
        )}
      >
        <div
          className={classNames(
            'fkl-font-bold fkl-text-[20px] fkl-leading-[18px]',
            'sm:fkl-text-[32px] sm:fkl-leading-[29px]',
            'md:fkl-text-[40px] md:fkl-leading-[36px]'
          )}
          style={{ color: colors.text }}
        >
          {formatLargeNumber(endValue, true)}
        </div>

        <PriceChange change={percentChange} />

        <div
          className={classNames(
            'fkl-flex fkl-flex-col fkl-text-[8px] fkl-leading-[8px]',
            'sm:fkl-text-[13px] sm:fkl-leading-[13px]',
            'md:fkl-text-[16px] md:fkl-leading-[16px]'
          )}
        >
          <div
            className="fkl-font-bold fkl-text-right"
            style={{ color: colors.text }}
          >
            HIGH
          </div>
          <div className="fkl-flex fkl-flex-row fkl-items-center fkl-gap-2">
            <div className="fkl-font-semibold" style={{ color: colors.text }}>
              {formatLargeNumber(high, true)}
            </div>
          </div>
        </div>
        <div
          className={classNames(
            'fkl-flex fkl-flex-col fkl-text-[8px] fkl-leading-[8px]',
            'sm:fkl-text-[13px] sm:fkl-leading-[13px]',
            'md:fkl-text-[16px] md:fkl-leading-[16px]'
          )}
        >
          <div
            className="fkl-font-bold fkl-text-right"
            style={{ color: colors.text }}
          >
            LOW
          </div>
          <div className="fkl-flex fkl-flex-row fkl-items-center fkl-gap-2">
            <div className="fkl-font-semibold" style={{ color: colors.text }}>
              {formatLargeNumber(low, true)}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
