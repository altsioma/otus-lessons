import { CurrencyState } from "@/store";
import { GraphDataType } from "@/types";
import {
  currencyToGraph,
  getMinMax,
} from "@/modules/Currency/services/Currency";

type MinMax = ReturnType<typeof getMinMax>;

export function selectCurrecnyToGraph(state: CurrencyState): GraphDataType {
  return currencyToGraph(state.currency.data, state.settings.area);
}

export function selectMinMax(state: CurrencyState): MinMax {
  return getMinMax(state.currency.data);
}
