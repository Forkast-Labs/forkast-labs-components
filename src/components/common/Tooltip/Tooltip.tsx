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
