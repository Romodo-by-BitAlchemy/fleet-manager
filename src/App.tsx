// App.tsx
import * as React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Signupf1 from "./pages/Signupf1";

import "./App.css";
import BarNavigation from "./components/BarNavigation";
import LoginPage from "./pages/LoginPage";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import SetServiceArea from "./components/SetServiceArea";
import VehicleReport from "./Pages/VehicleReportPage";
import NavigationBar from "./Components/NavigationBar";
import PassengerReportPage from "./Pages/PassengerReportPage";
import DriversReport from "./Pages/DriversReportPage";
import IssuesReport from "./Pages/IssuesReportPage";

// Main App component
const App: React.FC = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<h1>404 Not Found</h1>}></Route>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<Signupf1 />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/forgotPassword" element={<ForgotPassword />} />
          <Route path="/resetPassword/:token" element={<ResetPassword />} />
          <Route
            path="/myTestCompany"
            element={<BarNavigation />} //navbar+dashboardcomponent
          />
          <Route path="/serviceArea" element={<SetServiceArea />} />
          <Route path="/reports/drivers" element={<DriverReport />} />

		  {/* //Piranaavei */}
          <Route path="/" element={<NavigationBar />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/reports/vehicle-details" element={<VehicleReport />} />
          <Route path="/reports/passenger-details" element={<PassengerReportPage />}/>
          <Route path="/reports/driver-details" element={<DriversReport />} />
          <Route path="/reports/issues-details" element={<IssuesReport />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;

/////Integrated Dashboard codes
// src/App.tsx

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DashboardPage from './pages/Dashboard';
import VehicleReport from "./pages/VehicleReportPage";
import NavigationBar from "./components/NavigationBar";
import PassengerReportPage from "./pages/PassengerReportPage";
import DriversReport from "./pages/DriversReportPage";
import IssuesReport from "./pages/IssuesReportPage";
import Drivers from './pages/Drivers';
import Passengers from './pages/Passengers';
import Vehicles from './pages/Vehicles';


const App: React.FC = () => {
  return (
    <Router>
    
        
        <Routes>
        <Route  path="/" element={<NavigationBar/>} />
          <Route  path="/dashboard" element={<DashboardPage/>} />
          <Route path="/reports/vehicle-details" element={<VehicleReport />} />
        <Route
          path="/reports/passenger-details"
          element={<PassengerReportPage />}
        />
		<Route path ="/drivers" element={<Drivers/>} />
		<Route path ="/passengers" element={<Passengers/>} />
		<Route path ="/vehicles" element ={<Vehicles/>}/>

        <Route path="/reports/driver-details" element={<DriversReport />} />
        <Route path ="/reports/issues-details" element={<IssuesReport />} /></Routes>
     
    </Router>
  );
};

export default App;
