// src/LoginPage.tsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, TextField, /*Container,*/ FormControlLabel, Checkbox, Paper, /*Box*/ Typography} from '@mui/material';
import logo from './RomodoLogo.jpg'; 

const LoginPage = (): JSX.Element => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  
  const handleLogin = () => {
    // Check if the username is entered
    if (!username) {
      setUsernameError(true);
    } else {
      setUsernameError(false);
    }

    // Check if the password is entered
    if (!password) {
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }

    // If both username and password are entered, attempt to log in
    if (username && password) {
      const hardcodedUsername = 'demoUser';
      const hardcodedPassword = 'demoPassword';

      if (username === hardcodedUsername && password === hardcodedPassword) {
        setLoggedIn(true);
        alert('Login successful!');
      } else {
        alert('Invalid username or password. Please try again.');
      }
    }
  };

  // Handle changes in the username field
  const handleUsernameChange = (value: string) => {
    setUsername(value);
    setUsernameError(false); // Clear the error when the user types in the username field
  };

  // Handle changes in the password field
  const handlePasswordChange = (value: string) => {
    setPassword(value);
    setPasswordError(false); // Clear the error when the user types in the password field
  };

  return (
    
    

      <div className="container">
        <div className="left"></div>
        <div className="right">
        
        <Paper elevation={100} className="form" style={{ borderRadius: '100px' }}>
      <img src={logo} alt="Romodo Logo" className='logo'/>

      <br></br>
      <br></br>

        <Typography variant="h4" component="h1" gutterBottom className="typoColor">
          Login
        </Typography>
          
        {loggedIn ? (
            <div>Welcome, {username}! You are logged in.</div>
          ) : (
            <>
              <TextField
                required
                id="username"
                label="Username"
                variant="filled"
                value={username}
                onChange={(e) => handleUsernameChange(e.target.value)}
                margin="normal"
                error={usernameError}
                helperText={usernameError && 'Enter username'}
                className="textfiledStyle"
              />
              
              <TextField
                required
                id="password"
                label="Password"
                type="password"
                variant="filled"
                value={password}
                onChange={(e) => handlePasswordChange(e.target.value)}
                margin="normal"
                error={passwordError}
                helperText={passwordError && 'Enter password'}
                className="textfiledStyle"
                
              />

              <br />
              <Link className="link-instance" color="secondary" to="/password-reset">
                Forgot Password?
              </Link>

            
              <br />

              <FormControlLabel
                control={<Checkbox color="secondary" />}
                className="formcontrollabel-checkbox label-color"
                disabled={false}
                label="I accept the Terms and Conditions"
                //labelPlacement="end"
              />

              <br />
              <br />

              <Button 
              
              color="secondary" 
              size="large" 
              variant="contained" 
              className="button-instance" 
              onClick={handleLogin}>
                LOGIN
              </Button>

              <br />
              <br />

              <div className="span">
                <div className="text-wrapper-2">New user?</div>
                <Link className="link3" color="primary" to="#">
                  Create an account
                </Link>
              </div>
            </>
          )}
       
      </Paper>
    </div>
    </div>
  );
};

export default LoginPage;
