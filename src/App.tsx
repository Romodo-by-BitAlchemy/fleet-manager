// App.tsx
import * as React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Signupf1 from "./pages/Signupf1";

import "./App.css";
import BarNavigation from "./components/BarNavigation";
import Login from "./pages/Login";
import ResetPassword from "./pages/ResetPassword";
import ForgotPassword from "./pages/ForgotPassword";
import Logout from "./pages/Logout";
import SetServiceArea from "./components/SetServiceArea";
import DriverReport from "./pages/reports/DriversReport";

// Main App component
const App: React.FC = () => {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route
						path="*"
						element={<h1>404 Not Found</h1>}
					></Route>
					<Route
						path="/"
						element={<LandingPage />}
					/>
					<Route
						path="/signup"
						element={<Signupf1 />}
					/>
					<Route
						path="/login"
						element={<Login />}
					/>
					<Route
						path="/resetPassword/:token"
						element={<ResetPassword />}
					/>
					<Route
						path="/forgotPassword"
						element={<ForgotPassword />}
					/>
					<Route
						path="/logout"
						element={<Logout />}
					/>
					<Route
						path="/myTestCompany"
						element={<BarNavigation />} //navbar+dashboardcomponent
					/>
					<Route
						path="/serviceArea"
						element={<SetServiceArea />}
					/>
					<Route
						path="/reports/drivers"
						element={<DriverReport/>
						}	/>
				</Routes>
			</BrowserRouter>
		</>
	);
};

export default App;
