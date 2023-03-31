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
import { useTheme } from '../../../../../hooks/useTheme';

export const ContentLoader: React.FunctionComponent = () => {
  const { colors } = useTheme();

  return (
    <div
      className={classNames(
        'fkl-flex fkl-flex-row fkl-items-center fkl-gap-5',
        'sm:fkl-gap-8',
        'lg:fkl-gap-9'
      )}
    >
      <div
        className={classNames(
          'fkl-bg-grey fkl-animate-pulse fkl-h-[24px] fkl-w-[90px] fkl-rounded-3xl',
          'sm:fkl-h-[28px] sm:fkl-w-[120px]',
          'lg:fkl-h-[64px] lg:fkl-w-[250px]'
        )}
      />
      <div
        className={classNames(
          'fkl-bg-grey fkl-animate-pulse fkl-h-[18px] fkl-w-[78px] fkl-rounded-3xl',
          'lg:fkl-h-[40px] lg:fkl-w-[130px]'
        )}
      />
      <div className="fkl-flex fkl-flex-col">
        <div
          style={{ color: colors.text }}
          className={classNames(
            'fkl-font-semibold fkl-text-[12px] fkl-leading-[16px]',
            'sm:fkl-text-[14px] sm:fkl-leading-[18px]',
            'lg:fkl-text-[16px] lg:fkl-leading-[24px]'
          )}
        >
          HIGH
        </div>
        <div className="fkl-flex fkl-flex-row fkl-items-center fkl-gap-2">
          <div
            className={classNames(
              'fkl-bg-grey fkl-animate-pulse fkl-h-[18px] fkl-w-[42px] fkl-rounded-3xl',
              'lg:fkl-h-[24px] lg:fkl-w-[70px]'
            )}
          />
        </div>
      </div>
      <div className="fkl-flex fkl-flex-col">
        <div
          style={{ color: colors.text }}
          className={classNames(
            'fkl-font-semibold fkl-text-[12px] fkl-leading-[16px]',
            'sm:fkl-text-[14px] sm:fkl-leading-[18px]',
            'lg:fkl-text-[16px] lg:fkl-leading-[24px]'
          )}
        >
          LOW
        </div>
        <div className="fkl-flex fkl-flex-row fkl-items-center fkl-gap-2">
          <div
            className={classNames(
              'fkl-bg-grey fkl-animate-pulse fkl-h-[18px] fkl-w-[42px] fkl-rounded-3xl',
              'lg:fkl-h-[24px] lg:fkl-w-[70px]'
            )}
          />
        </div>
      </div>
    </div>
  );
};
