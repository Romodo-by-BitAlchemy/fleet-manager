import * as React from "react";
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
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
import { createBrowserHistory } from "history";

// Define the width of the drawer
const drawerWidth = 240;

// Create a browser history object
const history = createBrowserHistory();

// CSS mixins for the opened and closed states of the drawer
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

// Styled component for the header of the drawer
const DrawerHeader = styled("div")(({ theme }: { theme: Theme }) => ({
	display: "flex",
	alignItems: "center",
	justifyContent: "flex-end",
	padding: theme.spacing(0, 1),
	...theme.mixins.toolbar,
}));

// Custom AppBar component that extends MuiAppBar
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

// Custom Drawer component that extends MuiDrawer
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

// Props for the MiniDrawer component
type MiniDrawerProps = {
	children?: React.ReactNode;
};

// Main component
export default function MiniDrawer({ children }: MiniDrawerProps) {
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
											}}
										/>
									</Tooltip>
								)
							)}
						</List>
					</Drawer>
				</Grid>
				<Grid item>{children}</Grid>
			</Grid>
		</Stack>
	);
}
