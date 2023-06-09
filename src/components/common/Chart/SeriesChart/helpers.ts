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

import React from 'react';
import {
  isBusinessDay,
  ISeriesApi,
  MouseEventParams,
  SeriesType,
} from 'lightweight-charts';
import dayjs from '../../../../utils/dayjs';
import { businessDayToString } from '../../../../helpers/lightweight-chart';
import { TOOLTIP_HEIGHT, TOOLTIP_MARGIN, TOOLTIP_WIDTH } from './configs';

export const buildTooltipData = (
  event: MouseEventParams,
  container: React.RefObject<HTMLDivElement>,
  priceScaleWidth: number,
  chartSeries: ISeriesApi<SeriesType>[]
) => {
  if (
    !event.time ||
    !event.point ||
    !container?.current ||
    event.point.x < 0 ||
    event.point.x > container.current.clientWidth ||
    event.point.y < 0 ||
    event.point.y > container.current.clientHeight
  ) {
    return null;
  } else {
    let left = event.point.x + priceScaleWidth + TOOLTIP_MARGIN;
    let top = event.point.y + TOOLTIP_MARGIN;

    if (left > container.current.clientWidth - TOOLTIP_WIDTH) {
      left = event.point.x + priceScaleWidth - TOOLTIP_MARGIN - TOOLTIP_WIDTH;
    }

    if (top > container.current.clientHeight - TOOLTIP_HEIGHT) {
      top = event.point.y - TOOLTIP_HEIGHT - TOOLTIP_MARGIN;
    }

    const date = isBusinessDay(event.time)
      ? businessDayToString(event.time)
      : dayjs(event.time * 1000).utc();
    const values = chartSeries.map((chartSeries) =>
      event.seriesPrices.get(chartSeries)
    );

    return {
      coordinates: { x: top, y: left },
      values: values,
      date: date,
    };
  }
};
