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
