import classNames from 'classnames';
import React from 'react';
import { TIME_RANGE } from '../../../../constants/ui';
import { useTheme } from '../../../../hooks/useTheme';
import { PossibleTimeRanges } from '../../../../types/ui';

type Props = {
  selectedTimeRange: PossibleTimeRanges | null;
  onSelect: (timeRange: PossibleTimeRanges) => void;
};

export const Periods: React.FunctionComponent<Props> = ({
  selectedTimeRange,
  onSelect,
}) => {
  const { colors } = useTheme();

  return (
    <div className="fkl-flex fkl-flex-row fkl-gap-2">
      {TIME_RANGE.map((timeRange) => (
        <div
          style={
            selectedTimeRange === timeRange.id
              ? { color: colors.background, backgroundColor: colors.headline }
              : { color: colors.text }
          }
          className={classNames(
            'fkl-font-bold fkl-text-[8px] fkl-leading-[10x] fkl-uppercase fkl-cursor-pointer fkl-py-1 fkl-px-[6px]',
            { ['fkl-rounded-lg']: selectedTimeRange === timeRange.id },
            'sm:fkl-text-[12px] sm:fkl-leading-[14px]',
            'lg:fkl-text-[16px] lg:fkl-leading-[24px]'
          )}
          key={timeRange.id}
          onClick={() => onSelect(timeRange.id)}
        >
          {timeRange.title}
        </div>
      ))}
    </div>
  );
};
