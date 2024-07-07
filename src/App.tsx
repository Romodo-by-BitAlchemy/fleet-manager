// App.tsx
import * as React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Signupf1 from "./pages/Signupf1";
import "./App.css";
import BarNavigation from "./components/BarNavigation";
import LoginPage from "./pages/LoginPage";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import SetServiceArea from "./components/SetServiceArea";
import VehicleReport from "./pages/VehicleReportPage";
import NavigationBar from "./components/NavigationBar";
import PassengerReportPage from "./pages/PassengerReportPage";
import DriversReport from "./pages/DriversReportPage";
import IssuesReport from "./pages/IssuesReportPage";
import DashboardPage from "./pages/DashboardPage";
import Drivers from './pages/Drivers';
import Passengers from './pages/Passengers';
import Vehicles from './pages/Vehicles';

// Main App component
const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="*" element={<h1>404 Not Found</h1>} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<Signupf1 />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/resetPassword/:token" element={<ResetPassword />} />
        <Route path="/myTestCompany" element={<BarNavigation />} />
        <Route path="/serviceArea" element={<SetServiceArea />} />
        <Route path="/drivers" element={<Drivers />} />

        <Route path="/" element={<NavigationBar />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/vehicle-details" element={<VehicleReport />} />
        <Route path="/passenger-details" element={<PassengerReportPage />} />
        <Route path="/driver-details" element={<DriversReport />} />
        <Route path="/issues-details" element={<IssuesReport />} />
        <Route path="/drivers" element={<Drivers />} />
        <Route path="/passengers" element={<Passengers />} />
        <Route path="/vehicles" element={<Vehicles />} />
      </Routes>
    </Router>
  );
};

export default App;