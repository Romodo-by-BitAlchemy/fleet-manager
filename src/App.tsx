// App.tsx
import * as React from "react";
import BarNavigation from "./components/BarNavigation";
import SectionHeaders from "./components/SectionHeaders";
import SectionHeader, {
	SectionHeaderProps as LocalSectionHeaderProps,
} from "./components/SectionHeader";

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
		<div>
			<BarNavigation />
			<SectionHeaders sectionHeaders={sectionHeaders} />

			{sectionHeaders.map((header, index) => (
				<SectionHeader
					key={index}
					{...header}
				/>
			))}
		</div>
	);
};
export default App;
