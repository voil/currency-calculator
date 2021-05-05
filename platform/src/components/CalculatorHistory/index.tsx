import { useStoreSelector } from "../../hooks";
import {
  TimelineDot,
  TimelineContent,
  TimelineSeparator,
  TimelineConnector,
} from "@material-ui/lab";
import {
  TimelineHistory,
  AccordionContent,
  HistoryIconStyled,
  TimelineItemHistory,
} from "./overwrite";
import React from "react";
import StylesForComponent from "./styles";
import EmptyList from "../Common/EmptyList";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { AccordionSummary, AccordionDetails } from "@material-ui/core";
import { CalculatorHistoryType } from "../../store/calculator.reducer";

/**
 * CalculatorHistory component.
 * Component for render history of calculator.
 */
export default React.memo(function CalculatorHistory() {
  const styles = StylesForComponent();
  const conversionHistory = useStoreSelector(
    (state) => state.calculator.conversionHistory
  );

  return (
    <AccordionContent>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <HistoryIconStyled />
        <div>
          Expand conversion History ...
          <span className={styles.calculatorHistory__help}>
            History only keeps the last 10 recounts.
          </span>
        </div>
      </AccordionSummary>
      <AccordionDetails>
        <TimelineHistory>
          {conversionHistory.length === 0 ? <EmptyList /> : ""}
          {conversionHistory.map((conversion: CalculatorHistoryType) => (
            <TimelineItemHistory
              key={`${conversion.fromCurrency}_${Math.random()}`}
            >
              <TimelineSeparator>
                <TimelineDot />
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent
                className={styles.calculatorHistory__description}
              >
                Convert from
                <span className={styles.calculatorHistory__color}>
                  {` ${conversion.fromCurrency}`}
                </span>{" "}
                on
                <span className={styles.calculatorHistory__color}>
                  {` ${conversion.toCurrency}`}
                </span>{" "}
                | amount:
                <span className={styles.calculatorHistory__color}>
                  {` ${conversion.amount} ${conversion.fromCurrency} `}
                </span>
                | conversion:
                <span className={styles.calculatorHistory__color}>
                  {` ${conversion.conversion.toFixed(2)} ${
                    conversion.toCurrency
                  } `}
                </span>
              </TimelineContent>
            </TimelineItemHistory>
          ))}
        </TimelineHistory>
      </AccordionDetails>
    </AccordionContent>
  );
});
