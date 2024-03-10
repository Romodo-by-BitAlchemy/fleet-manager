// import * as React from "react";
import {
	Container,
	Typography,
	List,
	ListItem,
	ListItemAvatar,
	Avatar,
	ListItemText,
	ListItemSecondaryAction,
	IconButton,
	AppBar,
	Toolbar,
	Box,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import InfoIcon from "@mui/icons-material/Info";

const passengers = [
	{
		id: 1,
		name: "John Doe",
		info: "Frequent traveler, prefers window seats.",
	},
	{
		id: 2,
		name: "Jane Smith",
		info: "Allergy to peanuts, requires special meal.",
	},
	{
		id: 3,
		name: "Alice Johnson",
		info: "Travels with a pet, needs extra space.",
	},
	// Add more passengers as needed
];

const Passengers = () => {
	return (
		<Box sx={{ flexGrow: 1 }}>
			<Container sx={{ py: 8 }}>
				<Typography
					variant="h4"
					gutterBottom
				>
					Our Valued Passengers
				</Typography>
				<List>
					{passengers.map((passenger) => (
						<ListItem key={passenger.id}>
							<ListItemAvatar>
								<Avatar>
									<PersonIcon />
								</Avatar>
							</ListItemAvatar>
							<ListItemText
								primary={passenger.name}
								secondary={passenger.info}
							/>
							<ListItemSecondaryAction>
								<IconButton
									edge="end"
									aria-label="info"
								>
									<InfoIcon />
								</IconButton>
							</ListItemSecondaryAction>
						</ListItem>
					))}
				</List>
			</Container>
		</Box>
	);
};

export default Passengers;
