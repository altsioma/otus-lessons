import { createAction, createSlice, PayloadAction } from "@reduxjs/toolkit";

export type CurrencyAction = PayloadAction<State>;
type State = {
  loading: boolean;
  data: number[];
  error: string | null;
};

export const initialState: State = {
  loading: false,
  data: [],
  error: null,
};

export const fetchCurrency = createAction("currency/fetch_start");
export const currencySlice = createSlice({
  name: "currency",
  initialState,
  reducers: {
    pending: (state) => ({ ...state, loading: true }),
    rejected: (state, action) => ({
      ...state,
      loading: false,
      error: action.payload ? action.payload : "",
    }),
    fulfilled: (state, action) => ({
      ...state,
      loading: false,
      data: action.payload,
    }),
  },
});

export const { reducer, actions } = currencySlice;
