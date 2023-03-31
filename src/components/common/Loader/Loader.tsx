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

type Props = {
  className?: string;
};

export const Loader: React.FC<Props> = ({ className }) => {
  return (
    <div
      className={classNames(
        'fkl-inline-block fkl-box-border fkl-h-10 fkl-w-10 fkl-rounded-full fkl-border-[5px] fkl-border-white fkl-border-b-transparent fkl-animate-spin',
        className
      )}
    />
  );
};
