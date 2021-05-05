import { makeStyles, Theme } from "@material-ui/core/styles";

export default makeStyles((theme: Theme) => ({
  calculatorContent__columns: {
    display: "flex",
    padding: "10px 0px",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottom: "1px solid #d4d4d4",
    "@media (max-width: 600px)": {
      flexDirection: "column",
    },
  },
  calculatorContent__column: {
    marginBottom: 5,
    "@media (max-width: 600px)": {
      width: "100%",
    },
  },
  calculatorContent__column_icon: {
    "@media (max-width: 600px)": {
      textAlign: "center",
    },
  },
  calculatorContent__input: {
    "@media (max-width: 600px)": {
      width: "100%",
    },
  },
  calculatorContent__select: {
    width: 95,
    "@media (max-width: 600px)": {
      width: "100%",
    },
  },
  calculatorContent__button: {
    "@media (max-width: 600px)": {
      width: "100%",
    },
  },
  calculatorContent__icon: {
    cursor: "pointer",
    color: theme.palette.primary.main,
  },
}));
