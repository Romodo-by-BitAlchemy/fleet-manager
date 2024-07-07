// components/OptimizerList.tsx
import React, { useState } from "react";
import {
	List,
	ListItem,
	ListItemText,
	Button,
	TextField,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	Box,
	Typography,
} from "@mui/material";
import { Optimizer, ModelSpec, OptimizeToursSpec } from "../../pages/dev/types";
import {
	createOptimizer,
	updateOptimizer,
	deleteOptimizer,
	runOptimizer,
} from "../../pages/dev/api";

interface OptimizerListProps {
	optimizers: Optimizer[];
	setOptimizers: React.Dispatch<React.SetStateAction<Optimizer[]>>;
}

const OptimizerList: React.FC<OptimizerListProps> = ({
	optimizers,
	setOptimizers,
}) => {
	const [open, setOpen] = useState(false);
	const [currentOptimizer, setCurrentOptimizer] =
		useState<Partial<Optimizer> | null>(null);

	const handleOpen = (optimizer: Optimizer | null = null) => {
		setCurrentOptimizer(
			optimizer || {
				displayName: "",
				modelSpec: {
					globalStartTime: new Date().toISOString(),
					globalEndTime: new Date(
						Date.now() + 24 * 60 * 60 * 1000
					).toISOString(),
				},
				optimizeToursSpec: {
					timeout: "3600s",
				},
			}
		);
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
		setCurrentOptimizer(null);
	};

	const handleSave = async () => {
		if (currentOptimizer) {
			let updatedOptimizer: Optimizer;
			if ("name" in currentOptimizer && currentOptimizer.name) {
				updatedOptimizer = await updateOptimizer(
					currentOptimizer.name,
					currentOptimizer
				);
				setOptimizers(
					optimizers.map((o) =>
						o.name === updatedOptimizer.name ? updatedOptimizer : o
					)
				);
			} else {
				updatedOptimizer = await createOptimizer(
					currentOptimizer as Omit<Optimizer, "name">
				);
				setOptimizers([...optimizers, updatedOptimizer]);
			}
		}
		handleClose();
	};

	const handleDelete = async (optimizer: Optimizer) => {
		if (
			window.confirm(
				`Are you sure you want to delete ${optimizer.displayName}?`
			)
		) {
			await deleteOptimizer(optimizer.name);
			setOptimizers(optimizers.filter((o) => o.name !== optimizer.name));
		}
	};

	const handleRun = async (optimizer: Optimizer) => {
		try {
			const operation = await runOptimizer(optimizer.name);
			console.log("Optimization started:", operation);
			// You might want to update your UI to show that an optimization is in progress
		} catch (error) {
			console.error("Error running optimizer:", error);
			// Handle the error in your UI
		}
	};

	const handleModelSpecChange = (field: keyof ModelSpec, value: any) => {
		setCurrentOptimizer((prev) => {
			if (!prev) return prev;
			return {
				...prev,
				modelSpec: {
					...prev.modelSpec,
					[field]: value,
				} as ModelSpec, // Add type assertion here
			};
		});
	};

	const handleOptimizeToursSpecChange = (
		field: keyof OptimizeToursSpec,
		value: any
	) => {
		setCurrentOptimizer((prev) => {
			if (!prev) return prev;
			return {
				...prev,
				optimizeToursSpec: {
					...prev.optimizeToursSpec,
					[field]: value,
				} as OptimizeToursSpec, // Add type assertion here
			};
		});
	};

	return (
		<Box>
			<Typography
				variant="h4"
				gutterBottom
			>
				Optimizers
			</Typography>
			<List>
				{optimizers.map((optimizer) => (
					<ListItem key={optimizer.name}>
						<ListItemText primary={optimizer.displayName} />
						<Button onClick={() => handleOpen(optimizer)}>Edit</Button>
						<Button onClick={() => handleDelete(optimizer)}>Delete</Button>
						<Button onClick={() => handleRun(optimizer)}>Run</Button>
					</ListItem>
				))}
			</List>
			<Button
				variant="contained"
				color="primary"
				onClick={() => handleOpen()}
			>
				Add Optimizer
			</Button>

			<Dialog
				open={open}
				onClose={handleClose}
				maxWidth="md"
				fullWidth
			>
				<DialogTitle>
					{currentOptimizer && "name" in currentOptimizer
						? "Edit Optimizer"
						: "Add Optimizer"}
				</DialogTitle>
				<DialogContent>
					<TextField
						autoFocus
						margin="dense"
						label="Display Name"
						fullWidth
						value={currentOptimizer?.displayName || ""}
						onChange={(e) =>
							setCurrentOptimizer((prev) =>
								prev ? { ...prev, displayName: e.target.value } : null
							)
						}
					/>
					<Typography variant="h6">Model Spec</Typography>
					<TextField
						margin="dense"
						label="Global Start Time"
						type="datetime-local"
						fullWidth
						value={
							currentOptimizer?.modelSpec?.globalStartTime?.split(".")[0] || ""
						}
						onChange={(e) =>
							handleModelSpecChange("globalStartTime", e.target.value)
						}
						InputLabelProps={{
							shrink: true,
						}}
					/>
					<TextField
						margin="dense"
						label="Global End Time"
						type="datetime-local"
						fullWidth
						value={
							currentOptimizer?.modelSpec?.globalEndTime?.split(".")[0] || ""
						}
						onChange={(e) =>
							handleModelSpecChange("globalEndTime", e.target.value)
						}
						InputLabelProps={{
							shrink: true,
						}}
					/>
					<Typography variant="h6">Optimize Tours Spec</Typography>
					<TextField
						margin="dense"
						label="Timeout (seconds)"
						type="number"
						fullWidth
						value={parseInt(
							currentOptimizer?.optimizeToursSpec?.timeout || "0"
						)}
						onChange={(e) =>
							handleOptimizeToursSpecChange("timeout", `${e.target.value}s`)
						}
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Cancel</Button>
					<Button onClick={handleSave}>Save</Button>
				</DialogActions>
			</Dialog>
		</Box>
	);
};

export default OptimizerList;
