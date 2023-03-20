import React from 'react';
import { TooltipCoordinates } from '../../types';

type Props = Partial<TooltipCoordinates> & {
  children: React.ReactNode;
};

export const ChartTooltip: React.FunctionComponent<Props> = ({
  x,
  y,
  children,
}) => {
  if (x === undefined || y === undefined) {
    return null;
  }

  return (
    <div
      className="fkl-absolute fkl-z-[2] fkl-min-w-[240px]"
      style={{ left: y, top: x }}
    >
      {children}
    </div>
  );
};
