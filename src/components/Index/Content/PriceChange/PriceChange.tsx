import React from 'react';
import classNames from 'classnames';
import { formatePercentage } from '../../../../utils/formatting';
import { getChangeState } from '../../../../helpers/ui';
import { Triangle } from '../../../../components/common/Triangle/Triangle';

type Props = {
  change: number;
};

export const PriceChange: React.FunctionComponent<Props> = ({ change }) => {
  const state = getChangeState(change);

  return (
    <div
      className={classNames(
        'fkl-font-semibold fkl-flex fkl-flex-row fkl-items-center fkl-gap-1 fkl-text-[15px] fkl-leading-[15px]',
        'sm:fkl-text-[24px] sm:fkl-leading-[25px]',
        'md:fkl-text-[30px] md:fkl-leading-[30px]',
        {
          'fkl-text-green': state === 'positive',
          'fkl-text-red': state === 'negative',
          'fkl-text-neutral': state === 'zero',
        }
      )}
    >
      <Triangle state={state} />

      {formatePercentage(Math.abs(change))}
    </div>
  );
};
