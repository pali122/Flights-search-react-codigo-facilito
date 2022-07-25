import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { useState } from "react";

function TypeSelect(props) {
  const { form, field, label } = props;
  const [age, setAge] = useState(field.value);

  console.log(field);
  const handleChange = (event) => {
    setAge(event.target.value);
    form.setFieldValue(field.name, event.target.value);
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">{label}</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={age}
        label={label}
        onChange={handleChange}
      >
        <MenuItem value={0}>0</MenuItem>
        <MenuItem value={1}>1</MenuItem>
        <MenuItem value={2}>2</MenuItem>
        <MenuItem value={3}>3</MenuItem>
      </Select>
    </FormControl>
  );
}

export default TypeSelect;
