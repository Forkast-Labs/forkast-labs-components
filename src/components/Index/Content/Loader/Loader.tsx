import React from 'react';
import classNames from 'classnames';
import { useTheme } from '../../../../hooks/useTheme';

export const Loader: React.FunctionComponent = () => {
  const { colors } = useTheme();

  return (
    <>
      <div
        className={classNames(
          'fkl-bg-grey fkl-animate-pulse fkl-h-[21px] fkl-w-32 fkl-rounded-3xl',
          'sm:fkl-h-[33px]',
          'md:fkl-h-[40px]'
        )}
      />
      <div className="fkl-flex fkl-flex-row fkl-content-between fkl-items-center fkl-gap-5">
        <div
          className={classNames(
            'fkl-bg-grey fkl-animate-pulse fkl-h-[18px] fkl-w-32 fkl-rounded-3xl',
            'sm:fkl-h-[29px]',
            'md:fkl-h-[36px]'
          )}
        />
        <div
          className={classNames(
            'fkl-bg-grey fkl-animate-pulse fkl-h-[15px] fkl-w-32 fkl-rounded-3xl',
            'sm:fkl-h-[25px]',
            'md:fkl-h-[30px]'
          )}
        />
        <div
          className={classNames(
            'fkl-flex fkl-flex-col fkl-text-[8px] fkl-leading-[8px]',
            'sm:fkl-text-[13px] sm:fkl-leading-[13px]',
            'md:fkl-text-[16px] md:fkl-leading-[16px]'
          )}
        >
          <div
            className="fkl-font-bold fkl-text-right"
            style={{ color: colors.text }}
          >
            HIGH
          </div>

          <div className="fkl-flex fkl-flex-row fkl-items-center fkl-gap-2">
            <div
              className={classNames(
                'fkl-bg-grey fkl-animate-pulse fkl-h-[8px] fkl-w-9 fkl-rounded-3xl',
                'sm:fkl-h-[13px]',
                'md:fkl-h-[16px]'
              )}
            />
          </div>
        </div>
        <div
          className={classNames(
            'fkl-flex fkl-flex-col fkl-text-[8px] fkl-leading-[8px]',
            'sm:fkl-text-[13px] sm:fkl-leading-[13px]',
            'md:fkl-text-[16px] md:fkl-leading-[16px]'
          )}
        >
          <div
            className="fkl-font-bold fkl-text-right"
            style={{ color: colors.text }}
          >
            LOW
          </div>
          <div className="fkl-flex fkl-flex-row fkl-items-center fkl-gap-2">
            <div
              className={classNames(
                'fkl-bg-grey fkl-animate-pulse fkl-h-[8px] fkl-w-9 fkl-rounded-3xl',
                'sm:fkl-h-[13px]',
                'md:fkl-h-[16px]'
              )}
            />
          </div>
        </div>
      </div>
    </>
  );
};
