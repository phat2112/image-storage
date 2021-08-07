import React, { useLayoutEffect } from "react";
import Typography from "@material-ui/core/Typography";
import "./styles.scss";

type Props = {
  leftAva: string;
  rightAva: string;
  firstDate: string;
  totalTime: string;
};

// measure duration firstDate
// new Date() - new Date(firstDate).getTime()
// then devide it to 24 * 3600 * 1000
const LoveCounter: React.FC<Props> = ({
  leftAva,
  rightAva,
  firstDate,
  totalTime,
}) => {
  const textArr = firstDate.split("");

  return (
    <div className="counter-container">
      <div className="image-block">
        <img src={leftAva} alt="left-ava" />
      </div>
      <div className="love-time">
        <Typography className="love-text" variant="h6">
          {firstDate}
        </Typography>
        <div className="love-spacer" />
        <Typography className="love-text" variant="h6">
          {totalTime}
        </Typography>
      </div>
      <div className="image-block">
        <img src={rightAva} alt="right-ava" />
      </div>
    </div>
  );
};

export default React.memo(LoveCounter);
