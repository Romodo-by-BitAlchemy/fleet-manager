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
