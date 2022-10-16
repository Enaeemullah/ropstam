import React from "react";
import TextField from "@mui/material/TextField";

export default function Input(props) {
  const { name, label, value, error = null, onChange } = props;
  return (
    <TextField
      fullWidth
      variant="outlined"
      label={label}
      name={name}
      value={value}
      onChange={onChange}
      {...(error && { error: true, helperText: error })}
    />
  );
}
