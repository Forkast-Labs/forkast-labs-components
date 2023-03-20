import React from 'react';
import classNames from 'classnames';
import { DEFAULT_COLORS } from 'context/theme';
import { useTheme } from 'hooks/useTheme';
import { Alert } from 'components/common/ui/icons';

type Props = {
  reload: () => void;
};

export const ContentError: React.FunctionComponent<Props> = ({ reload }) => {
  const { colors } = useTheme();

  return (
    <div className="fkl-flex fkl-flex-col fkl-justify-center fkl-items-center fkl-flex-1 fkl-gap-3">
      <Alert />
      <div
        className="fkl-text-xs fkl-font-semibold"
        style={{ color: colors.text }}
      >
        Information could not load. Please try again.
      </div>
      <button
        className={classNames(
          'fkl-px-4 fkl-py-2 fkl-border fkl-rounded-lg fkl-text-base fkl-font-semibold',
          `fkl-bg-[${DEFAULT_COLORS.headline}] fkl-border-[${DEFAULT_COLORS.headline}]`
        )}
        style={{ color: colors.text }}
        onClick={reload}
      >
        Try again
      </button>
    </div>
  );
};
