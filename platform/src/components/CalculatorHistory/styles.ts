import { makeStyles, Theme } from "@material-ui/core/styles";

export default makeStyles((theme: Theme) => ({
  calculatorHistory__help: {
    fontSize: 11,
    display: "block",
  },
  calculatorHistory__description: {
    fontSize: 14,
    position: "relative",
  },
  calculatorHistory__color: {
    fontWeight: 600,
    color: theme.palette.primary.main,
  },
  calculatorHistory__button: {
    cursor: "pointer",
    color: theme.palette.primary.main,
  },
}));
