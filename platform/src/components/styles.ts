import { createStyles, makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() =>
  createStyles({
    "@global": {
      html: {
        "-webkit-font-smoothing": "antialiased",
        "-moz-osx-font-smoothing": "grayscale",
        height: "100%",
        width: "100%",
      },
      "*": {
        fontFamily: "Barlow Condensed",
      },
      body: {
        height: "100%",
        width: "100%",
        padding: 0,
        margin: 0,
        background:
          "radial-gradient(ellipse at center, #f9fafc 53%,#eaeaea 100%)",
      },
      "#root": {
        height: "100%",
        width: "100%",
      },
    },
  })
);

export default useStyles;
