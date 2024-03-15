// src/PasswordResetPage.tsx
import { useState } from 'react';
import { Button, TextField, Typography, /*Container,*/ Paper,IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import logo from './RomodoLogo.jpg'; 

const PasswordResetPage = (): JSX.Element => {
  const [email, setEmail] = useState('');
  const [resetLinkSent, setResetLinkSent] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [emptyFieldsError, setEmptyFieldsError] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);

  const handleSendResetLink = () => {
    if (email.trim() === '') {
      setEmptyFieldsError(true);
      setEmailError(false); // Reset email error state
      return;
    }

    // Check if the email is valid before sending the reset link
    if (validateEmail(email)) {
      console.log('Sending reset link to:', email);
      setResetLinkSent(true);
      setEmailError(false); // Reset email error state
      setEmptyFieldsError(false); // Reset empty fields error state
    } else {
      // Invalid email, set the email error state to true
      setEmailError(true);
      setEmptyFieldsError(false); // Reset empty fields error state
    }
  };

  const handleResetPassword = () => {
    if (newPassword.trim() === '' || confirmPassword.trim() === '') {
      setEmptyFieldsError(true);
      setPasswordsMatch(true); // Reset passwordsMatch state when passwords match
      return;
    }

    if (newPassword === confirmPassword) {
      console.log('Resetting password with:', { newPassword, confirmPassword });
      alert('Password reset successfully!');
      setResetSuccess(true);
      setNewPassword(''); // Clear newPassword field
      setConfirmPassword(''); // Clear confirmPassword field
      setEmail(''); // Clear email field
      setPasswordsMatch(true); // Reset passwordsMatch state when passwords match
      setEmptyFieldsError(false); // Reset empty fields error state
    } else {
      setPasswordsMatch(false);
      setEmptyFieldsError(false); // Reset empty fields error state
    }
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  // Function to validate email format
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  return (
    <div className="container">
      <div className="left"></div>
        <div className="right">
    
      <Paper elevation={20} className="form" style={{ borderRadius: '100px' }}>
      <img src={logo} alt="Romodo Logo" className='logo'/>

      <br></br>
      <br></br>

        <Typography component="h1" variant="h4" className="typoColor">
          {resetLinkSent ? 'Reset Password' : 'Forgot Password'}
        </Typography>

        <br></br>
        

        
          {resetLinkSent ? (
            <>
              
                
                <TextField
                  required
                  variant="filled"
                  id='newPassword'
                  label="New Password"
                  /*margin='normal'*/
                  type={showPassword ? 'text' : 'password'}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  error={!passwordsMatch || emptyFieldsError}
                  helperText={!passwordsMatch ? "Passwords don't match" : (emptyFieldsError && 'Enter value to proceed')}
                  className="textfiledStyle"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={handleTogglePasswordVisibility} edge="end">
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              
              <br></br>
              

              
                <TextField
                  required
                  variant="filled"
          
                  label="Confirm Password"
                  type={showPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  error={!passwordsMatch || emptyFieldsError}
                  helperText={!passwordsMatch ? "Passwords don't match" : (emptyFieldsError && 'Enter value to proceed')}
                  className="textfiledStyle"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={handleTogglePasswordVisibility} edge="end">
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
             
              
              <br></br>
              <br></br>

             
                <div className="button-container">
                  <Button
                    variant="contained"
                    color="secondary"
                    size="large"
                    onClick={handleResetPassword}
                    className="button-instance"
                  >
                    Reset
                  </Button>

                  <Button
                    variant="outlined"
                    color="secondary"
                    size="large"
                    onClick={() => setResetLinkSent(false)}
                    className="button-instance"
                  >
                    Cancel
                  </Button>
                </div>
              
            </>
          ) : (
            <>
            <br></br>
            <br></br>

             
                <TextField
                  required
                  variant="filled"
                  
                  label="Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  error={emailError || emptyFieldsError}
                  helperText={(emailError && 'Invalid email format') || (emptyFieldsError && 'Enter value to proceed')}
                  className="textfiledStyle"
                />
              

              <br></br>
              <br></br>

           
                
                  <Button
                    variant="contained"
                    color="secondary"
                    size="large"
                    onClick={handleSendResetLink}
                    className="button-instance"
                  >
                    Submit
                  </Button>
               
             
            </>
          )}
        

        <br></br>
        <br></br>

     </Paper>
    
    </div>
    </div>
  );
};

export default PasswordResetPage;
