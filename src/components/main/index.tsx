import React, { useEffect, useState } from "react";
import Typography from "@material-ui/core/Typography";
import ArrowRightAltIcon from "@material-ui/icons/ArrowRightAlt";
import { STORAGE_TYPE } from "../../common/constants";
import LoveCounter from "../../common/love-counter";
import BackgroundImg from "../../assets/images/background-img.jpg";
import StepModal from "../step-modal";
import "./styles.scss";

const Main = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [isLoveStorage, setIsLoveStorage] = useState<boolean>(false);

  useEffect(() => {
    setOpen(true);
  }, []);

  const leftSideData = [
    { label: "Family", type: STORAGE_TYPE.FAMILY },
    { label: "Friend", type: STORAGE_TYPE.FRIEND },
    { label: "Love", type: STORAGE_TYPE.LOVE },
  ];

  const handleNavigate = (index: number, type: string) => {
    const listItemEle = document.querySelectorAll(`.left-side-label`);
    for (let i = 0; i < listItemEle.length; i++) {
      if (i === index) {
        listItemEle[i].classList.add("active");
      } else {
        listItemEle[i].classList.remove("active");
      }
    }
    setIsLoveStorage(type === STORAGE_TYPE.LOVE);
  };

  return (
    <>
      <div className="main">
        <div className="left-side-bar">
          <ul className="left-side-container">
            {leftSideData.map((item, index) => (
              <li
                className="left-side-label"
                key={`label-${item.label}`}
                onClick={() => handleNavigate(index, item.type)}
              >
                <ArrowRightAltIcon
                  fontSize="small"
                  className="left-side-icon"
                />
                <Typography
                  variant="h6"
                  gutterBottom
                  className="left-side-text"
                >
                  {item.label}
                </Typography>
              </li>
            ))}
          </ul>
        </div>
        <div className="content-container">
          {isLoveStorage && (
            <LoveCounter
              leftAva="https://placeimg.com/640/480/any"
              rightAva="https://placeimg.com/640/480/any"
              firstDate="21-04-2021"
              totalTime="3 months 14 days"
            />
          )}
        </div>
        <div className="background-image">
          <img src={BackgroundImg} alt="background" />
        </div>
      </div>
      <StepModal open={open} setOpen={setOpen} />
    </>
  );
};

export default React.memo(Main);
