// AppDrawer.tsx
import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import List from "@mui/material/List";
import {
	Box,
	CssBaseline,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
} from "@mui/material";
import InboxIcon from "@mui/icons-material/Inbox";
import MailIcon from "@mui/icons-material/Mail";

// Styled component for the drawer header
const DrawerHeader = styled("div")(({ theme }) => ({
	display: "flex",
	alignItems: "center",
	justifyContent: "flex-end",
	padding: theme.spacing(0, 1),
	// necessary for content to be below app bar
	...theme.mixins.toolbar,
}));

interface AppDrawerProps {
	open: boolean;
}

// Main component
export const AppDrawer: React.FC<AppDrawerProps> = () => {
	// Use theme for styling
	const theme = useTheme();
	// State for drawer open/close
	const [open, setOpen] = React.useState(false);

	// Handler for closing the drawer
	const handleDrawerClose = () => {
		setOpen(false);
	};

	// Handler for opening the drawer
	const handleDrawerOpen = () => {
		setOpen(true);
	};

	// Component return
	return (
		<Box sx={{ display: "flex" }}>
			<CssBaseline />
			<Drawer open={open}>
				<DrawerHeader>
					<IconButton onClick={handleDrawerClose}>
						{theme.direction === "rtl" ? (
							<ChevronRightIcon />
						) : (
							<ChevronLeftIcon />
						)}
					</IconButton>
				</DrawerHeader>
				<List>
					{/* Map over list items */}
					{["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
						<ListItem
							key={text}
							disablePadding
							sx={{ display: "block" }}
						>
							<ListItemButton
								sx={{
									minHeight: 48,
									justifyContent: open ? "initial" : "center",
									px: 2.5,
								}}
							>
								<ListItemIcon
									sx={{
										minWidth: 0,
										mr: open ? 3 : "auto",
										justifyContent: "center",
									}}
								>
									{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
								</ListItemIcon>
								<ListItemText
									primary={text}
									sx={{ opacity: open ? 1 : 0 }}
								/>
							</ListItemButton>
						</ListItem>
					))}
					{/* Map over list items */}
					{["All mail", "Trash", "Spam"].map((text, index) => (
						<ListItem
							key={text}
							disablePadding
							sx={{ display: "block" }}
						>
							<ListItemButton
								sx={{
									minHeight: 48,
									justifyContent: open ? "initial" : "center",
									px: 2.5,
								}}
							>
								<ListItemIcon
									sx={{
										minWidth: 0,
										mr: open ? 3 : "auto",
										justifyContent: "center",
									}}
								>
									{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
								</ListItemIcon>
								<ListItemText
									primary={text}
									sx={{ opacity: open ? 1 : 0 }}
								/>
							</ListItemButton>
						</ListItem>
					))}
				</List>
			</Drawer>
		</Box>
	);
};
export default AppDrawer;
