import { isEmpty } from "ramda";
import { takeEvery, call, put, fork } from "redux-saga/effects";
import { getUserSession, login, logout } from "@/api/auth";
import { actions, usernameMinLength } from "./reducer";

export function* checkUserSession() {
  const userSession = yield call(getUserSession);
  if (userSession && !isEmpty(userSession)) {
    yield put(actions.login(userSession));
  }
}

export function* clearUserSession() {
  yield call(logout);
  yield call(() => document.location.replace("/"));
}

export function* saveUserSession({
  payload,
}: ReturnType<typeof actions.login>) {
  const username = String(payload);
  if (username?.length > usernameMinLength) {
    yield call(login, username);
  }
}

export function* loginSaga() {
  yield fork(checkUserSession);
  yield takeEvery(actions.login.type, saveUserSession);
  yield takeEvery(actions.logout.type, clearUserSession);
}
