import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { useCategoryVideos } from "../../hooks/useCategoryVideos";
import {
    Box,
    Typography,
    CircularProgress,
    Grid,
    Card,
    CardContent,
    CardMedia,
    Button,
    Chip,
    Stack,
} from "@mui/material";
import Pagination from '@mui/material/Pagination';

const getYouTubeId = (url) => {
    const match = url.match(/(?:https?:\/\/)?(?:www\.)?youtu(?:be\.com\/watch\?v=|\.be\/)([\w\-]+)/);
    return match ? match[1] : null;
};

function CourseByCategory() {
    const { category } = useParams();
    const { state } = useLocation();
    const { logo, title } = state || {};
    const { getToken } = useAuth();
    const [token, setToken] = useState(null);
    const [page, setPage] = useState(1);

    const navigate = useNavigate();

    useEffect(() => {
        getToken().then(setToken);
    }, [getToken]);

    const { data, isLoading, error } = useCategoryVideos(category, token, page);

    if (isLoading || !token) return <CircularProgress />;
    if (error) return <Typography>Error loading videos</Typography>;

    const handlePageChange = (event, value) => {
        setPage(value);
    };

    return (
        <Box sx={{ p: 4 }}>
            <Box 
                sx={{ 
                    display:"flex", 
                    alignItems:"center", 
                    gap:2, 
                    mb:4,
                    justifyContent:"center",
                }}
            >
                {logo && (
                    <Box
                        component="img"
                        src={logo}
                        alt={title}
                        sx={{ width:48, height:48 }}
                    />
                )}
                <Typography 
                    variant="h2"
                    fontWeight="bold" 
                    sx={{ 
                        fontSize: { 
                            xs: "2rem", 
                            md: "3rem" 
                        }, 
                        color: "white",
                        textAlign: 'center', 
                        textTransform:"capitalize"
                    }}
                >
                    Videos de {title || category}
                </Typography>
            </Box>
            <Grid container spacing={4}>
                {data.items.map((video) => {
                    const videoId = getYouTubeId(video.courseUrl);
                    const thumbnail = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
                    return (
                        <Grid item xs={12} sm={6} md={4} key={video.id}>
                            <Card 
                                sx={{ 
                                    height: "100%", 
                                    display: "flex", 
                                    flexDirection: "column", 
                                    maxWidth: '340px',
                                    minWidth: '340px',
                                    background: 'rgba(255, 255, 255, 0.05)',
                                    backdropFilter: 'blur(10px)',
                                    border: '1px solid rgba(255, 255, 255, 0.15)'
                                }}
                            >
                                <CardMedia
                                    component="img"
                                    height="200"
                                    image={thumbnail}
                                    alt={video.title}
                                    sx={{ objectFit: "cover" }}
                                />
                                <CardContent sx={{ flexGrow: 1 }}>
                                    <Typography variant="h6" gutterBottom sx={{ color: 'white' }}>
                                        {video.title}
                                    </Typography>
                                    <Box sx={{ height: {xs: 'auto', md:'4.5em'} }}>
                                        <Typography variant="body2" mb={2} sx={{ color: 'white' }}>
                                            {video.description}
                                        </Typography>
                                    </Box>
                                    {video.categories?.length > 0 && (
                                        <Stack direction="row" spacing={1} mb={2} flexWrap="wrap">
                                            {video.categories.map((cat, i) => (
                                                <Chip key={i} label={cat} size="small" />
                                            ))}
                                        </Stack>
                                    )}
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        fullWidth
                                        onClick={() => navigate(`/dashboard/course/video/${video.id}`)}
                                        sx={{
                                            background: '#7c3aed',
                                            "&:hover": {
                                                backgroundColor: "#a78bfa",
                                                color: "#ffffff",
                                            },
                                        }}
                                    >
                                        Ver video
                                    </Button>
                                </CardContent>
                            </Card>
                        </Grid>
                    );
                })}
            </Grid>
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                <Pagination
                    count={data.totalPages}
                    page={page}
                    onChange={handlePageChange}
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
        </Box>
    );
}

export default CourseByCategory;