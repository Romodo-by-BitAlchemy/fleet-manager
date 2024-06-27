import { useState, FormEvent } from "react";
import "../App.css";
import axios, { AxiosResponse } from "axios";
import { useNavigate, Link } from "react-router-dom";
import { Typography, Button, Box, Grid, TextField, Alert, IconButton, InputAdornment } from "@mui/material";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import BusImage from "../assets/busimage.jpg";
import PasswordStrengthMeter from '../components/PasswordStrengthMeter'; // Import the PasswordStrengthMeter component

const Login: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const navigate = useNavigate();

  //axios.defaults.withCredentials = false;

  // Password strength validation function
  const isStrongPassword = (password: string): boolean => {
    const uppercaseRegex = /[A-Z]/;
    const lowercaseRegex = /[a-z]/;
    const numberRegex = /[0-9]/;
    const specialCharacterRegex = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/;

    return (
      password.length >= 8 &&
      uppercaseRegex.test(password) &&
      lowercaseRegex.test(password) &&
      numberRegex.test(password) &&
      specialCharacterRegex.test(password)
    );
  };

  // Handle form submission
  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    // Check if the password meets the strength criteria
    if (!isStrongPassword(password)) {
      setErrorMessage("Password should contain at least 8 characters, including uppercase letters, lowercase letters, numbers, and special characters");
      return;
    }
    
    // Send a POST request to the server to log in the user
    axios.post("http://localhost:3000/api/v1/user/login", {
      username,
      password,
    }).then((res: AxiosResponse<{ status: boolean , token: string}>) => {
      if (res.data.status) {
        console.log("User logged in successfully");
        localStorage.setItem('token', res.data.token);
        navigate("/myTestCompany");
      }
    }).catch((err) => {
      // Display error messages based on the response from the server
      console.log(err.response.data.message);
      
      if (err.response.data.message === "User is not registered") {
        setErrorMessage("You need to sign up before logging in!");
      } else {
        setErrorMessage("Invalid username or password. Please try again.");
      }
    });
  };

  return (
    <div className="sign-up-container">
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          height: "100vh",
          width: "100vw",
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
            minHeight: "100vh",
            "@media (min-width: 200vh)": {
              flex: 0.4,
            },
          }}
        ></Box>

        <Grid
          container
          justifyContent="center"
          alignItems="center"
          sx={{
            flex: 1,
            padding: "20px",
            "@media (min-width: 600px)": {
              flex: 0.5,
            },
          }}
        >
          <form className="sign-up-form" onSubmit={handleSubmit}>
            <Typography variant="h4" component="h1" gutterBottom className="typoColor">
              Login
            </Typography>

            <TextField
              required
              type="text"
              id="username"
              label="Username"
              variant="filled"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              margin="normal"
              className="textfiledStyle"
              fullWidth
            />

            <TextField
              required
              type={showPassword ? 'text' : 'password'}
              id="password"
              name="password"
              label="Password"
              variant="filled"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              margin="normal"
              className="textfiledStyle"
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      onMouseDown={(e) => e.preventDefault()}
                      edge="end"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            {password && <PasswordStrengthMeter password={password} />} {/* Password strength meter */}

            <Typography variant="body2" align="right" sx={{ marginY: 1 }}>
              <Link to="/forgotPassword">Forgot Password?</Link>
            </Typography>

            {errorMessage && <Alert severity="error" sx={{ marginY: 2 }}>{errorMessage}</Alert>}
            
            <Button
              type="submit"
              color="primary"
              size="large"
              variant="contained"
              className="button-instance"
              fullWidth
              sx={{ marginY: 2 }}
            >
              Login
            </Button>
            
            <Typography variant="body2" align="center">
              Don't have an account? <Link to="/signup">Sign Up</Link>
            </Typography>
          </form>
        </Grid>
      </Box>
    </div>
  );
};

export default Login;
