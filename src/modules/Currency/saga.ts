import { call, put, fork, select, takeLatest, take } from "redux-saga/effects";
import { actions, fetchCurrency } from "./reducer";
import {
  getCurrencyFromApi,
  ratesToCurrency,
} from "@/modules/Currency/services/Currency";
import { selectCurrentCurrency, selectPeriod } from "@/modules/SettingsForm";
import {
  setSettings,
  actions as settingsAction,
} from "@/modules/SettingsForm/reducer";

export function* getCurrency() {
  yield put(actions.pending());
  try {
    const period = yield select(selectPeriod);
    const currency = yield select(selectCurrentCurrency);
    const result = yield call(getCurrencyFromApi, currency, period);
    const data = yield call(ratesToCurrency, result.rates, currency);
    yield put(actions.fulfilled(data));
  } catch (e) {
    yield put(actions.rejected(e.message));
  }
}

export function* watchRequest() {
  yield takeLatest(fetchCurrency, getCurrency);
}

export function* currencySaga() {
  yield fork(watchRequest);
  while (true) {
    yield take([setSettings, settingsAction.setCurrency]);
    yield put(fetchCurrency());
  }
}
