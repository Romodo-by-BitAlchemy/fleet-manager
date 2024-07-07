// components/OperationList.tsx
import React, { useEffect, useState } from "react";
import {
	List,
	ListItem,
	ListItemText,
	Button,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	Box,
	Typography,
	CircularProgress,
} from "@mui/material";
import { Operation } from "../../pages/dev/types";
import { getOperations } from "../../pages/dev/api";

interface OperationListProps {
	operations: Operation[];
	setOperations: React.Dispatch<React.SetStateAction<Operation[]>>;
}

const OperationList: React.FC<OperationListProps> = ({
	operations,
	setOperations,
}) => {
	const [selectedOperation, setSelectedOperation] = useState<Operation | null>(
		null
	);
	const [open, setOpen] = useState(false);

	useEffect(() => {
		const pollOperations = setInterval(() => {
			getOperations().then(setOperations);
		}, 10000); // Poll every 10 seconds

		return () => clearInterval(pollOperations);
	}, [setOperations]);

	const handleOpen = (operation: Operation) => {
		setSelectedOperation(operation);
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
		setSelectedOperation(null);
	};

	return (
		<Box>
			<Typography
				variant="h4"
				gutterBottom
			>
				Operations
			</Typography>
			<List>
				{operations.map((operation) => (
					<ListItem key={operation.name}>
						<ListItemText
							primary={operation.name.split("/").pop()}
							secondary={`Status: ${operation.done ? "Completed" : "In Progress"}`}
						/>
						<Button onClick={() => handleOpen(operation)}>Details</Button>
						{!operation.done && <CircularProgress size={24} />}
					</ListItem>
				))}
			</List>

			<Dialog
				open={open}
				onClose={handleClose}
				maxWidth="md"
				fullWidth
			>
				<DialogTitle>Operation Details</DialogTitle>
				<DialogContent>
					{selectedOperation && (
						<Box>
							<Typography variant="h6">
								Name: {selectedOperation.name}
							</Typography>
							<Typography>
								Status: {selectedOperation.done ? "Completed" : "In Progress"}
							</Typography>
							{selectedOperation.error && (
								<Typography color="error">
									Error: {JSON.stringify(selectedOperation.error)}
								</Typography>
							)}
							{selectedOperation.response && (
								<Typography>
									Response: {JSON.stringify(selectedOperation.response)}
								</Typography>
							)}
							<Typography>
								Metadata: {JSON.stringify(selectedOperation.metadata)}
							</Typography>
						</Box>
					)}
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Close</Button>
				</DialogActions>
			</Dialog>
		</Box>
	);
};

export default OperationList;
