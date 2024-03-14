// App.tsx
import * as React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Signupf1 from "./pages/Signupf1";
import Login from "./pages/Login";
<<<<<<< HEAD
<<<<<<< HEAD
// import DashboardPage from "./pages/DashboardPage";
import "./App.css";
import BarNavigation from "./components/BarNavigation";
=======
import DashboardPage from "./pages/DashboardPage";
import "./App.css";
>>>>>>> 428a0b0b ([temporary] Refactor styling and fix typography in App.css and LandingPage.tsx)
=======
// import DashboardPage from "./pages/DashboardPage";
import "./App.css";
import BarNavigation from "./components/BarNavigation";

>>>>>>> 804d2c4b3775c25da31462f7a7aa1cf170b1f036

// Main App component
const App: React.FC = () => {
	return (
<<<<<<< HEAD
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
		
=======
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
				<Route
					path="/myTestCompany"
					element={<BarNavigation />}

				/>
			</Routes>
		</BrowserRouter>
	);
>>>>>>> 804d2c4b3775c25da31462f7a7aa1cf170b1f036
};

export default App;
