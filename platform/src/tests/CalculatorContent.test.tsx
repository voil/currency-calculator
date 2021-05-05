import React from "react";
import { store } from "../store";
import { Provider } from "react-redux";
import { act } from "react-dom/test-utils";
import { render, fireEvent } from "@testing-library/react";
import { convertCurrencies } from "../store/calculator.reducer";
import CalculatorContent from "../components/CalculatorContent";
import { ConversionArgumentsType } from "../hooks/calculator.hook";
import { describe, it, expect, beforeEach } from "jest-without-globals";

/** Mock for debounce function lodash */
jest.mock("lodash", () => ({
  ...jest.requireActual("lodash"),
  debounce: (fn) => {
    fn.cancel = jest.fn();
    return fn;
  },
}));

describe("Test content calculator", () => {
  let component = null;
  let spyDispatch = null;
  let mockParamsToConvertCurrencies;

  beforeEach(async () => {
    spyDispatch = jest.spyOn(store, "dispatch");
    act(() => {
      component = render(
        <Provider store={store}>
          <CalculatorContent />
        </Provider>
      );
    });

    mockParamsToConvertCurrencies = {
      amount: { value: 1, isError: false },
      from: { value: "PLN", isError: false },
      to: { value: "EUR", isError: false },
    } as ConversionArgumentsType;
  });

  it("should switch currency in select component", async () => {
    const selectFrom = await component.findByTestId("select-country-from");
    fireEvent.change(selectFrom, {
      target: { value: mockParamsToConvertCurrencies.from.value },
    });

    const selectTo = await component.findByTestId("select-country-to");
    fireEvent.change(selectTo, {
      target: { value: mockParamsToConvertCurrencies.to.value },
    });

    const selectCountrySwitch = await component.findByTestId(
      "select-country-switch"
    );
    fireEvent.click(selectCountrySwitch);

    expect(selectFrom.value).toEqual(mockParamsToConvertCurrencies.to.value);
  });

  it("should call convert currncie one after click button", async () => {
    const selectFrom = await component.findByTestId("select-country-from");
    fireEvent.change(selectFrom, {
      target: { value: mockParamsToConvertCurrencies.from.value },
    });

    const selectTo = await component.findByTestId("select-country-to");
    fireEvent.change(selectTo, {
      target: { value: mockParamsToConvertCurrencies.to.value },
    });

    const inputText = await component.findByTestId("input-country-value");
    fireEvent.change(inputText, {
      target: { value: mockParamsToConvertCurrencies.amount.value },
    });

    const buttonConvert = await component.findByTestId(
      "button-country-convert"
    );

    act(() => {
      fireEvent.click(buttonConvert);
    });

    mockParamsToConvertCurrencies.amount.value = "1";
    expect(spyDispatch).toHaveBeenCalledWith(
      await convertCurrencies(mockParamsToConvertCurrencies)
    );
  });
});
