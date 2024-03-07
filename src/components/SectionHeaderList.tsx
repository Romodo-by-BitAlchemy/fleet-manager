import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import DriveEtaIcon from "@mui/icons-material/DriveEta";
import PeopleIcon from "@mui/icons-material/People";
import ArticleIcon from "@mui/icons-material/Article";
import TimeToLeaveIcon from "@mui/icons-material/TimeToLeave";
import SettingsIcon from "@mui/icons-material/Settings";
import { createBrowserHistory } from "history";
import * as React from "react";

interface SectionHeaderProps {
	text: string;
	icon: React.ReactElement;
	nestedItems?: string[];
	open: boolean;
	handleClick: () => void;
}

const history = createBrowserHistory();

export const useSectionHeaderlist = () => {
	const handleSectionHeaderClick = (sectionHeaderText: string) => {
		const [sectionHeaders, setSectionHeaders] = React.useState<
			SectionHeaderProps[]
		>(initialSectionHeaders);

		const sectionIndex = sectionHeaders.findIndex(
			(header) => header.text === sectionHeaderText
		);

		if (sectionIndex !== -1) {
			const updatedSectionHeaders = [...sectionHeaders];
			updatedSectionHeaders[sectionIndex].open =
				!updatedSectionHeaders[sectionIndex].open;

			setSectionHeaders(updatedSectionHeaders);
		}

		history.push(`/${sectionHeaderText.toLowerCase()}`);
	};
};

export const initialSectionHeaders: SectionHeaderProps[] = [
	{
		text: "Dashboard",
		icon: <DashboardIcon />,
		nestedItems: [],
		open: false,
		handleClick: () => {
			handleSectionHeaderClick("Dashboard");
		},
	},
	{
		text: "Drivers",
		icon: <PersonIcon />,
		nestedItems: [],
		open: false,
		handleClick: () => {
			handleSectionHeaderClick("Drivers");
		},
	},
	{
		text: "Vehicles",
		icon: <DriveEtaIcon />,
		nestedItems: [],
		open: false,
		handleClick: () => {
			handleSectionHeaderClick("Vehicles");
		},
	},
	{
		text: "Passengers",
		icon: <PeopleIcon />,
		nestedItems: [],
		open: false,
		handleClick: () => {
			handleSectionHeaderClick("Passengers");
		},
	},
	{
		text: "Reports",
		icon: <ArticleIcon />,
		nestedItems: [
			"Accident/malfunction report",
			"Driver details report",
			"Passenger details report",
			"Vehicle details report",
			"Distance report",
			"Filtered reports",
		],
		open: false, // Added this to match the expected type
		handleClick: () => {
			handleSectionHeaderClick("Reports");
		},
	},
	{
		text: "Trips",
		icon: <TimeToLeaveIcon />,
		open: false,
		handleClick: () => {
			handleSectionHeaderClick("Trips");
		},
	},
	{
		text: "Settings",
		icon: <SettingsIcon />,
		open: false,
		handleClick: () => {
			handleSectionHeaderClick("Settings");
		},
	},
];

// const SectionHeaderList = () => {
//     const [sectionHeaders, setSectionHeaders] = React.useState<
//         SectionHeaderProps[]
//         >(initialSectionHeaders);
//     return initialSectionHeaders;
// }
