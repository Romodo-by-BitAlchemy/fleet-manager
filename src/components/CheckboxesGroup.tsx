import * as React from "react";
import Box from "@mui/material/Box";
//import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormHelperText from "@mui/material/FormHelperText";
import Checkbox from "@mui/material/Checkbox";
import Typography from "@mui/material/Typography";

export default function CheckboxesGroup() {
  const [state, setState] = React.useState({
    internal: true,
    external: false,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked,
    });
  };

  const { internal, external } = state;
  const error = [internal, external].filter((v) => v).length !== 1;

  return (
    <Box sx={{ display: "flex" }}>
      <FormControl
        required
        error={error}
        component="fieldset"
        sx={{ m: 2 }}
        variant="standard"
      >
        <FormGroup>
          <FormControlLabel
            sx={{ color: "black" }}
            control={
              <Checkbox
                checked={internal}
                onChange={handleChange}
                name="internal"
              />
            }
            label={
              <Typography sx={{ fontSize: "small", color: "black" }}>
                Internal Passenger
              </Typography>
            }
          />
          <FormControlLabel
            sx={{ color: "black" }}
            control={
              <Checkbox
                checked={external}
                onChange={handleChange}
                name="external"
              />
            }
            label={
              <Typography sx={{ fontSize: "small", color: "black" }}>
                External Passenger
              </Typography>
            }
          />
        </FormGroup>
        <FormHelperText>
          Please select atleast one passenger type
        </FormHelperText>
      </FormControl>
    </Box>
  );
}
