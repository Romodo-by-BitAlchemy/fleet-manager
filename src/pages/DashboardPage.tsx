// DashboardPage.tsx
import * as React from "react";
// import { useParams } from "react-router-dom";
import MiniDrawer from "../components/BarNavigation";
import Login from "./Login";

const DashboardPage: React.FC = () => {
	return (
		<>
			<MiniDrawer>
				<Login></Login>
			</MiniDrawer>
		</>
	);
};

export default DashboardPage;
