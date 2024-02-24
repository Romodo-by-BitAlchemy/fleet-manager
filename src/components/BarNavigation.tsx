import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import { AppBarStyled } from "./AppBar";
import { AppDrawer } from "./AppDrawer";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import { Toolbar } from "@mui/material";

const drawerWidth = screen.width * 0.2;

export default function BarNavigation() {
	const theme = useTheme();
	const [open, setOpen] = React.useState(false);
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const [notificationAnchorEl, setNotificationAnchorEl] =
		React.useState<null | HTMLElement>(null);

	const handleDrawerOpen = () => setOpen(true);
	const handleDrawerClose = () => setOpen(false);
	const handleMenu = (event: React.MouseEvent<HTMLElement>) =>
		setAnchorEl(event.currentTarget);
	const handleClose = () => setAnchorEl(null);
	const handleNotificationClick = (event: React.MouseEvent<HTMLElement>) =>
		setNotificationAnchorEl(event.currentTarget);
	const handleNotificationClose = () => setNotificationAnchorEl(null);

	const sectionHeaders = [
		{ text: "Dashboard", icon: <DashboardIcon />, nestedItems: [] },
		{ text: "Dashboard", icon: <DashboardIcon />, nestedItems: [] },
		{ text: "Dashboard", icon: <DashboardIcon />, nestedItems: [] },
		{ text: "Dashboard", icon: <DashboardIcon />, nestedItems: [] },
		{ text: "Squeeeee", icon: <DashboardIcon />, nestedItems: [] },
		{ text: "Dashboard", icon: <DashboardIcon />, nestedItems: [] },
		{ text: "Dashboard", icon: <DashboardIcon />, nestedItems: [] },
		{ text: "Dashboard", icon: <DashboardIcon />, nestedItems: [] },
		{ text: "Dashboard", icon: <DashboardIcon />, nestedItems: [] },
		{ text: "Drivers", icon: <PersonIcon />, nestedItems: [] },
		{ text: "Drivers", icon: <PersonIcon />, nestedItems: [] },
		{ text: "Drivers", icon: <PersonIcon />, nestedItems: [] },
		{ text: "Drivers", icon: <PersonIcon />, nestedItems: [] },
		{ text: "Hellooo", icon: <PersonIcon />, nestedItems: [] },
		{ text: "Drivers", icon: <PersonIcon />, nestedItems: [] },
		{ text: "Drivers", icon: <PersonIcon />, nestedItems: [] },
		{ text: "Drivers", icon: <PersonIcon />, nestedItems: [] },
		// Add other sections here...
	];

	return (
		<Box>
			<CssBaseline />

			<Box>
				<AppBarStyled
					open={open}
					position="absolute" // change position to "fixed"
					drawerWidth={drawerWidth}
					handleDrawerOpen={handleDrawerOpen}
					handleMenu={handleMenu}
					handleClose={handleClose}
					handleNotificationClick={handleNotificationClick}
					handleNotificationClose={handleNotificationClose}
					anchorEl={anchorEl}
					notificationAnchorEl={notificationAnchorEl}
					notificationCount={4} // Add the missing notificationCount property
				/>
			</Box>

			<Box>
				<AppDrawer
					theme={theme}
					anchor="bottom"
					display="flex"
					open={open}
					drawerWidth={drawerWidth} // use the reduced drawer width
					handleDrawerClose={handleDrawerClose}
					sectionHeaders={sectionHeaders.map((header) => ({
						...header,
						open: false,
						handleClick: () => {
							setOpen(!open);
						}, // Add a placeholder handleClick function
					}))}
					handleSectionHeaderClick={(sectionHeaderText: string) => {
						console.log(sectionHeaderText);
					}} // Add the missing handleSectionHeaderClick property
				></AppDrawer>
			</Box>
		</Box>
	);
}
