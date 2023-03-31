/*
 * Copyright (c) 2023 CryptoSlam, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  createChart,
  ISeriesApi,
  MouseEventParams,
  SeriesType,
  UTCTimestamp,
} from 'lightweight-charts';
import {
  buildDateFromTime,
  getPreviousYear,
} from '../../../../helpers/lightweight-chart';
import { useTheme } from '../../../../hooks/useTheme';
import { Loader } from '../../../../components/common/Loader/Loader';
import {
  SERIES_BASE_CONFIG,
  getChartBaseOptions,
  TITLE_WIDTH,
  ChartProps,
} from './configs';
import { buildTooltipData } from './helpers';
import { ChartTooltip } from './components/ChartTooltip/ChartTooltip';
import { PriceScaleIds, SeriesData, TooltipData, TooltipInfo } from './types';

type Props = {
  data: SeriesData[] | undefined;
  isLoading: boolean;
  title?: string;
  secondTitle?: string;
  type?: SeriesType;
  defaultRange?: 'content' | 'year';
  chartHeight?: number;
  hasWatermark?: boolean;
  tooltipComponent: React.FunctionComponent<Partial<TooltipData>>;
  chartOptions?: ChartProps;
  onPointHover?: (timestamp: number | null) => void;
};

export const SeriesChart: React.FunctionComponent<Props> = ({
  data,
  isLoading,
  type = 'Line',
  defaultRange = 'content',
  chartHeight = 278,
  chartOptions,
  tooltipComponent,
  hasWatermark = false,
  onPointHover,
}) => {
  const { colors } = useTheme();
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const [tooltipData, setTooltipData] = useState<TooltipInfo | null>(null);
  const shouldRenderRightPriceScale = useMemo(
    () =>
      Boolean(data?.some((item) => item.priceScaleId === PriceScaleIds.RIGHT)),
    [data]
  );
  const isEmpty = useMemo(
    () =>
      isLoading ? false : !data?.some((dataSet) => dataSet.lineData.length),
    [isLoading, data]
  );

  useEffect(() => {
    if (data && chartContainerRef?.current) {
      const chart = createChart(chartContainerRef.current, {
        ...getChartBaseOptions({
          isRightPriceScaleEnabled: shouldRenderRightPriceScale,
          backgrouldColor: colors.background,
          textColor: colors.text,
          watermarkColor: 'rgb(226 226 226 / 20%)',
          hasWatermark,
          ...chartOptions,
        }),
        height: chartHeight,
      });

      const chartSeries = data?.reduce(
        (result: ISeriesApi<SeriesType>[], seriesData) => {
          const newSeries = chart[
            type === 'Area' ? 'addAreaSeries' : 'addLineSeries'
          ](
            SERIES_BASE_CONFIG[type]({
              priceFormat: seriesData.priceFormat,
              color: seriesData.color,
              priceScaleId: seriesData.priceScaleId,
              trend: seriesData.trend,
            })
          );

          newSeries.setData(seriesData.lineData);

          return [...result, newSeries];
        },
        []
      );

      if (defaultRange === 'content') {
        chart.timeScale().fitContent();
      } else if (defaultRange === 'year') {
        const lastDataTime =
          data?.[0]?.lineData?.[data?.[0]?.lineData.length - 1]?.time;

        if (lastDataTime) {
          chart.timeScale().setVisibleRange({
            from: getPreviousYear(lastDataTime).unix() as UTCTimestamp,
            to: buildDateFromTime(lastDataTime).unix() as UTCTimestamp,
          });
        }
      }

      const handleResize = () => {
        const parentWidth =
          chartContainerRef?.current?.parentElement?.parentElement?.clientWidth;

        if (parentWidth) {
          chart.applyOptions({
            width: parentWidth - TITLE_WIDTH,
          });
        }
      };

      const onCrosshairMove = (event: MouseEventParams) => {
        setTooltipData(
          buildTooltipData(
            event,
            chartContainerRef,
            chart.priceScale().width(),
            chartSeries
          )
        );

        if (onPointHover && typeof event.time === 'number') {
          onPointHover(event.time);
        }
      };

      chart.subscribeCrosshairMove(onCrosshairMove);
      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
        chart.unsubscribeCrosshairMove(onCrosshairMove);

        // When chart data rebuild - we need to reset hover data
        if (onPointHover) {
          onPointHover(null);
        }

        chart?.remove();
      };
    }
  }, [data, shouldRenderRightPriceScale]);

  return (
    <div>
      <div className="fkl-flex fkl-flex-row fkl-relative fkl-flex-1 fkl-items-center">
        <div className="fkl-relative fkl-flex-1">
          {isEmpty ? (
            <div
              className="fkl-flex fkl-flex-col fkl-justify-center fkl-items-center"
              style={{ height: chartHeight }}
            >
              <div
                className="fkl-font-semibold fkl-text-[18px]"
                style={{ color: colors.text }}
              >
                No data available
              </div>
            </div>
          ) : isLoading ? (
            <div
              className="fkl-flex fkl-flex-col fkl-items-center fkl-justify-center"
              style={{ height: chartHeight }}
            >
              <Loader />
            </div>
          ) : (
            <div ref={chartContainerRef}></div>
          )}

          <ChartTooltip {...tooltipData?.coordinates}>
            {React.createElement(tooltipComponent, {
              values: tooltipData?.values,
              date: tooltipData?.date,
            })}
          </ChartTooltip>
        </div>
      </div>
    </div>
  );
};

export default SeriesChart;
