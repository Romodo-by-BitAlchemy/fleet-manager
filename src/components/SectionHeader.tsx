// SectionHeader.tsx
import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import List from "@mui/material/List";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import { createBrowserHistory } from "history";
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
	nestedItems?: string[];
	open: boolean;
	handleClick: () => void;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
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
			{text === "Reports" && (open ? <ExpandLess /> : <ExpandMore />)}
		</ListItemButton>
		{nestedItems && (
			<Collapse
				in={open && text === "Reports"}
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

export default SectionHeader;

const [open, setOpen] = React.useState(false);
const history = createBrowserHistory();

export const handleSectionHeaderClick = (sectionHeaderText: string) => {
	history.push(`/${sectionHeaderText.toLowerCase()}`);
	const sectionIndex = sectionHeaders.findIndex(
		(header) => header.text === sectionHeaderText
	);

	if (sectionIndex !== -1) {
		const updatedSectionHeaders = [...sectionHeaders];
		updatedSectionHeaders[sectionIndex].open =
			!updatedSectionHeaders[sectionIndex].open;
		setSectionHeaders(updatedSectionHeaders);
	}

	if (sectionIndex === 4) {
		setOpen(true);
	} else setOpen(open);
};

export const [sectionHeaders, setSectionHeaders] = React.useState<
	SectionHeaderProps[]
>([
	{
		text: "Dashboard",
		icon: <DashboardIcon />,
		nestedItems: [],
		open: false,
		handleClick: () => {},
	},
	{
		text: "Drivers",
		icon: <PersonIcon />,
		nestedItems: [],
		open: false,
		handleClick: () => {},
	},
	{
		text: "Vehicles",
		icon: <DriveEtaIcon />,
		nestedItems: [],
		open: false,
		handleClick: () => {},
	},
	{
		text: "Passengers",
		icon: <PeopleIcon />,
		nestedItems: [],
		open: false,
		handleClick: () => {},
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
		handleClick: () => handleSectionHeaderClick("Reports"),
	},
	{
		text: "Trips",
		icon: <TimeToLeaveIcon />,
		open: false,
		handleClick: () => {},
	},
	{
		text: "Settings",
		icon: <SettingsIcon />,
		open: false,
		handleClick: () => {},
	},
]);
