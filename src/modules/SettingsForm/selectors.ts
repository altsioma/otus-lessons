import { CurrencyState } from "@/store";
import { DatePeriodType } from "@types";
import { CurrencyAvaiableType } from "@/types";

export const selectPeriod = (state: CurrencyState): DatePeriodType =>
  state.settings.period;

export const selectCurrentCurrency = (
  state: CurrencyState
): CurrencyAvaiableType => state.settings.currency;
