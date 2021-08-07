import React, { useState } from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { useField } from "formik";
import "./styles.scss";

type RadioDataType = {
  label: string;
  value: string;
};

type Props = {
  name: string;
  radioData: RadioDataType[];
};

const RadioGroupComponent: React.FC<Props> = ({ name, radioData }) => {
  const [, meta, helpers] = useField(name);
  const [value, setValue] = useState<string[]>(meta.initialValue);

  const handleBlur = () => {
    helpers.setValue(value);
    helpers.setTouched(true);
  };

  const handleClick = (radioValue: string) => {
    const existedIndex = value.findIndex((item) => item === radioValue);
    if (existedIndex !== -1) {
      const newArr = value.filter((item) => item !== radioValue);
      setValue(newArr);
    } else {
      setValue([...value, radioValue]);
    }
  };

  return (
    <FormControl component="fieldset">
      <div className="radio-container">
        {radioData.map((item) => (
          <RadioGroup
            key={`radio-${item.value}`}
            aria-label="storageType"
            name="storageType"
            value={value.includes(item.value) ? item.value : ""}
            onBlur={handleBlur}
            onClick={() => handleClick(item.value)}
          >
            <FormControlLabel
              value={item.value}
              control={<Radio />}
              label={item.label}
            />
          </RadioGroup>
        ))}
      </div>
    </FormControl>
  );
};

export default React.memo(RadioGroupComponent);
