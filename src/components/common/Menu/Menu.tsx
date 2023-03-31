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

import React, { useRef, useState } from 'react';
import classNames from 'classnames';
import { useTheme } from '../../../hooks/useTheme';
import { Arrow } from '../../../components/common/ui/icons';
import { Dropdown } from './Dropdown/Dropdown';

type Props<T> = {
  children: React.ReactNode;
  items: { id: T; title: string }[];
  selected: T | null;
  onClick: (value: T) => void;
};

export const Menu = <T extends string>({
  children,
  items,
  selected,
  onClick,
}: Props<T>) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const { colors } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const close = () => {
    setIsOpen(false);
  };

  return (
    <div className="fkl-relative" ref={menuRef}>
      <div
        className={classNames(
          'fkl-flex fkl-flex-row fkl-gap-1 fkl-text-[9px] fkl-leading-[12px] fkl-items-center fkl-font-bold fkl-underline fkl-cursor-pointer',
          'md:fkl-text-xs'
        )}
        style={{ color: colors.text }}
        onClick={() => setIsOpen(!isOpen)}
      >
        {children}
        {isOpen ? <Arrow className="fkl-rotate-180" /> : <Arrow />}
      </div>

      {isOpen ? (
        <Dropdown
          menuRef={menuRef}
          items={items}
          selected={selected}
          close={close}
          onClick={onClick}
        />
      ) : null}
    </div>
  );
};
