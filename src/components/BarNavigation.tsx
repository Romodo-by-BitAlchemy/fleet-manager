// BarNavigation.tsx
import * as React from "react";
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import PeopleIcon from "@mui/icons-material/People";
import DriveEtaIcon from "@mui/icons-material/DriveEta";
import TimeToLeaveIcon from "@mui/icons-material/TimeToLeave";
import ArticleIcon from "@mui/icons-material/Article";
import SettingsIcon from "@mui/icons-material/Settings";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Badge from "@mui/material/Badge";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import Popover from "@mui/material/Popover";
import List from "@mui/material/List";
import { ListItemButton, ListItemText, Stack } from "@mui/material";
import type { SectionHeaderProps } from "./SectionHeader";
import SectionHeader from "./SectionHeader";
import { createBrowserHistory } from "history";
// import { AppBarStyled } from "./AppBar";

const drawerWidth = 240;
const history = createBrowserHistory();
const openedMixin = (theme: Theme): CSSObject => ({
	width: drawerWidth,
	transition: theme.transitions.create("width", {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.enteringScreen,
	}),
	overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
	transition: theme.transitions.create("width", {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	overflowX: "hidden",
	width: `calc(${theme.spacing(7)} + 1px)`,
	[theme.breakpoints.up("sm")]: {
		width: `calc(${theme.spacing(8)} + 1px)`,
	},
});

const DrawerHeader = styled("div")(({ theme }: { theme: Theme }) => ({
	display: "flex",
	alignItems: "center",
	justifyContent: "flex-end",
	padding: theme.spacing(0, 1),
	...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
	open?: boolean;
}

const AppBar = styled(MuiAppBar, {
	shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
	zIndex: theme.zIndex.drawer + 1,
	transition: theme.transitions.create(["width", "margin"], {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	...(open && {
		marginLeft: drawerWidth,
		width: `calc(100% - ${drawerWidth}px)`,
		transition: theme.transitions.create(["width", "margin"], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	}),
}));

const Drawer = styled(MuiDrawer, {
	shouldForwardProp: (prop: string) => prop !== "open",
})(({ theme, open }: { theme: Theme; open: boolean }) => ({
	width: drawerWidth,
	flexShrink: 0,
	whiteSpace: "nowrap",
	boxSizing: "border-box",
	...(open && {
		...openedMixin(theme),
		"& .MuiDrawer-paper": openedMixin(theme),
	}),
	...(!open && {
		...closedMixin(theme),
		"& .MuiDrawer-paper": closedMixin(theme),
	}),
}));

export default function MiniDrawer() {
	const theme = useTheme();
	const [open, setOpen] = React.useState(false);

	const handleDrawerOpen = () => {
		setOpen(true);
	};

	const handleDrawerClose = () => {
		setOpen(false);
		sectionHeaders[4].open = false;
	};

	const handleSectionHeaderClick = (sectionHeaderText: string) => {
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

	const [sectionHeaders, setSectionHeaders] = React.useState<
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

	const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

	const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const [notificationAnchorEl, setNotificationAnchorEl] =
		React.useState<HTMLElement | null>(null);

	const handleNotificationClick = (event: React.MouseEvent<HTMLElement>) => {
		setNotificationAnchorEl(event.currentTarget);
	};

	const handleNotificationClose = () => {
		setNotificationAnchorEl(null);
	};

	const openNotification = Boolean(notificationAnchorEl);

	const handleAppBarHeadingClick = () => {
		history.push(`/`);
	};

	let notificationCount = () => {
		return 1 + 1;
	};

	return (
		<Stack>
			<AppBar
				position="fixed"
				open={open}
			>
				<Toolbar>
					<IconButton
						color="inherit"
						aria-label="open drawer"
						onClick={handleDrawerOpen}
						edge="start"
						sx={{
							marginRight: 5,
							...(open && { display: "none" }),
						}}
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
							anchorOrigin={{
								vertical: "bottom",
								horizontal: "left",
							}}
							transformOrigin={{
								vertical: "top",
								horizontal: "left",
							}}
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
							anchorOrigin={{
								vertical: "top",
								horizontal: "right",
							}}
							keepMounted
							transformOrigin={{
								vertical: "top",
								horizontal: "right",
							}}
							open={Boolean(anchorEl)}
							onClose={handleClose}
						>
							<MenuItem onClick={handleClose}>Manage Profile</MenuItem>
							<MenuItem onClick={handleClose}>Logout</MenuItem>
						</Menu>
					</div>
				</Toolbar>
			</AppBar>
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
					{sectionHeaders.map(({ text, icon, nestedItems, open }, index) => (
						<SectionHeader
							key={index}
							text={text}
							icon={icon}
							nestedItems={nestedItems || []}
							open={open}
							handleClick={() => handleSectionHeaderClick(text)}
						/>
					))}
				</List>
			</Drawer>
			{/* <Box
				component="main"
				sx={{ flexGrow: 1, p: 3 }}
			>
				{
					<Router>
						<Routes>
							<Route
								path="/dashboard"
								element={<DashboardPage />}
							/>
						</Routes>
					</Router>
				}
			</Box> */}
		</Stack>
	);
}
