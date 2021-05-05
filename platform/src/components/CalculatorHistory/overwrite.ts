import { Accordion } from "@material-ui/core";
import { styled } from "@material-ui/core/styles";
import HistoryIcon from "@material-ui/icons/History";
import { Timeline, TimelineItem } from "@material-ui/lab";

export const AccordionContent = styled(Accordion)({
  boxShadow: "0px 0px 0px 0px rgba(0, 0, 0, 0)",
});

export const HistoryIconStyled = styled(HistoryIcon)({
  top: 5,
  marginRight: 5,
  color: "#3f51b5",
  position: "relative",
});

export const TimelineHistory = styled(Timeline)({
  margin: 0,
  padding: "10px 0px 0px 5px",
  borderTop: "1px solid #d4d4d4",
});

export const TimelineItemHistory = styled(TimelineItem)({
  "&::before": {
    flex: 0,
    padding: 0,
  },
  minHeight: 40,
});
