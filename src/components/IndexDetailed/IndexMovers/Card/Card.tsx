import React from 'react';
import classNames from 'classnames';
import { IndexChangeInfo } from '../../../../api/indexes';
import { CRYPTOSLAM } from '../../../../constants/links';
import { getChangeState } from '../../../../helpers/ui';
import { useTheme } from '../../../../hooks/useTheme';
import { formatePercentage } from '../../../../utils/formatting';
import { Triangle } from '../../../common/Triangle/Triangle';

type Props = {
  data: IndexChangeInfo;
};

export const Card: React.FunctionComponent<Props> = ({ data }) => {
  const { colors } = useTheme();
  const state = getChangeState(data.change);

  return (
    <div className="fkl-flex fkl-flex-col fkl-shrink-0 fkl-gap-1">
      <div className="fkl-flex fkl-flex-row fkl-bg-[#F5F5F5] fkl-rounded-lg">
        <a
          className={classNames(
            'fkl-flex fkl-flex-row fkl-items-center fkl-flex-1 fkl-gap-1 fkl-py-1 fkl-px-2 fkl-text-[#0A0A0A]',
            'hover:fkl-text-[#0A0A0A]',
            'lg:fkl-gap-2 lg:fkl-py-2 lg:fkl-px-4'
          )}
          href={`${CRYPTOSLAM}/${data.path}`}
          target="_blank"
        >
          {data.iconUrl ? (
            <div
              className={classNames(
                'fkl-relative fkl-flex fkl-items-center fkl-justify-center fkl-w-[12px] fkl-h-[12px] fkl-rounded-full fkl-overflow-hidden',
                'lg:fkl-w-[24px] lg:fkl-h-[24px]'
              )}
            >
              <img
                src={data.iconUrl}
                alt={data.name}
                sizes="(min-width: 1024px) 24px, 12px"
              />
            </div>
          ) : null}

          <div
            className={classNames(
              'fkl-text-[12px] fkl-leading-[12px] fkl-font-bold fkl-text-black',
              'lg:fkl-text-[16px] lg:fkl-leading-[24px]'
            )}
          >
            {data.name}
          </div>
        </a>
        {data.platformIconUrl ? (
          <div
            className={classNames(
              'fkl-flex fkl-items-center fkl-justify-center fkl-py-[2px] fkl-pl-1 fkl-pr-[2px] fkl-border-l fkl-border-divider',
              'lg:fkl-py-1 lg:fkl-pr-1 lg:fkl-pl-2'
            )}
          >
            <a
              href={`${CRYPTOSLAM}/blockchains/${data.platform}`}
              target="_blank"
            >
              <div
                className={classNames(
                  'fkl-relative fkl-flex fkl-items-center fkl-justify-center fkl-w-[12px] fkl-h-[12px] fkl-rounded-full fkl-overflow-hidden',
                  'lg:fkl-w-[24px] lg:fkl-h-[24px]'
                )}
              >
                <img
                  src={data.platformIconUrl}
                  alt={data.name}
                  sizes="(min-width: 1024px) 24px, 12px"
                />
              </div>
            </a>
          </div>
        ) : null}
      </div>
      <div
        className={classNames(
          'fkl-flex fkl-flex-row fkl-gap-3',
          'lg:fkl-gap-5'
        )}
      >
        <div
          style={{ color: colors.text }}
          className={classNames(
            'fkl-text-[12px] fkl-leading-[12px] fkl-font-bold',
            'lg:fkl-text-[16px] lg:fkl-leading-[24px]'
          )}
        >
          Basis Price
        </div>
        <div className="fkl-flex fkl-flex-row fkl-gap-1 fkl-items-center">
          <div
            className={classNames(
              'fkl-text-[12px] fkl-leading-[14px] fkl-font-bold',
              {
                'fkl-text-green': state === 'positive',
                'fkl-text-red': state === 'negative',
                'fkl-text-neutral': state === 'zero',
              },
              'lg:fkl-text-[16px] lg:fkl-leading-[24px]'
            )}
          >
            {formatePercentage(data.change)}
          </div>

          {state !== 'zero' ? <Triangle state={state} /> : null}
        </div>
      </div>
    </div>
  );
};
