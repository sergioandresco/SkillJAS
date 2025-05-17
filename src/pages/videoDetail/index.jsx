import { useParams } from 'react-router-dom';
import { useAuth } from '@clerk/clerk-react';
import { useEffect, useState } from 'react';
import { useVideoDetail } from '../../hooks/useVideoDetail';
import { useAddFavorite } from '../../hooks/useAddFavorite';
import { useDeleteFavorite } from '../../hooks/useDeleteFavorite';
import { toast } from 'sonner';
import {
    Box,
    Typography,
    Chip,
    Stack,
    Button,
    Container
} from '@mui/material';
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
import Loader from '../../components/loader';

const getYouTubeId = (url) => {
    const match = url.match(/(?:https?:\/\/)?(?:www\.)?youtu(?:be\.com\/watch\?v=|\.be\/)([\w\-]+)/);
    return match ? match[1] : null;
};

function VideoDetail() {
    const { id } = useParams();
    const { getToken } = useAuth();
    const [token, setToken] = useState(null);
    const [isFavorite, setIsFavorite] = useState(false);
    const { mutate: removeFromFavorite, isPending: isRemoving } = useDeleteFavorite(token);
    const { mutate: addToFavorite, isPending, isSuccess, isError } = useAddFavorite(token);

    useEffect(() => {
        getToken().then(setToken);
    }, [getToken]);

    const { data: video, isLoading, error } = useVideoDetail(id, token);

    if (isLoading || !token) return <Loader />;
    if (error) return <Typography>Error loading video</Typography>;

    const videoId = getYouTubeId(video.courseUrl);

    const handleToggleFavorite = () => {
        if (isFavorite) {
            removeFromFavorite(
                { courseId: video.id },
                {
                    onSuccess: () => {
                        toast.success('Video retirado de favoritos');
                        setIsFavorite(false);
                    },
                    onError: () => {
                        toast.error('Error al retirar de favoritos');
                    },
                }
            );
        } else {
            addToFavorite(video.id, {
                onSuccess: () => {
                    toast.success('Video agregado a favoritos');
                    setIsFavorite(true);
                },
                onError: () => {
                    toast.error('Error al agregar a favoritos');
                },
            });
        }
    };

    return (
        <Container maxWidth="md" sx={{ py: 4, marginBottom: '32px' }}>
            <Box
                sx={{
                    position: 'relative',
                    paddingTop: '56.25%', // 16:9
                    borderRadius: 2,
                    overflow: 'hidden',
                    mb: 4,
                }}
            >
                <iframe
                    src={`https://www.youtube.com/embed/${videoId}`}
                    title={video.title}
                    frameBorder="0"
                    allowFullScreen
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                    }}
                />
            </Box>

            <Typography variant="h4" fontWeight="bold" gutterBottom sx={{ color: 'white' }}>
                {video.title}
            </Typography>

            <Typography variant="body1" mb={3} sx={{ color: 'white' }}>
                {video.description}
            </Typography>

            {video.categories?.length > 0 && (
                <Stack direction="row" spacing={1} mb={3} flexWrap="wrap">
                    {video.categories.map((cat, i) => (
                        <Chip key={i} label={cat} color="primary" />
                    ))}
                </Stack>
            )}

            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <Button
                    variant="contained"
                    color="primary"
                    href={video.courseUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{ 
                        background: '#7c3aed',
                        "&:hover": {
                            backgroundColor: "#a78bfa",
                            color: "#ffffff",
                        },
                    }}
                >
                    Ver en YouTube
                </Button>
                <Button 
                    variant="contained"
                    onClick={handleToggleFavorite}
                    disabled={isPending || isRemoving}
                    sx={{ 
                        background: isFavorite ? '#ef4444' : '#7c3aed',
                        "&:hover": {
                            backgroundColor: isFavorite ? "#f87171" : "#a78bfa",
                            color: "#ffffff",
                        },
                    }}
                    startIcon={isFavorite ? <MdFavorite /> : <MdFavoriteBorder />}
                >
                    {isPending || isRemoving
                        ? 'Actualizando...'
                        : isFavorite
                            ? 'Quitar de favoritos'
                            : 'Agregar a favoritos'}
                </Button>
            </Stack>
        </Container>
    );
}

export default VideoDetail;