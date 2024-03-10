// App.tsx
import * as React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Signupf1 from "./pages/Signupf1";
import Login from "./pages/Login";
import DashboardPage from "./pages/DashboardPage";

// Main App component
const App: React.FC = () => {
	return (
		<>
			<BrowserRouter>
				<Routes>
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
				</Routes>
			</BrowserRouter>
			<BrowserRouter basename="/myTestCompany">
				<Route
					path="/dashboard"
					element={<DashboardPage />}
				/>
			</BrowserRouter>
		</>
	);
};

export default App;
