//import React from 'react';
import { Box, LinearProgress, Typography } from '@mui/material';

interface PasswordStrengthMeterProps {
    password: string;
}

const PasswordStrengthMeter: React.FC<PasswordStrengthMeterProps> = ({ password }) => {
    const calculatePasswordStrength = (password: string): number => {
        let strength = 0;
        if (password.length >= 8) strength += 1;
        if (/[A-Z]/.test(password)) strength += 1;
        if (/[a-z]/.test(password)) strength += 1;
        if (/[0-9]/.test(password)) strength += 1;
        if (/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password)) strength += 1;
        return strength;
    };

    const strength = calculatePasswordStrength(password);
    const strengthLabel = ['Very Weak', 'Weak', 'Moderate', 'Strong', 'Very Strong'][strength];
    const strengthColor = ['error', 'warning', 'info', 'success', 'success'][strength];

    return (
        <Box sx={{ marginY: 1 }}>
            <Typography variant="body2">Password Strength: {strengthLabel}</Typography>
            <LinearProgress variant="determinate" value={(strength / 5) * 100} color={strengthColor} />
        </Box>
    );
};

export default PasswordStrengthMeter;
