import {
  GraphDataType,
  AreaType,
  CurrencyAvaiableType,
  DatePeriodType,
} from "@/types";
import { http } from "@/utils/http";
import { formatCurrency } from "@/utils/format";
export interface IRates {
  [name: string]: { [key: string]: number };
}
export interface ICurrencyExchange {
  rates: IRates;
  start_at: string;
  base: string;
  end_at: string;
}

export const getCurrencyFromApi = (
  currency: CurrencyAvaiableType,
  period: DatePeriodType
): Promise<ICurrencyExchange> => {
  return http(
    `https://api.exchangeratesapi.io/history?start_at=${period.from}&end_at=${period.to}&symbols=${currency}`
  );
};

export const normalize = (value: number, min: number, max: number): number =>
  Math.abs((value - min) / (max - min));

export const ratesToCurrency = (
  rates: IRates,
  currency: CurrencyAvaiableType
): number[] =>
  Object.keys(rates)
    .sort()
    .map((date) => formatCurrency(rates[date][currency]));

export const getMinMax = (
  valuesArray: number[]
): Record<"min" | "max", number> => {
  const max = Math.max(...valuesArray);
  const min = Math.min(...valuesArray);
  return { min, max };
};

export const currencyToGraph = (
  data: number[],
  area: AreaType,
  offset = 65
): GraphDataType => {
  if (data.length) {
    const xInterval = (area.width - offset) / data.length;
    const minMax = getMinMax(data);
    return [...data]
      .reverse()
      .map((val, i) => [
        xInterval * i++ + offset,
        normalize(val, minMax.min, minMax.max) * area.height,
      ]);
  }
  return [];
};
