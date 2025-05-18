import {
    Box,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
	Modal,
    TextField,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
	FormControl,
	InputLabel,
	Select,
	MenuItem,
} from "@mui/material";
import { useState, useEffect } from "react";
import { motion } from 'framer-motion';
import { useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@clerk/clerk-react";
import { toast } from "sonner";
import { useDocumentations } from "../../hooks/useDocumentations";
import { useUpdateDocumentation } from "../../hooks/useUpdateDocumentation";
import Loader from "../loader";
  
function AdminDocumentations() {

	const { getToken } = useAuth();
    const [token, setToken] = useState(null);
	const queryClient = useQueryClient();

	const [openModal, setOpenModal] = useState(false);
	const [selectedDoc, setSelectedDoc] = useState(null);
	const [formData, setFormData] = useState({
		title: "",
		description: "",
		url: "",
		isActive: true,
	});

	useEffect(() => {
        getToken().then(setToken);
    }, [getToken]);

    const { data, isLoading, error } = useDocumentations(token);
	const { mutate: updateDoc } = useUpdateDocumentation();
  
    if (isLoading || !token) return <Loader />;
    if (error) return <Typography>Error loading documentatios</Typography>;

	const handleOpenModal = (doc) => {
		setSelectedDoc(doc);
		setFormData(doc);
		setOpenModal(true);
	};
	  
	const handleCloseModal = () => {
		setOpenModal(false);
		setSelectedDoc(null);
	};
	  
	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: name === "isActive" ? value === "true" : value,
		}));
	};
	  
	const handleSubmit = () => {
		if (!selectedDoc || !token) return;
	  
		updateDoc(
			{ id: selectedDoc.id, updatedData: formData },
			{
				onSuccess: () => {
					queryClient.invalidateQueries({ queryKey: ['documentations'] });
					handleCloseModal();
					toast.success("Documentación actualizada correctamente");
				},
				onError: (error) => {
					handleCloseModal();
					toast.error("Error al actualizar la documentación, intenta nuevamente");
				},
			}
		);
	};
  
    return (
		<Box p={3}>
			<Typography 
				variant="h2" 
				gutterBottom
				fontWeight="bold" 
				sx={{ 
					fontSize: { 
						xs: "2rem", 
						md: "3rem" 
					}, 
					color: "white",
					textAlign: 'center',
				}}
			>
				Admin Panel - Documentaciones
			</Typography>
	
			<TableContainer component={Paper}>
				<Table>
					<TableHead>
					<TableRow>
						<TableCell><strong>Título</strong></TableCell>
						<TableCell><strong>Descripción</strong></TableCell>
						<TableCell><strong>Url</strong></TableCell>
						<TableCell><strong>Estado</strong></TableCell>
						<TableCell><strong>Actualizar</strong></TableCell>
					</TableRow>
					</TableHead>
					<TableBody>
					{data.map((documentation) => (
						<TableRow key={documentation.id}>
						<TableCell>{documentation.title}</TableCell>
						<TableCell>{documentation.description}</TableCell>
						<TableCell>{documentation.url}</TableCell>
						<TableCell>
							{documentation.isActive ? "Habilitado" : "Deshabilitado"}
						</TableCell>
						<TableCell >
							<Button
								variant="outlined"
								color="warning"
								onClick={() => handleOpenModal(documentation)}
							>
								Modificar
							</Button>
						</TableCell>
						</TableRow>
					))}
					</TableBody>
				</Table>
			</TableContainer>

			<Dialog 
				open={openModal} 
				onClose={handleCloseModal} 
				sx={{ 
					'& .MuiDialog-paper': {
						minWidth: {xs: '300px', md: '560px'} 
					}
				}} 
			>
				<DialogTitle>Actualizar Documentación</DialogTitle>
				<DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, paddingTop: '17px !important' }}>
					<TextField
						label="Título"
						name="title"
						value={formData.title}
						onChange={handleInputChange}
						fullWidth
					/>
					<TextField
						label="Descripción"
						name="description"
						value={formData.description}
						onChange={handleInputChange}
						fullWidth
						multiline
  						minRows={5}
					/>
					<TextField
						label="URL"
						name="url"
						value={formData.url}
						onChange={handleInputChange}
						fullWidth
					/>
					<FormControl fullWidth>
						<InputLabel>Estado</InputLabel>
						<Select
							name="isActive"
							value={formData.isActive ? "true" : "false"}
							onChange={handleInputChange}
						>
							<MenuItem value="true">Habilitado</MenuItem>
							<MenuItem value="false">Deshabilitado</MenuItem>
						</Select>
					</FormControl>
				</DialogContent>
				<DialogActions
					sx={{
						justifyContent: 'center',
						paddingBottom: '24px'
					}}
				>
					<Button 
						onClick={handleCloseModal}
						sx={{
							color: '#7c3aed'
						}}
					>
						Cancelar
					</Button>
					<Button 
						variant="contained" 
						color="primary" 
						onClick={handleSubmit}
						sx={{
							backgroundColor: "#7c3aed",
							color: "#ffffff",
							fontWeight: 600,
							"&:hover": {
								backgroundColor: "#a78bfa",
								color: "#ffffff",
							},
							"&.Mui-disabled": {
								backgroundColor: "#a78bfa",
								color: "#ffffff",
								opacity: 0.7,
							},
							borderRadius: "999px",
							textTransform: "none",
							px: 3,
							py: 1.2,
						}}
					>
						Actualizar
					</Button>
				</DialogActions>
			</Dialog>
		</Box>
    );
}
  
export default AdminDocumentations;