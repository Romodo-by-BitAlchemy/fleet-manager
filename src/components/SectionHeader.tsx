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
import { Tooltip } from "@mui/material";
import handleSectionClick, { MiniDrawerProps } from "./MiniDrawer";

// Define the props for the SectionHeader component
interface SectionHeaderProps {
	text: string;
	icon: React.ReactElement;
	nestedItems: string[];
	open: boolean;
	handleClick: () => void;
}

// SectionHeader component
export const SectionHeader: React.FC<SectionHeaderProps> = ({
	text,
	icon,
	nestedItems,
	open,
	handleClick,
}) => (
	<>
		{/* Tooltip for displaying the text */}
		<Tooltip
			title={text}
			arrow
			placement="right"
		>
			{/* ListItemButton for the section header */}
			<ListItemButton
				sx={{ minHeight: 48, px: 2.5 }}
				onClick={handleClick}
			>
				{/* Icon for the section header */}
				<ListItemIcon sx={{ minWidth: 0, mr: 3, justifyContent: "center" }}>
					{icon}
				</ListItemIcon>
				{/* Text for the section header */}
				<ListItemText primary={text} />

				{/* Show ExpandLess or ExpandMore icon based on the open state */}
				{(nestedItems?.length || 0) > 0 &&
					(open ? <ExpandLess /> : <ExpandMore />)}
			</ListItemButton>
		</Tooltip>

		{/* Collapse component for the nested items */}
		{nestedItems && (
			<Collapse
				in={open}
				timeout="auto"
				unmountOnExit
			>
				{/* List component for the nested items */}
				<List
					component="div"
					disablePadding
				>
					{/* Render each nested item */}
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

// Custom hook for managing section headers
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

	// Toggle the open state of a section
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

	// Handle click on a section header
	const handleSectionHeaderClick = (sectionHeaderText: string) => {
		const updatedSectionHeaders = sectionHeaders.map((header) =>
			header.text === sectionHeaderText
				? { ...header, open: !header.open }
				: header
		);
		setSectionHeaders(updatedSectionHeaders);
		handleSectionClick();
	};

	// Open all sections
	const openAllSections = () => {
		const openedSections = sectionHeaders.map((header) => ({
			...header,
			open: true,
		}));
		setSectionHeaders(openedSections);
	};

	// Close all sections
	const closeAllSections = () => {
		const closedSections = sectionHeaders.map((header) => ({
			...header,
			open: false,
		}));
		setSectionHeaders(closedSections);
	};

	return {
		sectionHeaders,
		handleSectionHeaderClick,
		openAllSections,
		closeAllSections,
		toggleSectionOpen,
	};
};

export default SectionHeader;
