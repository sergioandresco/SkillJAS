import {
    Box,
    Card,
    CardContent,
    Typography,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
	Pagination,
} from "@mui/material";
import { useState, useEffect } from "react";
import { motion } from 'framer-motion';
import { useAuth } from "@clerk/clerk-react";
import { useAdminVideos } from "../../hooks/useAdminVideos";
import { useCategories } from "../../hooks/useCategories";
import VideoTable from "./videoTable";
import Loader from "../loader";
  
function AdminVideos() {
    const [selectedCategory, setSelectedCategory] = useState("All");
    const { getToken } = useAuth();
    const [token, setToken] = useState(null);
	const [page, setPage] = useState(1);
	const { videos, isLoading, isFetching, enableVideo, disableVideo, totalPages } = useAdminVideos(page);

	useEffect(() => {
        getToken().then(setToken);
    }, [getToken]);

	const { data: categoriesMap, isLoading: isCategoriesLoading } = useCategories(token || undefined);
  
    if (isCategoriesLoading) {
		return (
		  <Box display="flex" justifyContent="center" mt={4}>
			<Loader />
		  </Box>
		);
	  }
  
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
							{categoriesMap && Object.entries(categoriesMap).map(([key]) => (
								<MenuItem key={key} value={key}>
									{key}
								</MenuItem>
							))}
						</Select>
					</FormControl>
				</CardContent>
			</Card>
	
			<VideoTable
				videos={filteredVideos}
				isFetching={isFetching}
				enableVideo={enableVideo}
				disableVideo={disableVideo}
				page={page}
				setPage={setPage}
				totalPages={totalPages}
			/>

		</Box>
    );
}
  
export default AdminVideos;