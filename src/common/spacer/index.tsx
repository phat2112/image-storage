import React from "react";

type Props = {
  type: "type-same" | "type-diff";
};

const Spacer: React.FC<Props> = ({ type }) => {
  return <div className={type} />;
};

export default React.memo(Spacer);
