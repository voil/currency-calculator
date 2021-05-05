import { debounce } from "lodash";
import { useEffect, useState, useCallback } from "react";
import { MenuItem } from "@material-ui/core";
import { useStoreSelector, useStoreDispatch } from "./index";
import { CalculatorCountriesType } from "../store/calculator.reducer";
import {
  getCountriesList,
  convertCurrencies,
} from "../store/calculator.reducer";

/**
 * ConversionArgumentsType type.
 * Type for arguments conversion.
 */
export type ConversionArgumentsType = {
  amount: {
    isError: boolean;
    value: number;
  };
  from: {
    isError: boolean;
    value: string;
  };
  to: {
    isError: boolean;
    value: string;
  };
};

/**
 * CalculatorHook hook.
 * Hook to set calculator params for convert.
 */
export function CalculatorHook() {
  const dispatch = useStoreDispatch();
  const [isConversionActive, setConversionState] = useState(false);
  const [conversionArguments, setConversionArguments] = useState({
    amount: {
      isError: false,
      value: 0,
    },
    from: {
      isError: false,
      value: "",
    },
    to: {
      isError: false,
      value: "",
    },
  } as ConversionArgumentsType);
  const countriesList = useStoreSelector((state) => state.calculator.countries);

  useEffect(() => {
    async function fetchDataCountries() {
      dispatch(await getCountriesList());
    }
    fetchDataCountries();
  }, [dispatch]);

  /**
   * Function to handle switch currency to conversion.
   */
  const handleSwitchCurrency = useCallback((): void => {
    setConversionArguments({
      ...conversionArguments,
      from: {
        ...conversionArguments.to,
      },
      to: {
        ...conversionArguments.from,
      },
    });
  }, [conversionArguments]);

  /**
   * Function to handle convert countries list to components.
   * @return JSX.Element[]
   */
  const convertCountriesListToComponent = useCallback(
    (): JSX.Element[] =>
      countriesList.map(
        (country: CalculatorCountriesType): JSX.Element => (
          <MenuItem
            value={country.currencyId}
            key={`${country.currencyId}_${Math.random()}`}
          >{`${country.currencyId} - ${country.name}`}</MenuItem>
        )
      ),
    [countriesList]
  );

  /**
   * Function to handle convert currencies.
   */
  const handleConvertCurrency = debounce(async (): Promise<void> => {
    setConversionState(true);
    dispatch(await convertCurrencies(conversionArguments));
    setTimeout(() => setConversionState(false), 0);
  }, 500);

  return [
    isConversionActive,
    conversionArguments,
    handleConvertCurrency,
    setConversionArguments,
    convertCountriesListToComponent,
    handleSwitchCurrency,
    countriesList,
  ];
}
