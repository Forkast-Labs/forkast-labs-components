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
import { useTheme } from '../../../../hooks/useTheme';

type Props = {
  title: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
};

export const IosSwitch: React.FC<Props> = ({ title, checked, onChange }) => {
  const { colors } = useTheme();

  return (
    <label className="fkl-flex fkl-items-center fkl-space-x-4 fkl-cursor-pointer fkl-shrink-0">
      <span
        style={{ color: colors.text }}
        className={classNames(
          'fkl-text-[12px] fkl-leading-[16px] fkl-font-semibold',
          'lg:fkl-text-[20px] lg:fkl-leading-[32px]'
        )}
      >
        {title}
      </span>
      <div
        className={classNames(
          'fkl-relative fkl-inline-block fkl-w-12 fkl-h-6',
          'lg:fkl-w-[70px] lg:fkl-h-8'
        )}
      >
        <input
          type="checkbox"
          checked={checked}
          onChange={(event) => onChange(event.target.checked)}
          className={classNames(
            'fkl-absolute fkl-w-full fkl-h-full fkl-rounded-full fkl-appearance-none fkl-cursor-pointer fkl-transition-colors fkl-ease-in-out fkl-duration-200 fkl-bg-gray-200',
            'focus:fkl-outline-none focus:fkl-shadow-outline-purple'
          )}
        />
        <div
          style={{ backgroundColor: checked ? colors.headline : '#888888' }}
          className="fkl-absolute fkl-inset-0 fkl-w-full fkl-h-full fkl-rounded-full fkl-transition-colors fkl-ease-in-out fkl-duration-200"
        />
        <div
          style={{ backgroundColor: checked ? '#FFFFFF' : colors.headline }}
          className={classNames(
            'fkl-absolute fkl-inset-y-0 fkl-left-0 fkl-w-[18px] fkl-h-[18px] fkl-m-[3px] fkl-rounded-full fkl-transition-transform fkl-duration-200 fkl-transform',
            checked
              ? 'fkl-translate-x-[23px] lg:fkl-translate-x-[38px]'
              : 'fkl-translate-x-0',
            'fkl-bg-white fkl-shadow-md',
            'lg:fkl-w-6 lg:fkl-h-6 lg:fkl-m-1'
          )}
        />
      </div>
    </label>
  );
};
