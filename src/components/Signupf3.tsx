import * as React from "react";
import TextField from "@mui/material/TextField";
import { Box, Typography, Button } from "@mui/material";
import BusImage from "../assets/busimage.jpg";
import Logo from "../assets/Logo2.jpeg";

interface Signupf3Props {
  onNext: () => void;
  onBack: () => void;
}

const Signupf3: React.FC<Signupf3Props> = ({ onNext, onBack }) => {
  const [firstName, setfirstName] = React.useState<string>("");
  const [lastName, setlastName] = React.useState<string>("");
  const [isTypingLowercase, setIsTypingLowercase] =
    React.useState<boolean>(false);
  const [managerNumber, setmanagerNumber] = React.useState<string>("");
  const [managerEmail, setmanagerEmail] = React.useState<string>("");
  const [isEmailValid, setIsEmailValid] = React.useState<boolean>(true);
  const [password, setPassword] = React.useState<string>("");
  const [reEnteredPassword, setReEnteredPassword] = React.useState<string>("");
  const [isPasswordValid, setIsPasswordValid] = React.useState<boolean>(true);

  const handleManagerFirstNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const inputValue = event.target.value;
    // Check if the input starts with a lowercase letter
    if (/^[a-z]/.test(inputValue)) {
      setIsTypingLowercase(true); // Set flag to true if lowercase letter is typed
    } else {
      setIsTypingLowercase(false); // Reset flag if uppercase letter is typed
    }
    setfirstName(inputValue);
  };

  const handleManagerLastNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const inputValue = event.target.value;
    // Check if the input starts with a lowercase letter
    if (/^[a-z]/.test(inputValue)) {
      setIsTypingLowercase(true); // Set flag to true if lowercase letter is typed
    } else {
      setIsTypingLowercase(false); // Reset flag if uppercase letter is typed
    }
    setlastName(inputValue);
  };

  const handlemanagerNumberChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    let inputValue = event.target.value;

    // Remove non-numeric characters
    inputValue = inputValue.replace(/\D/g, "");

    // Ensure contact number is not longer than 10 digits
    inputValue = inputValue.slice(0, 10);

    setmanagerNumber(inputValue);
  };

  const handlemanagerEmailChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const inputValue = event.target.value;
    setmanagerEmail(inputValue);
    setIsEmailValid(validateEmail(inputValue));
  };

  const handlePasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const inputValue = event.target.value;
    setPassword(inputValue);
    // Validate password (e.g., minimum length)
    setIsPasswordValid(inputValue.length >= 6); // Example: Password should be at least 6 characters
  };

  const handleReEnteredPasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const inputValue = event.target.value;
    setReEnteredPassword(inputValue);
    // Validate matching passwords
    setIsPasswordValid(inputValue === password); // Example: Passwords should match
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
              width: "400px", // Adjust as needed
              height: "10px", // Adjust as needed
              objectFit: "cover",
              maskPosition: "center",
              paddingRight: "50px",
              marginRight: "-800px",
              marginLeft: "250px",
              marginTop: "20px",
              marginBottom: "-30px",
              paddingBottom: "-20px",
            }}
          ></img>
        </Box>
        <form>
          <Box
            sx={{
              flex: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              paddingTop: "-50px",
              marginTop: "-25px",
              marginBottom: "-30px",
            }}
          >
            <Typography
              variant="h3"
              sx={{
                fontWeight: 900,
                color: "purple",
                marginTop: "-30px",
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
              Fleet Manager Details
            </Typography>
            <TextField
              id="managerFirstName"
              label="First Name"
              variant="outlined"
              value={firstName}
              onChange={handleManagerFirstNameChange}
              sx={{ marginTop: 2 }}
              helperText={
                isTypingLowercase && !firstName.match(/^[A-Z][a-z]*$/) ? (
                  <span style={{ color: "red" }}>
                    Company name should start with a capital letter
                  </span>
                ) : null
              }
            />
            <TextField
              id="managerLastName"
              label="Last Name"
              variant="outlined"
              value={lastName}
              onChange={handleManagerLastNameChange}
              sx={{ marginTop: 2 }}
              helperText={
                isTypingLowercase && !lastName.match(/^[A-Z][a-z]*$/) ? (
                  <span style={{ color: "red" }}>
                    Company name should start with a capital letter
                  </span>
                ) : null
              }
            />
            <TextField
              id="managerEmail"
              label="Manager Email"
              variant="outlined"
              value={managerEmail}
              onChange={handlemanagerEmailChange}
              sx={{ marginTop: 1 }}
              error={!isEmailValid}
              helperText={!isEmailValid && "Invalid email format"}
            />
            <TextField
              id="managerContactNumber"
              label="Contact Number"
              variant="outlined"
              value={managerNumber}
              onChange={handlemanagerNumberChange}
              sx={{ marginTop: 2 }}
              helperText={
                managerNumber.length > 10 && (
                  <span style={{ color: "red" }}>
                    Contact number should be 10 digits
                  </span>
                )
              }
            />
            <TextField
              id="password"
              label="Enter New Password"
              variant="outlined"
              type="password"
              value={password}
              onChange={handlePasswordChange}
              sx={{ marginTop: 1 }}
              error={!isPasswordValid}
              helperText={
                !isPasswordValid &&
                "Password should be at least 6 characters long"
              }
            />
            <TextField
              id="reEnteredPassword"
              label="Re-Enter New Password"
              variant="outlined"
              type="password"
              value={reEnteredPassword}
              onChange={handleReEnteredPasswordChange}
              sx={{ marginTop: 1 }}
              error={!isPasswordValid}
              helperText={
                !isPasswordValid && "Passwords do not match"
              }
            />
            <br />
            <Box sx={{ display: "inline-block" }}>
              <Button
                variant="contained"
                onClick={onNext}
                sx={{ backgroundColor: "purple" }}
              >
                Next
              </Button>
              &nbsp;&nbsp;&nbsp;&nbsp;
              <Button
                variant="contained"
                onClick={onBack}
                sx={{ color: "black", backgroundColor: "White" }}
              >
                Back
              </Button>
            </Box>
          </Box>
        </form>
      </Box>
    </div>
  );
};
export default Signupf3;
