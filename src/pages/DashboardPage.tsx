// DashboardPage.tsx
import * as React from "react";
import { useParams } from "react-router-dom";
import BarNavigation from "../components/BarNavigation";

const DashboardPage: React.FC = () => {
	const { text } = useParams();

	return (
		<>
			<BarNavigation>
				
			</BarNavigation>

			<div>
					{<h1>{text} Page</h1>}
					{<p>hiiiiiiiiiiiiiiiiiiii. this is the dashboard page :)</p>}
					<h1>Dashboard Page</h1>
				</div>
		</>
	);
};

export default DashboardPage;
