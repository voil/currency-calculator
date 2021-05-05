import global from "./global.reducer";
import calculator from "./calculator.reducer";
import createSagaMiddleware from "redux-saga";
import { configureStore } from "@reduxjs/toolkit";
import CalculatorSaga from "../sagas/calculator.saga";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    global,
    calculator,
  },
  middleware: [sagaMiddleware],
});

sagaMiddleware.run(CalculatorSaga);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
