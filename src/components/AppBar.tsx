import * as React from "react";
import { styled } from "@mui/material/styles";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Badge from "@mui/material/Badge";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import Popover from "@mui/material/Popover";
import List from "@mui/material/List";
import { ListItemButton, ListItemText, Theme } from "@mui/material";

/**
 * Props for the AppBar component
 */
interface AppBarProps extends MuiAppBarProps {
	open: boolean;
	drawerWidth: number;
	handleDrawerOpen: () => void;
	handleDrawerClose: () => void;
	notificationCount: number;
	notificationAnchorEl: HTMLElement | null;
	anchorEl: HTMLElement | null;
	handleNotificationClick: (event: React.MouseEvent<HTMLElement>) => void;
	handleMenu: (event: React.MouseEvent<HTMLElement>) => void;
	handleClose: () => void;
	handleNotificationClose: () => void;
}

/**
 * Mixin for the opened state of the AppBar
 */
const openedMixin = (theme: Theme, drawerWidth: number) => ({
	width: drawerWidth,
	transition: theme.transitions.create("width", {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.enteringScreen,
	}),
	overflowX: "hidden",
});

/**
 * Mixin for the closed state of the AppBar
 */
const closedMixin = (theme: Theme) => ({
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

/**
 * Styled AppBar component
 */
const StyledAppBar = styled(MuiAppBar, {
	shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open, drawerWidth }) => ({
	zIndex: theme.zIndex.drawer + 1,
	transition: theme.transitions.create(["width", "margin"], {
		easing: theme.transitions.easing.easeInOut,
		duration: theme.transitions.duration.leavingScreen,
	}),
	...(open && {
		marginLeft: drawerWidth,
		width: `calc(100% - ${drawerWidth}px)`,
		transition: theme.transitions.create(["width", "margin"], {
			easing: theme.transitions.easing.easeInOut,
			duration: theme.transitions.duration.enteringScreen,
		}),
	}),
}));

/**
 * Custom AppBar component
 */
export const AppBarStyled: React.FC<AppBarProps> = (props) => {
	const openNotification = Boolean(props.notificationAnchorEl);

	return (
		<StyledAppBar {...props}>
			<Toolbar>
				<IconButton
					color="inherit"
					aria-label="open drawer"
					onClick={props.handleDrawerOpen}
					edge="start"
					sx={{
						marginRight: 5,
						...(props.open && { display: "none" }),
					}}
				>
					<MenuIcon />
				</IconButton>
				<Typography
					variant="h6"
					noWrap
					component="div"
				>
					ROMODO
				</Typography>
				<div style={{ marginLeft: "auto" }}>
					<IconButton
						size="large"
						color="inherit"
						aria-label="notifications"
						onClick={props.handleNotificationClick}
					>
						<Badge
							badgeContent={props.notificationCount}
							color="secondary"
						>
							<NotificationsActiveIcon />
						</Badge>
					</IconButton>
					<Popover
						open={openNotification}
						anchorEl={props.notificationAnchorEl}
						onClose={props.handleNotificationClose}
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
								<ListItemText primary="Hi" />
							</ListItemButton>
							<ListItemButton>
								<ListItemText primary="How u doin" />
							</ListItemButton>
							<ListItemButton>
								<ListItemText primary="Lol noice" />
							</ListItemButton>
						</List>
					</Popover>
					<IconButton
						size="large"
						aria-label="account"
						aria-controls="menu-appbar"
						aria-haspopup="true"
						onClick={props.handleMenu}
						color="inherit"
					>
						<AccountCircleIcon />
					</IconButton>
					<Popover
						id="menu-appbar"
						anchorEl={props.anchorEl}
						anchorOrigin={{
							vertical: "top",
							horizontal: "right",
						}}
						keepMounted
						transformOrigin={{
							vertical: "top",
							horizontal: "right",
						}}
						open={Boolean(props.anchorEl)}
						onClose={props.handleClose}
					>
						<List>
							<ListItemButton onClick={props.handleClose}>
								<ListItemText primary="Manage Profile" />
							</ListItemButton>
							<ListItemButton onClick={props.handleClose}>
								<ListItemText primary="Logout" />
							</ListItemButton>
						</List>
					</Popover>
				</div>
			</Toolbar>
		</StyledAppBar>
	);
};
