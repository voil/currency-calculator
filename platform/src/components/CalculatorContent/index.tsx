import React from "react";
import {
  Button,
  Select,
  TextField,
  InputLabel,
  FormControl,
} from "@material-ui/core";
import StylesForComponent from "./styles";
import SpinLoading from "../Common/SpinLoading";
import CachedIcon from "@material-ui/icons/Cached";
import CalculatorHistory from "../CalculatorHistory";
import { CalculatorHook } from "../../hooks/calculator.hook";

/**
 * CalculatorContent component.
 * Component for render content of calculator.
 */
export default React.memo(function CalculatorContent() {
  const styles = StylesForComponent();

  const [
    isConversionActive,
    conversionArguments,
    handleConvertCurrency,
    setConversionArguments,
    convertCountriesListToComponent,
    handleSwitchCurrency,
    countriesList,
  ] = CalculatorHook();

  /**
   * Function to handle to cent conversion arguments.
   * @param string | number | unknown value
   * @param React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
      | React.ChangeEvent<{
          name?: string | undefined;
          value: unknown;
        }>
   * @param string property
   */
  const handleConversionArguments = (
    value: string | number | unknown,
    event:
      | React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
      | React.ChangeEvent<{
          name?: string | undefined;
          value: unknown;
        }>,
    property: string
  ): void => {
    setConversionArguments({
      ...conversionArguments,
      [property]: {
        value,
        isError: (value as string).toString().trim() !== "" && value !== ".",
      },
    });
  };

  if (countriesList.length === 0) {
    return <SpinLoading />;
  }

  return (
    <div>
      {isConversionActive ? (
        <SpinLoading />
      ) : (
        <div className={styles.calculatorContent__columns}>
          <div className={styles.calculatorContent__column}>
            <TextField
              size="small"
              label="Amount"
              variant="outlined"
              inputProps={{
                id: "input-country-value",
                "data-testid": "input-country-value",
              }}
              className={styles.calculatorContent__input}
              onChange={(event) =>
                handleConversionArguments(
                  event.target.value
                    .replace(/[^0-9.]/g, "")
                    .replace(/(\..*?)\..*/g, "$1"),
                  event,
                  "amount"
                )
              }
              value={conversionArguments.amount.value}
            />
          </div>
          <div className={styles.calculatorContent__column}>
            <FormControl
              className={styles.calculatorContent__select}
              size="small"
              variant="outlined"
            >
              <InputLabel>from</InputLabel>
              <Select
                inputProps={{
                  id: "select-country-from",
                  "data-testid": "select-country-from",
                }}
                value={conversionArguments.from.value}
                onChange={(event) =>
                  handleConversionArguments(event.target.value, event, "from")
                }
              >
                {convertCountriesListToComponent()}
              </Select>
            </FormControl>
          </div>
          <div
            className={`${styles.calculatorContent__column} ${styles.calculatorContent__column_icon}`}
          >
            <CachedIcon
              data-testid="select-country-switch"
              className={styles.calculatorContent__icon}
              onClick={handleSwitchCurrency}
            />
          </div>
          <div className={styles.calculatorContent__column}>
            <FormControl
              className={styles.calculatorContent__select}
              size="small"
              variant="outlined"
            >
              <InputLabel>on</InputLabel>
              <Select
                inputProps={{
                  id: "select-country-to",
                  "data-testid": "select-country-to",
                }}
                value={conversionArguments.to.value}
                onChange={(event) =>
                  handleConversionArguments(event.target.value, event, "to")
                }
              >
                {convertCountriesListToComponent()}
              </Select>
            </FormControl>
          </div>
          <div className={styles.calculatorContent__column}>
            <Button
              data-testid="button-country-convert"
              className={styles.calculatorContent__button}
              onClick={handleConvertCurrency}
              variant="contained"
              size="large"
              color="primary"
              disabled={
                !conversionArguments.amount.isError ||
                !conversionArguments.from.isError ||
                !conversionArguments.to.isError
              }
            >
              Convert the amount
            </Button>
          </div>
        </div>
      )}
      <CalculatorHistory />
    </div>
  );
});
