import React from "react";
import { store } from "../store";
import { Provider } from "react-redux";
import { render } from "@testing-library/react";
import CalculatorHeader from "../components/CalculatorHeader";
import { convertCurrencies } from "../store/calculator.reducer";
import { ConversionArgumentsType } from "../hooks/calculator.hook";
import { describe, it, expect, beforeEach } from "jest-without-globals";

describe("Test header calculator description", () => {
  let component = null;
  let mockParamsToConvertCurrencies;
  beforeEach(() => {
    component = render(
      <Provider store={store}>
        <CalculatorHeader />
      </Provider>
    );

    mockParamsToConvertCurrencies = {
      amount: { value: 4, isError: true },
      from: { value: "AFN", isError: true },
      to: { value: "XCD", isError: true },
    } as ConversionArgumentsType;
  });

  it("should have set conversion and rate text to header", async () => {
    store.dispatch(await convertCurrencies(mockParamsToConvertCurrencies));
    const calculatorHeaderConversionElement = await component.findByTestId(
      "calculator-header-conversion"
    );
    const calculatorHeaderRateElement = await component.findByTestId(
      "calculator-header-rate"
    );

    expect(calculatorHeaderConversionElement.innerHTML.trim()).not.toEqual(
      "After conversion:"
    );
    expect(calculatorHeaderRateElement.innerHTML.trim()).not.toEqual(
      "Current rate:"
    );
  });
});
