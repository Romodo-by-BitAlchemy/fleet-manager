import * as React from "react";
import TextField from "@mui/material/TextField";
import { Box, Typography, Button } from "@mui/material";
import InputFileUpload from "./InputFileUpload";
import BusImage from "../assets/busimage.jpg";
import Logo from "../assets/Logo2.jpeg";

interface Signupf1Props {
  onNext: () => void;
}

const Signupf1: React.FC<Signupf1Props> = ({ onNext }) => {
  const [companyName, setCompanyName] = React.useState<string>("");
  const [isTypingLowercase, setIsTypingLowercase] =
    React.useState<boolean>(false);
  const [contactNumber, setContactNumber] = React.useState<string>("");
  const [companyEmail, setCompanyEmail] = React.useState<string>("");
  const [isEmailValid, setIsEmailValid] = React.useState<boolean>(true);

  const handleCompanyNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const inputValue = event.target.value;
    // Check if the input starts with a lowercase letter
    if (/^[a-z]/.test(inputValue)) {
      setIsTypingLowercase(true); // Set flag to true if lowercase letter is typed
    } else {
      setIsTypingLowercase(false); // Reset flag if uppercase letter is typed
    }
    setCompanyName(inputValue);
  };
  const handleContactNumberChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    let inputValue = event.target.value;

    // Remove non-numeric characters
    inputValue = inputValue.replace(/\D/g, "");

    // Ensure contact number is not longer than 10 digits
    inputValue = inputValue.slice(0, 10);

    setContactNumber(inputValue);
  };
  const handleCompanyEmailChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const inputValue = event.target.value;
    setCompanyEmail(inputValue);
    setIsEmailValid(validateEmail(inputValue));
  };

  const validateEmail = (email: string): boolean => {
    // Regular expression pattern for email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
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
              variant="h3"
              sx={{
                fontWeight: 900,
                color: "purple",
                marginTop: "-10px",
                paddingTop: "-30px",
              }}
            >
              SIGN UP
            </Typography>
            <Typography
              variant="body2"
              sx={{
                fontWeight: 400,
                color: "black",
                marginTop: "-20",
                paddingTop: "-20px",
                marginBottom: "-20px",
              }}
            >
              Company Details
            </Typography>
            <br />
            <TextField
              id="companyName"
              label="Company Name"
              variant="outlined"
              value={companyName}
              onChange={handleCompanyNameChange}
              sx={{ marginTop: 2 }}
              helperText={
                isTypingLowercase && !companyName.match(/^[A-Z][a-z]*$/) ? (
                  <span style={{ color: "red" }}>
                    Company name should start with a capital letter
                  </span>
                ) : null
              }
            />
            <TextField
              id="address"
              label="Address"
              variant="outlined"
              sx={{ marginTop: 2 }}
            />
            <TextField
              id="registeredNumber"
              label="Registered Number"
              variant="outlined"
              sx={{ marginTop: 2 }}
            />
            <TextField
              id="contactNumber"
              label="Contact Number"
              variant="outlined"
              value={contactNumber}
              onChange={handleContactNumberChange}
              sx={{ marginTop: 2 }}
              helperText={
                contactNumber.length > 10 && (
                  <span style={{ color: "red" }}>
                    Contact number should be 10 digits
                  </span>
                )
              }
            />
            <TextField
              id="companyEmail"
              label="Company Email"
              variant="outlined"
              value={companyEmail}
              onChange={handleCompanyEmailChange}
              sx={{ marginTop: 1 }}
              error={!isEmailValid}
              helperText={!isEmailValid && "Invalid email format"}
            />
            <InputFileUpload />
            <br />
            <Button
              variant="contained"
              onClick={onNext}
              sx={{ backgroundColor: "purple", marginTop: 0.5 }}
            >
              Next
              <br />
            </Button>
          </Box>
        </form>
      </Box>
    </div>
  );
};

export default Signupf1;
