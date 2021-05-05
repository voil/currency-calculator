export interface ResponseExceptionHandler {
  [key: string]: string | number;
  message: string;
  code: number;
  type: string;
}

export interface ExceptionErrorHandler {}

export interface BaseEntityInterface {}

export interface ResponseEndpointInterface {
  [key: string]: string | number | Array<any> | BaseEntityInterface;
  total: number;
  records?: Array<BaseEntityInterface>;
}

export interface ResponseExchangeRateInterface {
  exchangeRate: number;
}
