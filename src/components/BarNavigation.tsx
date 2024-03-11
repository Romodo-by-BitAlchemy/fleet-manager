import * as React from "react";
import { styled, Theme, CSSObject } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import { createBrowserHistory } from "history";
import MiniDrawer from "./MiniDrawer";
import Drivers from "../pages/Drivers";
import Passengers from "../pages/Passengers";
import Settings from "../pages/Settings";
import Reports from "../pages/Reports";
import Trips from "../pages/Trips";

// Define the width of the drawer
const drawerWidth = 240;

// Create a browser history object
export const history = createBrowserHistory();

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
export const DrawerHeader = styled("div")(({ theme }: { theme: Theme }) => ({
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

export const AppBar = styled(MuiAppBar, {
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
export const Drawer = styled(MuiDrawer, {
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

const BarNavigation: React.FC = () => {
	return (
		<MiniDrawer>
			{/* <Login /> */}
			{/* <Drivers /> */}
			{/* <Passengers /> */}
			{/* <Settings /> */}
			{/* <Reports /> */}
			{/* <Trips /> */}
		</MiniDrawer>
	);
};

export default BarNavigation;
