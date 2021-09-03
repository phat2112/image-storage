import React, { useState } from "react";
import Checkbox from "@material-ui/core/Checkbox";
import Typography from "@material-ui/core/Typography";
import "./styles.scss";

type Props = {
  label: string;
  handleChangeChecked: (checked: boolean) => void;
};

const CheckBox: React.FC<Props> = ({ label, handleChangeChecked }) => {
  const [checked, setChecked] = useState<boolean>(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
    handleChangeChecked(event.target.checked);
  };

  return (
    <div className="checkbox-container">
      {label && <Typography variant="body1">{label}</Typography>}
      <Checkbox
        checked={checked}
        onChange={handleChange}
        color="primary"
        inputProps={{ "aria-label": "primary checkbox" }}
      />
    </div>
  );
};

export default React.memo(CheckBox);
