import React, { useState } from "react";
import { useField } from "formik";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import ErrorMessage from "../error-message";

type Props = {
  name: string;
  label: string;
  type: string;
  isLogin?: boolean;
};

const InputText: React.FC<Props> = ({ name, label, type, isLogin = false }) => {
  const useStyles = makeStyles(() =>
    createStyles({
      root: {
        width: "100%",
        marginBottom: 15,

        "& label": {
          color: isLogin ? "#fff" : "#000",
        },

        "& label.Mui-focused": {
          color: "#000",
        },

        "& div:before": {
          borderBottom: `1px solid ${isLogin ? "#fff" : "rgba(0, 0, 0, 0.42)"}`,
        },

        "& div:after": {
          borderBottom: "1px solid #000",
        },
      },
    })
  );

  const classes = useStyles();

  const [, meta, helpers] = useField(name);
  const [value, setValue] = useState<string>(meta.initialValue);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const onBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    helpers.setValue(event.target.value);
    helpers.setTouched(true);
  };
  return (
    <>
      <TextField
        name={name}
        label={label}
        value={value}
        type={type}
        onChange={onChange}
        onBlur={onBlur}
        className={classes.root}
      />
      <ErrorMessage name={name} />
    </>
  );
};

export default React.memo(InputText);
