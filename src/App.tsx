// App.tsx
import * as React from "react";
import BarNavigation from "./components/BarNavigation";
// import SectionHeaders from "./components/SectionHeaders";

// Define the type for sectionHeaders
export interface SectionHeaderProps {
	text: string;
	icon: React.ReactElement;
	nestedItems?: string[];
	open: boolean;
	handleClick: () => void;
}
const App: React.FC = () => {
	return (
		<>
			<BarNavigation />
			{/* <Routes>
				<Route
					path="/dashboard"
					element={<DashboardPage />}
				/>
			</Routes> */}
		</>
	);
};
export default App;
