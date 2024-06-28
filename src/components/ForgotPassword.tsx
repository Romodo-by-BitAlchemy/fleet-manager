import React, { useState, FormEvent } from 'react';
import '../App.css';
import Axios, { AxiosResponse }  from 'axios';
import {  useNavigate } from 'react-router-dom';
import { Typography, TextField, Button } from '@mui/material';

const ForgotPassword: React.FC = () => {
    const [email, setEmail] = useState<string>(""); // Specify string type for email state

    const navigate = useNavigate();

    Axios.defaults.withCredentials = true;

    const handleSubmit = (e: FormEvent<HTMLFormElement>): void => { // Specify event type for handleSubmit
        e.preventDefault();

        // Sending a POST request to the server to initiate password reset
        Axios.post("http://localhost:3000/auth/forgotPassword", {
            email,  // Sending email as part of the request body
        }).then((res: AxiosResponse<{ status: boolean }>) => {
            if (res.data.status) {
                console.log("Email sent");
                alert("Check your email for password reset link.")
                navigate("/login");
            }
            

        }).catch(err => {
            console.log(err);
        });
    };

    return (
        <div className='sign-up-container'>
            <form className='sign-up-form' onSubmit={handleSubmit}>
            <Typography variant="h4" component="h1" gutterBottom className="typoColor">
                Forgot Password
            </Typography>

                
            <TextField
                required
                type="email"
                id="email"
                label="Email"
                variant="filled"
                onChange={(e) => setEmail(e.target.value)}
                margin="normal"
                className="textfiledStyle"
            />
                
            <Button 
                type='submit'
                color="secondary" 
                size="large" 
                variant="contained" 
                className="button-instance" 
                
            >
                SUBMIT
            </Button>
            </form>
        </div>
    )
}

export default ForgotPassword;