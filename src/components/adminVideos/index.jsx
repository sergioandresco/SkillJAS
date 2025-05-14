import {
    Box,
    Card,
    CardContent,
    Typography,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    CircularProgress,
} from "@mui/material";
import { useState } from "react";
import { motion } from 'framer-motion';
import { useAdminVideos } from "../../hooks/useAdminVideos";
  
function AdminVideos() {
    const { videos, isLoading, enableVideo, disableVideo } = useAdminVideos();
    const [selectedCategory, setSelectedCategory] = useState("All");
  
    if (isLoading) {
      return (
        <Box display="flex" justifyContent="center" mt={4}>
          <CircularProgress />
        </Box>
      );
    }
  
    const categories = [...new Set(videos.flatMap((v) => v.category))];
  
    const filteredVideos =
      selectedCategory === "All"
        ? videos
        : videos.filter((v) => v.category.includes(selectedCategory));
  
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
				Admin Panel - Videos
			</Typography>
	
			<Card sx={{ mb: 3 }}>
			<CardContent>
				<FormControl fullWidth>
				<InputLabel>Categoría</InputLabel>
				<Select
					value={selectedCategory}
					label="Categoría"
					onChange={(e) => setSelectedCategory(e.target.value)}
				>
					<MenuItem value="All">Todas</MenuItem>
					{categories.map((cat) => (
					<MenuItem key={cat} value={cat}>
						{cat}
					</MenuItem>
					))}
				</Select>
				</FormControl>
			</CardContent>
			</Card>
	
			<TableContainer component={Paper}>
			<Table>
				<TableHead>
				<TableRow>
					<TableCell><strong>Título</strong></TableCell>
					<TableCell><strong>Categoría</strong></TableCell>
					<TableCell><strong>Estado</strong></TableCell>
					<TableCell align="right"><strong>Acciones</strong></TableCell>
				</TableRow>
				</TableHead>
				<TableBody>
				{filteredVideos.map((video) => (
					<TableRow key={video.id}>
					<TableCell>{video.title}</TableCell>
					<TableCell>{video.category.join(", ")}</TableCell>
					<TableCell>
						{video.isActive ? "Habilitado" : "Deshabilitado"}
					</TableCell>
					<TableCell align="right">
						{video.isActive ? (
						<Button
							variant="outlined"
							color="error"
							onClick={() => disableVideo(video.id)}
						>
							Deshabilitar
						</Button>
						) : (
						<Button
							variant="contained"
							color="success"
							onClick={() => enableVideo(video.id)}
						>
							Habilitar
						</Button>
						)}
					</TableCell>
					</TableRow>
				))}
				</TableBody>
			</Table>
			</TableContainer>
		</Box>
    );
}
  
export default AdminVideos;