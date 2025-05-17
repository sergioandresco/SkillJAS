import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { useFavoriteVideos } from "../../hooks/useFavoriteVideos";
import {
    Box,
    Typography,
    Grid,
    Card,
    CardContent,
    CardMedia,
    Button,
    Chip,
    Stack,
} from "@mui/material";
import Loader from "../../components/loader";

const getYouTubeId = (url) => {
    const match = url.match(/(?:https?:\/\/)?(?:www\.)?youtu(?:be\.com\/watch\?v=|\.be\/)([\w\-]+)/);
    return match ? match[1] : null;
};

function FavoriteVideos() {
    const { category } = useParams();
    const { state } = useLocation();
    const { logo, title } = state || {};
    const { getToken } = useAuth();
    const [token, setToken] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        getToken().then(setToken);
    }, [getToken]);

    const { data, isLoading, error } = useFavoriteVideos(token);

    if (isLoading || !token) return <Loader />;
    if (error) return <Typography>Error loading videos</Typography>;

    const handlePageChange = (event, value) => {
        setPage(value);
    };

    return (
        <Box sx={{ p: {xs: 0, md: 4} }}>
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
                    Tus videos favoritos
                </Typography>
            </Box>
            <Grid container spacing={4}>
                {data
                    .filter((video) => video.isActive)
                    .map((video) => {
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
                                <CardContent 
                                    sx={{ 
                                        display: 'flex', 
                                        flexDirection: 'column', 
                                        flexGrow: 1,
                                        color: 'white' 
                                    }}
                                >
                                    <Typography variant="h6" gutterBottom sx={{ color: 'white', minHeight: '66px' }}>
                                        {video.title}
                                    </Typography>
                                    <Typography variant="body2" mb={2} sx={{ color: 'white', textAlign: 'justify' }}>
                                        {video.description}
                                    </Typography>
                                    
                                    {video.categories?.length > 0 && (
                                        <Stack direction="row" spacing={1} mb={2} flexWrap="wrap">
                                            {video.categories.map((cat, i) => (
                                                <Chip key={i} label={cat} size="small" />
                                            ))}
                                        </Stack>
                                    )}
                                    <Box mt="auto">
                                        <Button
                                            variant="contained"
                                            color="primary"
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
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                    );
                })}
            </Grid>
        </Box>
    );
}

export default FavoriteVideos;