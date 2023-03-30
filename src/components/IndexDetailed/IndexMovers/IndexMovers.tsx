import React, { useState } from 'react';
import classNames from 'classnames';
import { useTheme } from '../../../hooks/useTheme';
import { useIndexChanges } from '../../../api/indexes';
import { TimeState } from '../../../types/ui';
import { Loader } from '../../common/Loader/Loader';
import { Tabs } from './constants';
import { getPointKey } from './helpers';
import { Card } from './Card/Card';

type Props = {
  symbol: string;
  timeState: TimeState;
  point?: number | null;
};

const TABS_MAP: Record<Tabs, 'increase' | 'decrease'> = {
  gainers: 'increase',
  declainers: 'decrease',
};

export const IndexMovers: React.FunctionComponent<Props> = React.memo(
  ({ symbol, timeState, point }) => {
    const { colors } = useTheme();
    const [tab, setTab] = useState<Tabs>('gainers');
    const { data, isLoading } = useIndexChanges({
      symbol,
      timeState,
    });

    const key = getPointKey(point);
    const movers = data?.[key]?.[TABS_MAP[tab]];

    return (
      <div
        className={classNames(
          'fkl-flex fkl-flex-col fkl-gap-4',
          'lg:fkl-gap-8'
        )}
      >
        <div className="fkl-flex fkl-flex-row fkl-gap-6">
          <div
            style={{ color: colors.text }}
            className={classNames(
              'fkl-text-[16px] fkl-leading-[20px] fkl-font-semibold fkl-cursor-pointer fkl-pb-1',
              tab === 'gainers' ? 'fkl-border-b-4 fkl-border-[#61E085]' : '',
              'lg:fkl-text-[24px] lg:fkl-leading-[32px]'
            )}
            onClick={() => setTab('gainers')}
          >
            Notable Gainers
          </div>
          <div className="fkl-w-px fkl-bg-divider" />
          <div
            style={{ color: colors.text }}
            className={classNames(
              'fkl-text-[16px] fkl-leading-[20px] fkl-font-semibold fkl-cursor-pointer fkl-pb-1',
              tab === 'declainers' ? 'fkl-border-b-4 fkl-border-[#FD2F2F]' : '',
              'lg:fkl-text-[24px] lg:fkl-leading-[32px]'
            )}
            onClick={() => setTab('declainers')}
          >
            Notable Decliners
          </div>
        </div>

        <div
          className={classNames(
            'fkl-flex fkl-flex-row fkl-flex-nowrap fkl-flex-1 fkl-shrink-0 fkl-overflow-auto fkl-gap-3 fkl-scrollbar-none',
            'lg:fkl-gap-8'
          )}
        >
          {movers?.length ? (
            movers.map((mover) => <Card key={mover.path} data={mover} />)
          ) : (
            <div
              style={{ color: colors.text }}
              className={classNames(
                'fkl-flex fkl-flex-1 fkl-items-center fkl-justify-center fkl-text-[16px] fkl-font-semibold fkl-italic',
                'lg:fkl-text-[20px]'
              )}
            >
              {isLoading ? (
                <Loader />
              ) : !point ? (
                'Please move cursor over chart to view data.'
              ) : (
                `Sorry, we're having trouble loading this information.`
              )}
            </div>
          )}
        </div>
      </div>
    );
  }
);
