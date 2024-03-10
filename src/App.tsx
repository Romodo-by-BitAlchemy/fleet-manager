// App.tsx
import * as React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Signupf1 from "./pages/Signupf1";
import Login from "./pages/Login";
<<<<<<< HEAD
// import DashboardPage from "./pages/DashboardPage";
import "./App.css";
import BarNavigation from "./components/BarNavigation";
=======
import DashboardPage from "./pages/DashboardPage";
import "./App.css";
>>>>>>> 428a0b0b ([temporary] Refactor styling and fix typography in App.css and LandingPage.tsx)

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
					<Route path='/myTestCompany' element={<LandingPage />} />		
					
				</Routes>
			</BrowserRouter>
			
		</>
		
};

export default App;
