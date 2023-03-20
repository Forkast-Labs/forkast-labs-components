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
