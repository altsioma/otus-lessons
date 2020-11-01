import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  AreaType,
  DatePeriodType,
  CurrencyAvaiableType,
  ColorSetType,
} from "@/types/";
import { getCurrentDate } from "@/utils/date";

export type SettingsState = {
  area: AreaType;
  period: DatePeriodType;
  currency: CurrencyAvaiableType;
  color: ColorSetType;
};

export type AreaAction = PayloadAction<AreaType>;
export type PeriodAction = PayloadAction<DatePeriodType>;
export type SettingsAction = PayloadAction<SettingsState>;
export type CurrecnyAction = PayloadAction<CurrencyAvaiableType>;
export type ColorSetAction = PayloadAction<ColorSetType>;

const initialState: SettingsState = {
  area: {
    width: 600,
    height: 300,
  },
  period: {
    from: "2020-07-01",
    to: getCurrentDate(),
  },
  currency: "RUB",
  color: "red",
};

export const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setColor: (state, action: ColorSetAction) => ({
      ...state,
      color: action.payload,
    }),
    setCurrency: (state, action: CurrecnyAction) => ({
      ...state,
      currency: action.payload,
    }),
    setSettings: (state, action: SettingsAction) => (state = action.payload),
    changeArea: (state, action: AreaAction) => ({
      ...state,
      area: action.payload,
    }),
    changePeriod: (state, action: PeriodAction) => ({
      ...state,
      period: action.payload,
    }),
  },
});

export const { reducer, actions } = settingsSlice;
