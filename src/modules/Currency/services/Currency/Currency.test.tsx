import {
  ratesToCurrency,
  normalize,
  getCurrencyFromApi,
  currencyToGraph,
} from "./index";
import {
  responseMock,
  period,
  expectedFormatted,
} from "@/modules/Currency/services/mock";

describe("Currency services tests cases", () => {
  global.fetch = jest.fn().mockResolvedValue({
    json: () => responseMock,
  });

  it("Is fetching data work correct", async () => {
    expect(
      await getCurrencyFromApi("RUB", period).then((data) => data)
    ).toEqual(responseMock);
  });

  it("Convert raw data respinse for RUB rates working corect", () => {
    expect(ratesToCurrency(responseMock.rates, "RUB")).toEqual(
      expect.arrayContaining([expectedFormatted])
    );
  });
  it("Convert currency rates format to svg is working correct", () => {
    expect(currencyToGraph([60, 80, 90], { width: 600, height: 300 })).toEqual([
      [65, 300],
      [243.33333333333334, 200],
      [421.6666666666667, 0],
    ]);
  });

  it("Convert currency rates for empty values is working correct and don`t crash", () => {
    expect(currencyToGraph([], { width: 600, height: 300 })).toEqual([]);
  });
  it("Normalize for value=1 and range min=10 and max=100 is 0", () => {
    expect(normalize(10, 10, 100)).toBe(0);
  });
  it("Normalize for value=100 and range min=10 and max=100 is 1", () => {
    expect(normalize(100, 10, 100)).toBe(1);
  });
  it("Normalize for value=1000 and range min=10 and max=100 is 11", () => {
    expect(normalize(1000, 10, 100)).toBe(11);
  });
});
