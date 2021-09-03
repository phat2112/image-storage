import React from "react";
import BackgroundImage from "../../../assets/images/background-img.jpg";
import "./styles.scss";

type Props = {
  children: React.ReactChild;
};

const AuthTemplate: React.FC<Props> = ({ children }) => {
  return (
    <div className="login-container">
      <div className="background-container">
        <img src={BackgroundImage} alt="background-img" />
      </div>
      {children}
    </div>
  );
};

export default React.memo(AuthTemplate);
