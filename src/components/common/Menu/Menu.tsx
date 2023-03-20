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
