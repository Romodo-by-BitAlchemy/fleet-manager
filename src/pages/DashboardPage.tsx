// DashboardPage.tsx
import * as React from "react";
import { useParams } from "react-router-dom";

const DashboardPage: React.FC = () => {
	const { text } = useParams();

	return (
		<div>
			{<h1>{text} Page</h1>}
			{<p>hiiiiiiiiiiiiiiiiiiii. this is the dashboard page :)</p>}
			<h1>Dashboard Page</h1>
		</div>
	);
};

export default DashboardPage;
