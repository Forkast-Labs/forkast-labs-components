import React from 'react';
import classNames from 'classnames';
import { ChangeState } from '../../../types/ui';

type Props = {
  state: ChangeState;
};

export const Triangle: React.FunctionComponent<Props> = ({ state }) => {
  return state === 'zero' ? (
    <div>&#45;</div>
  ) : (
    <div
      className={classNames(
        'fkl-w-0 fkl-h-0 fkl-border-x-8 fkl-border-x-transparent',
        {
          'fkl-border-t-[10px] fkl-border-t-red': state === 'negative',
          'fkl-border-b-[10px] fkl-border-b-green': state !== 'negative',
        }
      )}
    />
  );
};
