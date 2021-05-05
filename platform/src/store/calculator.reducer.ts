import { AnyAction } from "redux";
import ApolloService from "../services/apollo.service";
import { ConversionArgumentsType } from "../hooks/calculator.hook";

enum GRAPQL_HANDLERS {
  GET_COUNTRIES_LIST = `query GetCountriesList {
    countriesList {
      total
      records{
        id
        name
        alpha3
        currencyId
        currencyName
        currencySymbol
      }
    }
  }`,
  GET_CURRENT_EXCHANGE_RATE = `query GetCurrentExchangeRate($params: CurrentExchangeRateArgs!) {
    getCurrentExchangeRate(params: $params) {
      exchangeRate
    }
  }`,
}

export const CURRENT_HISOTRY_NAME = "currentHistory";

/**
 * CalculatorCountriesType.
 * Type for calculator countries.
 */
export type CalculatorCountriesType = {
  id: string;
  name: string;
  alpha3: string;
  currencyId: string;
  currencyName: string;
  currencySymbol: string;
};

/**
 * CalculatorHistoryType.
 * Type for calculator history.
 */
export type CalculatorHistoryType = {
  amount: number;
  toCurrency: string;
  conversion: number;
  currentRate: number;
  fromCurrency: string;
};

/**
 * CalculatorResultType.
 * Type for calculator result.
 */
type CalculatorResultType = {
  conversion: number;
  currentRate: number;
  currency: string;
};

/**
 * ACTIONS.
 * Actions names for reducer dispatch.
 */
export enum ACTIONS {
  SET_ERROR_API = "SET_ERROR_API",
  GET_COUNTRIES_LIST = "GET_COUNTRIES_LIST",
  PUSH_CONVERSION_TO_HISTORY = "PUSH_CONVERSION_TO_HISTORY",
}

/**
 * GlobalType.
 * Type for global object.
 */
export type CalculatorStateType = {
  countries: CalculatorCountriesType[];
  resultConversion: CalculatorResultType;
  conversionHistory: CalculatorHistoryType[];
};

/**
 * TypeReturnAction<T>.
 * Type for calculator data object item.
 */
export type TypeReturnAction<T> = {
  type: string;
  payload?: T;
};

/**
 * initialState.
 * Main state for filters store reducer.
 */
export const initialState: CalculatorStateType = {
  countries: [],
  resultConversion: {
    conversion: 0,
    currentRate: 0,
    currency: "",
  },
  conversionHistory: localStorage.getItem(CURRENT_HISOTRY_NAME)
    ? JSON.parse(localStorage.getItem(CURRENT_HISOTRY_NAME) || "")
    : [],
};

/**
 * Main function of calculator reducer.
 * @param CalculatorStateType state
 * @param AnyAction action
 * @return CalculatorStateType
 */
export default function reducer(
  state = initialState,
  action: AnyAction
): CalculatorStateType {
  switch (action.type) {
    case ACTIONS.GET_COUNTRIES_LIST: {
      return {
        ...state,
        countries: action.payload,
      };
    }
    case ACTIONS.PUSH_CONVERSION_TO_HISTORY: {
      const conversionHistory = state.conversionHistory.slice();
      if (conversionHistory.length >= 10) {
        conversionHistory.shift();
      }
      conversionHistory.push(action.payload);
      return {
        ...state,
        resultConversion: {
          currency: action.payload.toCurrency,
          conversion: action.payload.conversion,
          currentRate: action.payload.currentRate,
        },
        conversionHistory: conversionHistory,
      };
    }
    case ACTIONS.SET_ERROR_API: {
      return {
        ...state,
      };
    }
    default:
      return state;
  }
}

/**
 * Function action to get countries list.
 * @return TypeReturnAction<Array<CalculatorCountriesType>>
 */
export async function getCountriesList(): Promise<
  TypeReturnAction<Array<CalculatorCountriesType> | boolean>
> {
  try {
    const response = await ApolloService.query(
      GRAPQL_HANDLERS.GET_COUNTRIES_LIST
    );
    return {
      type: ACTIONS.GET_COUNTRIES_LIST,
      payload: response.data?.countriesList.records,
    };
  } catch (error) {
    return {
      type: ACTIONS.SET_ERROR_API,
    };
  }
}

/**
 * Function action to get current conversion.
 * @param ConversionArgumentsType conversionArguments
 * @return Promise<TypeReturnAction<CalculatorHistoryType>>
 */
export async function convertCurrencies(
  conversionArguments: ConversionArgumentsType
): Promise<TypeReturnAction<CalculatorHistoryType>> {
  try {
    const response = await ApolloService.query(
      GRAPQL_HANDLERS.GET_CURRENT_EXCHANGE_RATE,
      {
        params: {
          from: conversionArguments.from.value,
          to: conversionArguments.to.value,
        },
      }
    );
    return {
      type: ACTIONS.PUSH_CONVERSION_TO_HISTORY,
      payload: {
        amount: conversionArguments.amount.value,
        toCurrency: conversionArguments.to.value,
        conversion:
          response.data.getCurrentExchangeRate.exchangeRate *
          conversionArguments.amount.value,
        currentRate: response.data.getCurrentExchangeRate.exchangeRate,
        fromCurrency: conversionArguments.from.value,
      },
    };
  } catch (error) {
    return {
      type: ACTIONS.SET_ERROR_API,
    };
  }
}
