import React from "react";
import { store } from "../store";
import { Provider } from "react-redux";
import { render } from "@testing-library/react";
import CalculatorHistory from "../components/CalculatorHistory";
import { ConversionArgumentsType } from "../hooks/calculator.hook";
import { describe, it, expect, beforeEach } from "jest-without-globals";
import {
  convertCurrencies,
  CURRENT_HISOTRY_NAME,
} from "../store/calculator.reducer";

describe("Test history list", () => {
  let mockParamsToConvertCurrencies;
  beforeEach(() => {
    render(
      <Provider store={store}>
        <CalculatorHistory />
      </Provider>
    );

    mockParamsToConvertCurrencies = {
      amount: { value: 4, isError: true },
      from: { value: "AFN", isError: true },
      to: { value: "XCD", isError: true },
    } as ConversionArgumentsType;
  });

  it("should list get one element in store", async () => {
    store.dispatch(await convertCurrencies(mockParamsToConvertCurrencies));
    expect(store.getState().calculator.conversionHistory.length).toEqual(1);
  });

  it("should get one element history in localstorage", async () => {
    store.dispatch(await convertCurrencies(mockParamsToConvertCurrencies));
    const historyInLocalStorage = JSON.parse(
      window.localStorage.getItem(CURRENT_HISOTRY_NAME)
    );
    expect(historyInLocalStorage.length).toBeGreaterThanOrEqual(1);
  });
});
