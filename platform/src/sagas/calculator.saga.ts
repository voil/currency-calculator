import { RootState } from "../store/index";
import {
  ACTIONS,
  CalculatorHistoryType,
  CURRENT_HISOTRY_NAME,
} from "../store/calculator.reducer";
import { toogleApiState } from "../store/global.reducer";
import { takeLatest, put, all, select } from "redux-saga/effects";

const getHistoryFromStore = (state: RootState): Array<CalculatorHistoryType> =>
  state.calculator.conversionHistory;

/**
 * Function generator to change state of api.
 */
function* displayErrorApi() {
  yield put(toogleApiState(true));
}

/**
 * Function set history to local storage.
 */
function* setToLoadStorageHistoryConversion() {
  const historyConversion: Array<CalculatorHistoryType> = yield select(
    getHistoryFromStore
  );
  localStorage.setItem(CURRENT_HISOTRY_NAME, JSON.stringify(historyConversion));
}

/**
 * Function watcher saga to watch action when api disabled.
 */
export const watcherCalculatorSaga = function* root() {
  yield takeLatest(ACTIONS.SET_ERROR_API, displayErrorApi);
};

/**
 * Function watcher saga to watch action when api disabled.
 */
export const watcherCalculatorHistorySaga = function* root() {
  yield takeLatest(
    ACTIONS.PUSH_CONVERSION_TO_HISTORY,
    setToLoadStorageHistoryConversion
  );
};

/**
 * Function to group all sagas for calculator.
 */
export default function* rootSaga() {
  yield all([watcherCalculatorSaga(), watcherCalculatorHistorySaga()]);
}
