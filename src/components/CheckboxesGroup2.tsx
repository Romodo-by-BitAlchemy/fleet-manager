import * as React from "react";
import Box from "@mui/material/Box";
//import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
//import FormHelperText from "@mui/material/FormHelperText";
import Checkbox from "@mui/material/Checkbox";

export default function CheckboxesGroup() {
  const [state, setState] = React.useState({
    groupseat: false,
    paymentgate: false,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked,
    });
  };

  const {groupseat, paymentgate} = state;

  return (
    <Box sx={{display: "flex"}}>
      <FormControl required component="fieldset" sx={{m: 3}} variant="standard">
        <FormGroup>
          <FormControlLabel
            sx={{color: "black"}}
            control={
              <Checkbox
                checked={groupseat}
                onChange={handleChange}
                name="groupseat"
              />
            }
            label="Allow Group Reservations"
          />
          <FormControlLabel
            sx={{color: "black"}}
            control={
              <Checkbox
                checked={paymentgate}
                onChange={handleChange}
                name="paymentgate"
              />
            }
            label="Enable Payment Gateway"
          />
        </FormGroup>
      </FormControl>
    </Box>
  );
}
