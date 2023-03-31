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

import numbro from 'numbro';

export const formatLargeNumber = (
  value: number,
  includeDecimals: boolean = false,
  decimals: number = 2
) => {
  const formatter: numbro.Format = { thousandSeparated: true };

  if (includeDecimals) {
    formatter.mantissa = decimals;
  }

  return numbro(value).format(formatter);
};

export function formatCurrency(value: number | string, decimalPlaces?: number) {
  return numbro(value).formatCurrency({
    thousandSeparated: true,
    mantissa: decimalPlaces === undefined ? 2 : decimalPlaces,
  });
}

export function formatePercentage(value: number, thousandSeparated = false) {
  return numbro(value).format({
    output: 'percent',
    mantissa: 2,
    thousandSeparated,
  });
}
