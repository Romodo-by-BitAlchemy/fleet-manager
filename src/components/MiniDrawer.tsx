import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Badge from "@mui/material/Badge";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import Popover from "@mui/material/Popover";
import List from "@mui/material/List";
import {
	Grid,
	ListItemButton,
	ListItemText,
	Menu,
	MenuItem,
	Stack,
} from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import { useSectionHeaders } from "./SectionHeader";
import SectionHeader from "./SectionHeader";
import Drivers from "../pages/Drivers";
import { history, AppBar, Drawer, DrawerHeader } from "./BarNavigation";

import Trips from "../pages/Trips";
import Reports from "../pages/Reports";
import Passengers from "../pages/Passengers";
import Settings from "../pages/Settings";
import DashboardPage from "../pages/DashboardPage";
import Vehicles from "../pages/Vehicles";
// import DashboardPage from "../pages/DashboardPage";

// Props for the MiniDrawer component
export type MiniDrawerProps = {
	children?: React.ReactNode;
	activeSection?: string;
	onSectionClick?: (section: string) => React.ReactNode;
};

// Main component

export default function MiniDrawer() {
	const [activeSelection, setActiveSelection] = React.useState("");

	const handleSectionClick = (section: string) => {
		setActiveSelection(section);
	};

	const theme = useTheme();
	const [open, setOpen] = React.useState(false);
	const {
		sectionHeaders,
		openAllSections,
		closeAllSections,
		toggleSectionOpen,
	} = useSectionHeaders();

	// Event handler for opening the drawer
	const handleDrawerOpen = () => {
		setOpen(true);
		openAllSections();
	};

	// Event handler for closing the drawer
	const handleDrawerClose = () => {
		setOpen(false);
		closeAllSections();
	};

	// State and event handlers for the notification popover
	const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
	const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	// State and event handlers for the notification popover
	const [notificationAnchorEl, setNotificationAnchorEl] =
		React.useState<HTMLElement | null>(null);
	const handleNotificationClick = (event: React.MouseEvent<HTMLElement>) => {
		setNotificationAnchorEl(event.currentTarget);
	};
	const handleNotificationClose = () => {
		setNotificationAnchorEl(null);
	};
	const openNotification = Boolean(notificationAnchorEl);

	// Event handler for clicking the app bar heading
	const handleAppBarHeadingClick = () => {
		history.push(`/`);
	};

	// Function to calculate the notification count
	const notificationCount = () => {
		return 1 + 1;
	};

	return (
		<Stack>
			<AppBar
				position="fixed"
				open={open}
				sx={{
					height: " 10vh",
					justifyContent: "center",
					scale: 0.5,
				}}
			>
				<Toolbar>
					<IconButton
						color="inherit"
						aria-label="open drawer"
						onClick={handleDrawerOpen}
						edge="start"
						sx={{ marginRight: 5, ...(open && { display: "none" }) }}
					>
						<MenuIcon />
					</IconButton>
					<Typography
						variant="h6"
						noWrap
						component="div"
						onClick={handleAppBarHeadingClick}
					>
						ROMODO
					</Typography>
					<div style={{ marginLeft: "auto" }}>
						<IconButton
							size="large"
							color="inherit"
							aria-label="notifications"
							onClick={handleNotificationClick}
						>
							<Badge
								badgeContent={notificationCount()}
								color="warning"
							>
								<NotificationsActiveIcon />
							</Badge>
						</IconButton>
						<Popover
							open={openNotification}
							anchorEl={notificationAnchorEl}
							onClose={handleNotificationClose}
							anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
							transformOrigin={{ vertical: "top", horizontal: "left" }}
						>
							<List>
								<ListItemButton>
									<ListItemText primary="Notification 1" />
								</ListItemButton>
								<ListItemButton>
									<ListItemText primary="Notification 2" />
								</ListItemButton>
								<ListItemButton>
									<ListItemText primary="Notification 3" />
								</ListItemButton>
							</List>
						</Popover>
						<IconButton
							size="large"
							aria-label="account"
							aria-controls="menu-appbar"
							aria-haspopup="true"
							onClick={handleMenu}
							color="inherit"
						>
							<AccountCircleIcon />
						</IconButton>
						<Menu
							id="menu-appbar"
							anchorEl={anchorEl}
							anchorOrigin={{ vertical: "top", horizontal: "right" }}
							keepMounted
							transformOrigin={{ vertical: "top", horizontal: "right" }}
							open={Boolean(anchorEl)}
							onClose={handleClose}
						>
							<MenuItem onClick={handleClose}>Manage Profile</MenuItem>
							<MenuItem onClick={handleClose}>Logout</MenuItem>
						</Menu>
					</div>
				</Toolbar>
			</AppBar>
			<Grid container>
				<Grid item>
					<Drawer
						theme={theme}
						variant="permanent"
						open={open}
					>
						<DrawerHeader>
							<IconButton onClick={handleDrawerClose}>
								{theme.direction === "rtl" ? (
									<ChevronRightIcon />
								) : (
									<ChevronLeftIcon />
								)}
							</IconButton>
						</DrawerHeader>
						<Divider />
						<List>
							{sectionHeaders.map(
								({ text, icon, nestedItems, open }, index) => (
									<Tooltip
										title={text}
										key={index}
									>
										<SectionHeader
											key={index}
											text={text}
											icon={icon}
											nestedItems={nestedItems || []}
											open={open}
											handleClick={() => {
												if (nestedItems.length > 0) {
													setOpen(true);
													toggleSectionOpen(text);
												}
												handleSectionClick(text);
											}}
										/>
									</Tooltip>
								)
							)}
						</List>
					</Drawer>
				</Grid>
				<Grid
					item
					sx={{
						flexGrow: 1,
						flexShrink: 1,
						maxWidth: "100%",
						mt: "10vh",
					}}
				>
					{activeSelection === "Drivers" && <Drivers />}
					{activeSelection === "Passengers" && <Passengers />}
					{activeSelection === "Settings" && <Settings />}
					{activeSelection === "Reports" && <Reports />}
					{activeSelection === "Trips" && <Trips />}
					{activeSelection === "Vehicles" && <Vehicles />}
					{activeSelection === "" && <DashboardPage />}
					{activeSelection === "Dashboard" && <DashboardPage />}
				</Grid>
			</Grid>
		</Stack>
	);
}
