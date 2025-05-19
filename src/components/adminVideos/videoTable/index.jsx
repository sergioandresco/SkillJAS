import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    Box,
    Pagination,
    CircularProgress
} from "@mui/material";
import { useState } from "react";

function VideoTable({ videos, isFetching, enableVideo, disableVideo, page, setPage, totalPages }) {

	return (
		<>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Título</TableCell>
                            <TableCell>Categoría</TableCell>
                            <TableCell>Estado</TableCell>
                            <TableCell>Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {isFetching ? (
                            <TableRow>
                                <TableCell colSpan={4} align="center">
                                    <CircularProgress />
                                </TableCell>
                            </TableRow>
                        ) : (
                            videos.map((video) => (
                                <TableRow key={video.id}>
                                    <TableCell>{video.title}</TableCell>
                                    <TableCell>{Array.isArray(video.category) ? video.category.join(", ") : video.category}</TableCell>
                                    <TableCell>{video.isActive ? "Activo" : "Inactivo"}</TableCell>
                                    <TableCell>
                                        {video.isActive ? (
                                            <Button
                                                variant="contained"
                                                color="error"
                                                onClick={() => disableVideo(video.id)}
                                            >
                                                Desactivar
                                            </Button>
                                        ) : (
                                            <Button
                                                variant="contained"
                                                color="success"
                                                onClick={() => enableVideo(video.id)}
                                            >
                                                Activar
                                            </Button>
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            <Box display="flex" justifyContent="center" mt={4} mb={4}>
                <Pagination
                    count={totalPages}
                    page={page}
                    onChange={(e, value) => {
                        e.preventDefault();
                        setPage(value);
                    }}
                    sx={{
                        '& .MuiPaginationItem-root': {
                            backgroundColor: '#7c3aed',
                            color: 'white',
                            border: '1px solid #7c3aed',
                            '&:hover': {
                                backgroundColor: '#6d28d9',
                            },
                        },
                        '& .MuiPaginationItem-root.Mui-selected': {
                            backgroundColor: '#a78bfa',
                            color: 'white',
                            '&:hover': {
                                backgroundColor: '#7c3aed',
                            },
                        },
                    }}
                />
            </Box>
        </>
	);
}

export default VideoTable;