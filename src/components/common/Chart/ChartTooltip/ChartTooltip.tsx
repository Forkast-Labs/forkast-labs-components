import React from 'react';
import { formatCurrency } from '../../../../utils/formatting';
import { TooltipData } from '../SeriesChart/types';

type Props = Partial<TooltipData> & {
  title: string;
  formatValue?: (value: number) => string | number;
};

export const ChartTooltip: React.FunctionComponent<Props> = ({
  values,
  date,
  title,
  formatValue = (value) => formatCurrency(value),
}) => {
  if (typeof values?.[0] !== 'number' || date === undefined) {
    return <div>N/A</div>;
  }

  return (
    <div className="fkl-flex fkl-flex-col fkl-px-2 fkl-py-1 fkl-bg-[#FCFDFC] fkl-rounded-[4px] fkl-text-black fkl-text-[14px] fkl-border fkl-border-grey">
      <div className="fkl-flex fkl-flex-row fkl-content-between">
        <div>
          <b>{date.format('MMMM D, YYYY')}</b>
        </div>
        <div>{date.format('hh:mma')}</div>
      </div>
      <div>
        {title}: <b>{formatValue(values[0])}</b>
      </div>
    </div>
  );
};
