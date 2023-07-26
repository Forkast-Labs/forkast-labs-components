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

import {
  BarPrice,
  BarPrices,
  DeepPartial,
  LineData,
  PriceFormat,
  SeriesMarker,
  Time,
} from "lightweight-charts";
import dayjs from "../../../../utils/dayjs";

export enum PriceScaleIds {
  LEFT = "left",
  RIGHT = "right",
}

export enum ChartColors {
  BLACK = "#434343",
  ORANGE = "#F19B10",
  BLUE = "#7cb5ec",
}

export type SeriesData = {
  lineData: LineData[];
  markers?: SeriesMarker<Time>[];
  trend?: Trend;
  label?: string;
  priceScaleId?: PriceScaleIds;
  color?: ChartColors;
  priceFormat?: DeepPartial<PriceFormat>;
};

export type Trend = "positive" | "negative";

export type TooltipCoordinates = {
  x: number;
  y: number;
};

export type PointValue = BarPrice | BarPrices | number | undefined;

export type TooltipData = {
  values: PointValue[];
  date: dayjs.Dayjs;
};

export type TooltipInfo = { coordinates: TooltipCoordinates } & TooltipData;
