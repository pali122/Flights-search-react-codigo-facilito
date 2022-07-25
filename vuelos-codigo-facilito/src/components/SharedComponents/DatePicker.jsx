import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import TextField from "@mui/material/TextField";

const DatePicker = (props) => {
  // console.log(value);
  const { form, field, label } = props;
  const [value, setValue] = useState(field.value);
  console.log(field);
  const handleChange = (newValue) => {
    setValue(newValue);
    form.setFieldValue(field.name, newValue);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DesktopDatePicker
        disablePast
        label={label}
        inputFormat="DD/MM/YYYY"
        value={value}
        onChange={handleChange}
        renderInput={(params) => (
          <TextField className="date-selector-fix" {...params} />
        )}
      />
    </LocalizationProvider>
  );
};

export default DatePicker;
