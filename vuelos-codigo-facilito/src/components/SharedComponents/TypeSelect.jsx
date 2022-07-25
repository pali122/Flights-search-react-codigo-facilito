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

  const n = 8; // Or something else

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
        {[...Array(n)].map((e, i) => (
          <MenuItem value={i}>{i}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default TypeSelect;
