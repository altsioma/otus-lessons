import { isEmpty } from "ramda";
import { takeEvery, call, put, fork } from "redux-saga/effects";
import { getUserSession, login, logout } from "./authApi";
import { actions } from "./reducer";

export function* checkUserSession() {
  const userSession = yield call(getUserSession);
  if (!isEmpty(userSession)) {
    yield put(actions.login(userSession));
  } else  {
    yield put(actions.logout());
  }
}

export function* clearUserSession() {
  yield call(logout);
}

export function* saveUserSession({
  payload,
}: ReturnType<typeof actions.login>) {
  const username = String(payload);
  yield call(login, username);
}

export function* loginSaga() {
  yield fork(checkUserSession);
  yield takeEvery(actions.login.type, saveUserSession);
  yield takeEvery(actions.logout.type, clearUserSession);
}
