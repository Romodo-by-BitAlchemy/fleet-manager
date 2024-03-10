// DashboardPage.tsx
import * as React from "react";
import { useParams } from "react-router-dom";
import BarNavigation from "../components/BarNavigation";
import MiniDrawer from "../components/BarNavigation";
import Login from "./Login";

const DashboardPage: React.FC = () => {
	const { text } = useParams();

	return (
		<>
			<MiniDrawer>
				<Login></Login>
			</MiniDrawer>

			{/* <div>
				{<h1>{text} Page</h1>}
				{<p>hiiiiiiiiiiiiiiiiiiii. this is the dashboard page :)</p>}
				<h1>Dashboard Page</h1>
			</div> */}
		</>
	);
};

export default DashboardPage;
