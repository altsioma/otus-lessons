import * as faker from "faker";
import { formatCurrency } from "@/utils/format";
import { ICurrencyExchange } from "./Currency";

const currecnyValueMock = faker.random.number({
  min: 1,
  max: 100,
  precision: 0.001,
});

export const expectedFormatted = formatCurrency(currecnyValueMock);

export const period = { from: "2020-07-01", to: "2020-08-10" };

const ratesMock = { RUB: currecnyValueMock };

export const responseMock: ICurrencyExchange = {
  rates: {
    "2020-07-16": ratesMock,
  },
  start_at: period.from,
  base: "EUR",
  end_at: period.to,
};
