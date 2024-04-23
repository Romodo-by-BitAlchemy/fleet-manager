import { useState, FormEvent } from "react";
import "../App.css";
import Axios, { AxiosResponse } from "axios";
import { useNavigate, Link } from "react-router-dom";
import { Typography, Button, TextField, Alert ,IconButton, InputAdornment} from "@mui/material";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const Login: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>(""); // State for error message

  const navigate = useNavigate();

  Axios.defaults.withCredentials = true;

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    Axios.post("http://localhost:3000/auth/login", {
      username,
      password,
    }).then((res: AxiosResponse<{ status: boolean }>) => {
      if (res.data.status) {
        console.log("User logged in successfully");
        alert("User logged in successfully");
        navigate("/");
      }
    }).catch((err: any) => {
      console.log(err);
      // Set error message for invalid data
      setErrorMessage("Invalid username or password. Please try again.");
    });
  };

  return (
    <div className="sign-up-container">
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

        <br/>
        
        <Typography>
          Forgot Password?<Link  color="secondary" to="/forgotPassword"></Link>
        </Typography>
        
        
        
        {errorMessage && <Alert severity="error">{errorMessage}</Alert>} {/* Render error message if error state is not empty */}
        
        <br/><br/>
        
        <Button 
          type='submit'
          color="secondary" 
          size="large" 
          variant="contained" 
          className="button-instance" 
        >
          Login
        </Button>
        
        <br />
        
        <Typography>
          Don't have an account? <Link to="/signup" color="secondary"> Sign Up</Link>{" "}
        </Typography>
      </form>
    </div>
  );
};

export default Login;
