import React, { useState } from "react";
import { useField } from "formik";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";

type Props = {
  name: string;
  label: string;
};

const InputDate: React.FC<Props> = ({ name, label }) => {
  const [, , helpers] = useField(name);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
    if (date) {
      const newDate = new Date(date);
      console.log("newDate :>> ", newDate.toISOString());
      helpers.setValue(newDate.toISOString());
    }
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container justifyContent="space-around">
        <KeyboardDatePicker
          disableToolbar
          variant="inline"
          format="dd/MM/yyyy"
          margin="normal"
          id="date-picker-inline"
          label={label}
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            "aria-label": "change date",
          }}
          name={name}
        />
      </Grid>
    </MuiPickersUtilsProvider>
  );
};

export default React.memo(InputDate);
