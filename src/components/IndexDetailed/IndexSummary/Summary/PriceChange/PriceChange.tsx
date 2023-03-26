import React from 'react';
import classNames from 'classnames';
import { getChangeState } from '../../../../../helpers/ui';
import {
  formatePercentage,
  formatLargeNumber,
} from '../../../../../utils/formatting';

type Props = {
  change: number;
  percentChange: number;
};

export const PriceChange: React.FunctionComponent<Props> = ({
  change,
  percentChange,
}) => {
  const state = getChangeState(percentChange);

  return (
    <div
      className={classNames(
        'fkl-flex fkl-flex-row fkl-items-center fkl-gap-1 fkl-text-center fkl-text-[16px] fkl-leading-[18px] fkl-font-semibold',
        'lg:fkl-text-[32px] lg:fkl-leading-[40px]',
        {
          'fkl-text-green': state === 'positive',
          'fkl-text-red': state === 'negative',
          'fkl-text-neutral': state === 'zero',
        }
      )}
    >
      {state === 'negative' ? '-' : state === 'positive' ? '+' : ''}
      {formatLargeNumber(Math.abs(change))} (
      {formatePercentage(Math.abs(percentChange))})
    </div>
  );
};
