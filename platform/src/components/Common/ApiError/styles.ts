import { makeStyles, Theme } from "@material-ui/core/styles";

export default makeStyles((theme: Theme) => ({
  apiError: {
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
    bottom: 0,
    margin: "auto",
    textAlign: "center",
    padding: "40px 0px",
    position: "absolute",
  },
  apiError__icon: {
    width: 200,
    fill: theme.palette.primary.main,
  },
  apiError_description: {
    fontSize: 32,
    paddingTop: 10,
    textAlign: "center",
  },
}));
