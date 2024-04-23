import { useState, FormEvent } from 'react';
import '../App.css';
import Axios, { AxiosResponse } from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Typography, TextField, Button, Alert } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const ResetPassword: React.FC = () => {
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const { token } = useParams<{ token: string }>();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string>('');

    const navigate = useNavigate();

    const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        if (password !== confirmPassword) {
            const error = "Passwords do not match";
            setErrorMessage(error);
            console.log(error);
            return;
        }else {
            setErrorMessage(""); // Reset error message when passwords match
        }
        Axios.post("http://localhost:3000/auth/resetPassword/"+token, {
            password,
        }).then((res: AxiosResponse<{ status: boolean }>) => {
            if (res.data.status) {
                alert("Password reset successfully");
                console.log("Password reset successfully");
                navigate('/login');
            }
            console.log(res.data);
        }).catch((err: any) => {
            console.log(err);
        });
    };

    return (
        <div className='sign-up-container'>
            <form className='sign-up-form' onSubmit={handleSubmit}>
                <Typography variant="h4" component="h1" gutterBottom className="typoColor">
                    Reset Password
                </Typography>
                
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
                                    {showPassword ? <Visibility /> : <VisibilityOff /> } 
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
                
                <TextField
                    required
                    type={showConfirmPassword ? 'text' : 'password'}
                    id="confirmPassword"
                    name="confirmPassword"
                    label="Confirm Password"
                    variant="filled"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    margin="normal"
                    className="textfiledStyle"
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    onMouseDown={(e) => e.preventDefault()}
                                    edge="end"
                                >
                                    {showConfirmPassword ? <Visibility /> : <VisibilityOff /> } 
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />

                <br />   

                {errorMessage && <Alert severity="error">{errorMessage}</Alert>} {/* Render error message if error state is not empty */}

                <br /><br />
      
                <Button 
                    type='submit'
                    color="secondary" 
                    size="large" 
                    variant="contained" 
                    className="button-instance" 
                >
                    RESET
                </Button>
                

                
            </form>
        </div>
    )
}

export default ResetPassword;
