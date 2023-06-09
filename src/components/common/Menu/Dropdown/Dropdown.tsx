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
import { useOnClickOutside } from '../../../../hooks/useClickOutside';

type Props<T> = {
  items: { id: T; title: string }[];
  selected?: T | null;
  onClick: (value: T) => void;
  menuRef: React.RefObject<HTMLDivElement>;
  close: () => void;
};

export const Dropdown = <T extends string>({
  items,
  selected,
  onClick,
  menuRef,
  close,
}: Props<T>) => {
  useOnClickOutside(menuRef, close);

  const select = (value: T) => {
    onClick(value);
    close();
  };

  return (
    <ul
      className="fkl-absolute fkl-z-20 fkl-bg-white fkl-shadow-menu"
      style={{ right: `0px` }}
    >
      {items.map((item) => (
        <li
          key={item.id}
          className={classNames(
            'fkl-py-2 fkl-px-4 fkl-cursor-pointer fkl-text-right fkl-text-[12px] fkl-leading-[11px]',
            'md:fkl-text-[16px] md:fkl-leading-[15px]',
            'hover:fkl-text-primary',
            { 'fkl-font-bold': selected === item.id }
          )}
          onClick={() => select(item.id)}
        >
          {item.title}
        </li>
      ))}
    </ul>
  );
};
