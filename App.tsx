// src/App.tsx
//import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { LoginPage, PasswordResetPage } from "./AppPages"; // Assuming the file is named AppPages.tsx
import './App.css';

const App = (): JSX.Element => {
  return (
    <Router>
      <Routes>
        <Route path="login" element={<LoginPage />} />
        <Route path="password-reset" element={<PasswordResetPage />} />
        <Route path="" element={<Navigate to="login" />} /> // Fix: Import the Navigate component
      </Routes>
    </Router>
  );
};

export default App;
