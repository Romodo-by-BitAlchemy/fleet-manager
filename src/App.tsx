// App.tsx
import * as React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Signupf1 from "./pages/Signupf1";

import "./App.css";
import BarNavigation from "./components/BarNavigation";
import LoginPage from "./pages/LoginPage";
import SetServiceArea from "./components/SetServiceArea";

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
						element={<LoginPage />}
					/>
					<Route
						path="/myTestCompany"
						element={<BarNavigation />} //navbar+dashboardcomponent
					/>
					<Route
						path="/serviceArea"
						element={
							<div className="App">
								<SetServiceArea />
							</div>
						}
					/>
				</Routes>
			</BrowserRouter>
		</>
	);
};

export default App;
