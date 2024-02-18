// App.tsx
import * as React from "react";
import BarNavigation from "./components/BarNavigation";
import SectionHeaders from "./components/SectionHeaders";
import SectionHeader, {
	SectionHeaderProps as LocalSectionHeaderProps,
} from "./components/SectionHeader";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DashboardPage from "./components/DashboardPage";

// Define the type for sectionHeaders
export interface SectionHeaderProps {
	text: string;
	icon: React.ReactElement;
	nestedItems?: string[];
	open: boolean;
	handleClick: () => void;
}
const App: React.FC = () => {
	const sectionHeaders: LocalSectionHeaderProps[] = [
		// Define your sectionHeaders array here
	];

	return (
		<Router>
			<div>
				<BarNavigation />
				<SectionHeaders sectionHeaders={sectionHeaders} />

				{sectionHeaders.map((header, index) => (
					<SectionHeader
						key={index}
						{...header}
					/>
				))}

				<Routes>
					<Route
						path="/dashboard"
						element={<DashboardPage />}
					/>
				</Routes>
			</div>
		</Router>
	);
};
export default App;
