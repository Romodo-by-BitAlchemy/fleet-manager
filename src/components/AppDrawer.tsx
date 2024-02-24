// DrawerComponent.tsx
import * as React from "react";
import { styled, Theme } from "@mui/material/styles";
import { DrawerProps } from "@mui/material/Drawer";
import MuiDrawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import SectionHeader from "./SectionHeader";
import { SectionHeaderProps } from "./SectionHeader";

interface StyledDrawerProps extends DrawerProps {
	theme: Theme;
	open: boolean;
	display: "flex";
	drawerWidth: number;
	handleDrawerClose: () => void;
	sectionHeaders: SectionHeaderProps[];
	handleSectionHeaderClick: (sectionHeaderText: string) => void;
}

const openedMixin = (theme: Theme, drawerWidth: number) => ({
	width: drawerWidth,
	transition: theme.transitions.create("width", {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.enteringScreen,
	}),
	overflowX: "hidden",
});

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

const DrawerStyled = styled(MuiDrawer, {
	shouldForwardProp: (prop) => prop !== "open",
})<{ theme: Theme; open: boolean; drawerWidth: number }>(
	({ theme, open, drawerWidth }) => ({
		width: drawerWidth,
		flexShrink: 0,
		whiteSpace: "nowrap",
		boxSizing: "border-box",
		variants: {
			// Add the missing variants property
			open: {
				...openedMixin(theme, drawerWidth),
				"& .MuiDrawer-paper": openedMixin(theme, drawerWidth),
			},
			closed: {
				...closedMixin(theme),
				"& .MuiDrawer-paper": closedMixin(theme),
			},
		},
		...(open ? { open: true } : { closed: true }), // Use the variants to apply the correct styles
	})
);

export const AppDrawer: React.FC<StyledDrawerProps> = ({
	theme,
	open,
	handleDrawerClose,
	sectionHeaders,
	handleSectionHeaderClick,
}) => {
	const drawerWidth = screen.width * 0.2;

	return (
		<DrawerStyled
			theme={theme}
			open={open}
			drawerWidth={drawerWidth}
			variant="permanent"
		>
			<div>
				<IconButton onClick={handleDrawerClose}>
					{theme.direction === "rtl" ? (
						<ChevronRightIcon />
					) : (
						<ChevronLeftIcon />
					)}
				</IconButton>
			</div>
			<Divider />
			<List>
				{sectionHeaders.map((sectionHeader, index) => (
					<SectionHeader
						key={index}
						{...sectionHeader}
						handleClick={() => handleSectionHeaderClick(sectionHeader.text)}
					/>
				))}
			</List>
		</DrawerStyled>
	);
};
