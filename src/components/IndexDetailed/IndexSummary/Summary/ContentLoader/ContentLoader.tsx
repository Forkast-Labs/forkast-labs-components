import React from 'react';
import classNames from 'classnames';
import { useTheme } from '../../../../../hooks/useTheme';

export const ContentLoader: React.FunctionComponent = () => {
  const { colors } = useTheme();

  return (
    <div
      className={classNames(
        'fkl-flex fkl-flex-row fkl-items-center fkl-gap-5',
        'sm:fkl-gap-8',
        'lg:fkl-gap-9'
      )}
    >
      <div
        className={classNames(
          'fkl-bg-grey fkl-animate-pulse fkl-h-[24px] fkl-w-[90px] fkl-rounded-3xl',
          'sm:fkl-h-[28px] sm:fkl-w-[120px]',
          'lg:fkl-h-[64px] lg:fkl-w-[250px]'
        )}
      />
      <div
        className={classNames(
          'fkl-bg-grey fkl-animate-pulse fkl-h-[18px] fkl-w-[78px] fkl-rounded-3xl',
          'lg:fkl-h-[40px] lg:fkl-w-[130px]'
        )}
      />
      <div className="fkl-flex fkl-flex-col">
        <div
          style={{ color: colors.text }}
          className={classNames(
            'fkl-font-semibold fkl-text-[12px] fkl-leading-[16px]',
            'sm:fkl-text-[14px] sm:fkl-leading-[18px]',
            'lg:fkl-text-[16px] lg:fkl-leading-[24px]'
          )}
        >
          HIGH
        </div>
        <div className="fkl-flex fkl-flex-row fkl-items-center fkl-gap-2">
          <div
            className={classNames(
              'fkl-bg-grey fkl-animate-pulse fkl-h-[18px] fkl-w-[42px] fkl-rounded-3xl',
              'lg:fkl-h-[24px] lg:fkl-w-[70px]'
            )}
          />
        </div>
      </div>
      <div className="fkl-flex fkl-flex-col">
        <div
          style={{ color: colors.text }}
          className={classNames(
            'fkl-font-semibold fkl-text-[12px] fkl-leading-[16px]',
            'sm:fkl-text-[14px] sm:fkl-leading-[18px]',
            'lg:fkl-text-[16px] lg:fkl-leading-[24px]'
          )}
        >
          LOW
        </div>
        <div className="fkl-flex fkl-flex-row fkl-items-center fkl-gap-2">
          <div
            className={classNames(
              'fkl-bg-grey fkl-animate-pulse fkl-h-[18px] fkl-w-[42px] fkl-rounded-3xl',
              'lg:fkl-h-[24px] lg:fkl-w-[70px]'
            )}
          />
        </div>
      </div>
    </div>
  );
};
