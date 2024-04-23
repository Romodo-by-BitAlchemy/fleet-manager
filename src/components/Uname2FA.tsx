import * as React from "react";
import { Box, Typography, Button, TextField } from "@mui/material";

import BusImage from "../assets/busimage.jpg";
import Logo from "../assets/Logo2.jpeg";
interface Uname2FAProps {
  onBack: () => void;
}
const Uname2FA: React.FC<Uname2FAProps> = ({ onBack }) => {
  const [userName, setUnameName] = React.useState<string>("");
  const [isTypingInvalid, setIsTypingInvalid] = React.useState<boolean>(false);
  const handleUserNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;

    // Check if the input contains any invalid characters
    if (!/^[a-zA-Z0-9_\-@*]*$/.test(inputValue)) {
      setIsTypingInvalid(true);
    } else {
      setIsTypingInvalid(false);
    }

    // Remove any spaces from the input
    const sanitizedValue = inputValue.replace(/\s/g, "");
    setUnameName(sanitizedValue);
  };
  return (
    <div>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          height: "100vh",
          width: "1200px",
        }}
      >
        {/* Left side with BusImage */}
        <Box
          sx={{
            flex: 1,
            backgroundImage: `url(${BusImage})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            position: "relative",
          }}
        ></Box>

        <Box
          sx={{
            flex: 0.5,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <img
            src={Logo}
            alt="Logo"
            style={{
              flex: 0.1,
              width: "400px",
              height: "10px",
              objectFit: "cover",
              maskPosition: "center",
              paddingRight: "50px",
              marginRight: "-800px",
              marginLeft: "250px",
              marginTop: "20px",
              marginBottom: "-40px",
              paddingBottom: "-40px",
            }}
          ></img>
        </Box>
        <form>
          <Box
            sx={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              paddingTop: "-40px",
              marginTop: "-35px",
              marginBottom: "-30px",
            }}
          >
            <Typography
              variant="h5"
              sx={{
                fontWeight: 900,
                color: "purple",
                marginTop: "-10px",
                paddingTop: "-30px",
              }}
            >
              Create Username{" "}
            </Typography>
            <TextField
              id="UserName"
              label="Create Username"
              variant="outlined"
              value={userName}
              onChange={handleUserNameChange}
              sx={{ marginTop: 2 }}
              helperText={
                isTypingInvalid ? (
                  <span style={{ color: "red" }}>
                    Username can only contain letters, numbers, '_', '-', '*',
                    or '@', and cannot have spaces.
                  </span>
                ) : null
              }
            />
            <br />
            <Typography
              variant="h5"
              sx={{
                fontWeight: 900,
                color: "purple",
                marginTop: "-10px",
                paddingTop: "-30px",
              }}
            >
              Two-Factor Authentication
            </Typography>
            <Button
              variant="contained"
              onClick={onBack}
              sx={{ color: "black", backgroundColor: "White" }}
            >
              Back
            </Button>
          </Box>
        </form>
      </Box>
    </div>
  );
};

export default Uname2FA;
