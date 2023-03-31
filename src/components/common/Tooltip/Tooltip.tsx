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

import React, { useState } from 'react';
import classNames from 'classnames';

type Props = {
  children: React.ReactNode;
  content: string | React.ReactNode;
};

export const Tooltip: React.FC<Props> = ({ children, content }) => {
  const [active, setActive] = useState(false);

  const showTip = () => {
    setActive(true);
  };

  const hideTip = () => {
    setActive(false);
  };

  return (
    <div
      className="fkl-inline-block fkl-relative"
      onMouseEnter={showTip}
      onMouseLeave={hideTip}
    >
      {children}

      {active && (
        <div
          className={classNames(
            'fkl-absolute fkl-z-20 fkl-translate-y-[-85px] fkl-bg-tooltip fkl-rounded fkl-px-2 fkl-py-1 fkl-w-max fkl-max-w-[300px]',
            'fkl-text-white fkl-text-[10px] fkl-leading-[14px] fkl-break-words fkl-font-medium'
          )}
        >
          {content}
        </div>
      )}
    </div>
  );
};
