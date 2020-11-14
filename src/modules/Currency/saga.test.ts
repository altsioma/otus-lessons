import { select } from "redux-saga/effects";
import { expectSaga, testSaga } from "redux-saga-test-plan";
import * as matchers from "redux-saga-test-plan/matchers";
import { selectCurrentCurrency, selectPeriod } from "@/modules/SettingsForm";
import { getCurrency, currencySaga, watchRequest } from "./saga";
import { reducer, actions, fetchCurrency } from "./reducer";
import {
  setSettings,
  actions as settingsAction,
} from "@/modules/SettingsForm/reducer";
import * as faker from "faker";
import { getCurrencyFromApi, ratesToCurrency } from "./services/Currency";
import { throwError } from "redux-saga-test-plan/providers";
import { responseMock } from "@/modules/Currency/services/mock";

describe("Currency from API load", () => {
  it("check is fetching and transform data ok", () => {
    const transformedResponseData = new Array(
      faker.random.number({ min: 4, max: 5 })
    )
      .fill(null)
      .map(() => faker.random.number({ min: 1, max: 100, precision: 0.01 }));
    return expectSaga(getCurrency)
      .withReducer(reducer)
      .provide([
        [select(selectCurrentCurrency), "RUB"],
        [select(selectPeriod), { from: "2020-10-01", to: "2020-10-10" }],
        [matchers.call.fn(getCurrencyFromApi), responseMock],
        [matchers.call.fn(ratesToCurrency), transformedResponseData],
      ])
      .put(actions.pending())
      .hasFinalState({
        loading: false,
        data: transformedResponseData,
        error: null,
      })
      .run();
  });
  it("check is fethcing error", () => {
    const error = new Error("API error");
    return expectSaga(getCurrency)
      .withReducer(reducer)
      .provide([
        [select(selectCurrentCurrency), "RUB"],
        [select(selectPeriod), { from: "2020-10-01", to: "2020-10-10" }],
        [matchers.call.fn(getCurrencyFromApi), throwError(error)],
      ])
      .put(actions.pending())
      .put(actions.rejected(error.message))
      .hasFinalState({
        loading: false,
        data: [],
        error: error.message,
      })
      .run();
  });
  it("is watch request flow working correctly", () => {
    const saga = testSaga(watchRequest);
    saga.next().takeLatest(fetchCurrency, getCurrency).next().finish();
  });
  describe("Full currency fetch flow", () => {
    it("fetch data flow with action subscribe", () => {
      const saga = testSaga(currencySaga);
      saga
        .next()
        .fork(watchRequest)
        .save("currencyFetchFlow")
        .next()
        .take([setSettings, settingsAction.setCurrency])
        .next()
        .put(fetchCurrency())
        .next()
        .finish();
    });
  });
});
