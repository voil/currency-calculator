import StylesForComponent from "./styles";
import { useStoreSelector } from "../../hooks";

/**
 * CalculatorHeader component.
 * Component for render header calculator.
 */
export default function CalculatorHeader() {
  const styles = StylesForComponent();
  const resultConversion = useStoreSelector(
    (state) => state.calculator.resultConversion
  );

  return (
    <div className={styles.calculatorHeader}>
      <div
        data-testid="calculator-header-conversion"
        className={styles.calculatorHeader__result}
      >
        After conversion:
        {resultConversion.conversion === 0
          ? " ----"
          : ` ${resultConversion.conversion.toFixed(2)} ${
              resultConversion.currency
            }`}
      </div>
      <div
        data-testid="calculator-header-rate"
        className={styles.calculatorHeader__rate}
      >
        Current rate:
        {resultConversion.currentRate === 0
          ? " ----"
          : ` ${resultConversion.currentRate}`}
      </div>
    </div>
  );
}
