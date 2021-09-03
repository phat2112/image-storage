import React, { useCallback, useState } from "react";
import { useField } from "formik";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import ErrorMessage from "../error-message";

type Option = {
  label: string;
  value: string;
};

type Props = {
  options: Option[];
  label: string;
  name: string;
  loadOptions: (value: string) => void;
};

const InputAutoComplete: React.FC<Props> = ({
  options,
  label,
  name,
  loadOptions,
}) => {
  const [, meta, helpers] = useField(name);
  const [value, setValue] = useState(meta.initialValue);

  const handleChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setValue(ev.target.value);
    loadOptions(ev.target.value);
  };

  const handleOptionSelected = useCallback(
    (optionSelected: Option) => {
      if (meta.value === optionSelected.value) return false;
      helpers.setValue(optionSelected.value);
      return true;
    },
    [meta.value]
  );

  return (
    <>
      <Autocomplete
        id="combo-box-demo"
        options={options}
        getOptionLabel={(option) => option.label}
        style={{ width: "100%", marginBottom: "10px" }}
        getOptionSelected={handleOptionSelected}
        renderInput={(params) => (
          <TextField
            {...params}
            label={label}
            name={name}
            value={value}
            onChange={handleChange}
          />
        )}
      />
      <ErrorMessage name={name} />
    </>
  );
};

export default InputAutoComplete;
