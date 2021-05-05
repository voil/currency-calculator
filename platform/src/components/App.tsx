import MainTheme from "./theme";
import "typeface-barlow-condensed";
import GlobalStyles from "./styles";
import ApiError from "./Common/ApiError";
import { CardContent } from "./overwrite";
import CalculatorHeader from "./CalculatorHeader";
import CalculatorContent from "./CalculatorContent";
import MainBackground from "./Common/MainBackground";
import { ThemeProvider } from "@material-ui/core/styles";
import ErrorApiBoundary from "./Common/ErrorApiBoundary";

/**
 * App component.
 * Main app component.
 */
export default function App() {
  GlobalStyles();
  return (
    <div className="App">
      <ThemeProvider theme={MainTheme}>
        <ErrorApiBoundary fallbackComponent={<ApiError />}>
          <CardContent>
            <CalculatorHeader />
            <CalculatorContent />
          </CardContent>
        </ErrorApiBoundary>
      </ThemeProvider>
      <MainBackground />
    </div>
  );
}
