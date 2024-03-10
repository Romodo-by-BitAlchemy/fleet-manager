import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import List from "@mui/material/List";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import DriveEtaIcon from "@mui/icons-material/DriveEta";
import PeopleIcon from "@mui/icons-material/People";
import ArticleIcon from "@mui/icons-material/Article";
import TimeToLeaveIcon from "@mui/icons-material/TimeToLeave";
import SettingsIcon from "@mui/icons-material/Settings";

interface SectionHeaderProps {
	text: string;
	icon: React.ReactElement;
	nestedItems: string[];
	open: boolean;
	handleClick: () => void;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
	text,
	icon,
	nestedItems,
	open,
	handleClick,
}) => (
	<>
		<ListItemButton
			sx={{ minHeight: 48, px: 2.5 }}
			onClick={handleClick}
		>
			<ListItemIcon sx={{ minWidth: 0, mr: 3, justifyContent: "center" }}>
				{icon}
			</ListItemIcon>
			<ListItemText primary={text} />
			{(nestedItems?.length || 0) > 0 &&
				(open ? <ExpandLess /> : <ExpandMore />)}
		</ListItemButton>
		{nestedItems && (
			<Collapse
				in={open}
				timeout="auto"
				unmountOnExit
			>
				<List
					component="div"
					disablePadding
				>
					{nestedItems.map((nestedItem, index) => (
						<ListItemButton
							key={index}
							sx={{ pl: 4 }}
						>
							<ListItemIcon>
								<StarOutlineIcon />
							</ListItemIcon>
							<ListItemText primary={nestedItem} />
						</ListItemButton>
					))}
				</List>
			</Collapse>
		)}
	</>
);

export const useSectionHeaders = () => {
	const [sectionHeaders, setSectionHeaders] = React.useState<
		SectionHeaderProps[]
	>([
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
			open: false,
			handleClick: () => {
				handleSectionHeaderClick("Reports");
			},
		},
		{
			text: "Trips",
			icon: <TimeToLeaveIcon />,
			open: false,
			nestedItems: [],

			handleClick: () => {
				handleSectionHeaderClick("Trips");
			},
		},
		{
			text: "Settings",
			icon: <SettingsIcon />,
			open: false,
			nestedItems: [],

			handleClick: () => {
				handleSectionHeaderClick("Settings");
			},
		},
	]);

	const toggleSectionOpen = (text: string) => {
		setSectionHeaders((currentHeaders) =>
			currentHeaders.map((header) => {
				if (header.text === text) {
					return { ...header, open: !header.open };
				}
				return header;
			})
		);
	};

	const handleSectionHeaderClick = (sectionHeaderText: string) => {
		const updatedSectionHeaders = sectionHeaders.map((header) =>
			header.text === sectionHeaderText
				? { ...header, open: !header.open }
				: header
		);
		setSectionHeaders(updatedSectionHeaders);
	};

	const openAllSections = () => {
		const openedSections = sectionHeaders.map((header) => ({
			...header,
			open: true,
		}));
		setSectionHeaders(openedSections);
	};

	const closeAllSections = () => {
		const closedSections = sectionHeaders.map((header) => ({
			...header,
			open: false,
		}));
		setSectionHeaders(closedSections);
	};

	// Return your hook data and functions
	return {
		sectionHeaders,
		handleSectionHeaderClick,
		openAllSections,
		closeAllSections,
		toggleSectionOpen,
	};
};

export default SectionHeader;
