import Card from "@material-ui/core/Card";
import { styled } from "@material-ui/core/styles";

export const CardContent = styled(Card)({
  left: 0,
  right: 0,
  zIndex: 1,
  top: "15%",
  padding: 10,
  maxWidth: 600,
  margin: "auto",
  position: "absolute",
});
