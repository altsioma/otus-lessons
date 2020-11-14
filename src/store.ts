import { combineReducers } from "redux";
import { createStore } from "redux-dynamic-modules";
import { getSagaExtension } from "redux-dynamic-modules-saga";

import { settingsSlice, getSettingsModule } from "@/modules/SettingsForm/";
import { currencySlice, getCurrencyModule } from "@/modules/Currency/";
import {
  animationSlice,
  getAnimationModule,
} from "@/modules/AnimationControls/";
import { loginSlice, getLoginModule } from "@/modules/Auth";

export const reducer = combineReducers({
  settings: settingsSlice.reducer,
  currency: currencySlice.reducer,
  animation: animationSlice.reducer,
  login: loginSlice.reducer,
});

export type CurrencyState = ReturnType<typeof reducer>;

export const store = createStore<CurrencyState>(
  { extensions: [getSagaExtension({})] },
  getLoginModule(),
  getCurrencyModule(),
  getSettingsModule(),
  getAnimationModule()
);
