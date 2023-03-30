import React from 'react';
import classNames from 'classnames';
import { IndexSummary } from '../../../../api/indexes';
import { formatLargeNumber } from '../../../../utils/formatting';
import { useTheme } from '../../../../hooks/useTheme';
import { Download } from '../../../common/ui/icons';
import { Triangle } from '../../../../components/common/Triangle/Triangle';
import { ContentLoader } from './ContentLoader/ContentLoader';
import { PriceChange } from './PriceChange/PriceChange';

type Props = {
  data?: IndexSummary;
  isLoading: boolean;
  onDownload: () => void;
};

export const Summary: React.FunctionComponent<Props> = ({
  data,
  isLoading,
  onDownload,
}) => {
  const { colors } = useTheme();
  if (isLoading || !data) {
    return <ContentLoader />;
  }

  const { endValue, change, percentChange, high, low } = data;

  return (
    <div className="fkl-flex fkl-flex-row fkl-justify-between fkl-gap-4">
      <div
        className={classNames(
          'fkl-flex fkl-flex-wrap fkl-items-center fkl-gap-2',
          'sm:fkl-gap-4'
        )}
      >
        <div
          className={classNames(
            'fkl-flex fkl-flex-row fkl-items-center fkl-gap-2',
            'sm:fkl-gap-4'
          )}
        >
          <div
            style={{ color: colors.text }}
            className={classNames(
              'fkl-text-[20px] fkl-leading-[24px] fkl-font-bold',
              'sm:fkl-text-[24px] sm:fkl-leading-[28px]',
              'lg:fkl-text-[56px] lg:fkl-leading-[64px]'
            )}
          >
            {formatLargeNumber(endValue, true)}
          </div>

          <PriceChange change={change} percentChange={percentChange} />
        </div>

        <div
          className={classNames(
            'fkl-flex fkl-flex-row fkl-items-center fkl-gap-2',
            'sm:fkl-gap-4'
          )}
        >
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
              <Triangle state={'positive'} />
              <div
                style={{ color: colors.text }}
                className={classNames(
                  'fkl-text-[12px] fkl-leading-[16px]',
                  'sm:fkl-text-[14px] sm:fkl-leading-[18px]',
                  'lg:fkl-text-[16px] lg:fkl-leading-[24px]'
                )}
              >
                {formatLargeNumber(high, true)}
              </div>
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
              <Triangle state={'negative'} />
              <div
                style={{ color: colors.text }}
                className={classNames(
                  'fkl-text-[12px] fkl-leading-[16px]',
                  'sm:fkl-text-[14px] sm:fkl-leading-[18px]',
                  'lg:fkl-text-[16px] lg:fkl-leading-[24px]'
                )}
              >
                {formatLargeNumber(low, true)}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="fkl-flex fkl-flex-row fkl-items-center fkl-justify-between fkl-gap-2">
        <div
          style={{ color: colors.text }}
          className={classNames(
            'fkl-hidden fkl-text-[16px] fkl-leading-[24px] fkl-font-bold',
            'md:fkl-block'
          )}
        >
          Download CSV
        </div>
        <div
          style={{ color: colors.text }}
          className="p-[5px] fkl-cursor-pointer"
          onClick={onDownload}
        >
          <Download />
        </div>
      </div>
    </div>
  );
};
