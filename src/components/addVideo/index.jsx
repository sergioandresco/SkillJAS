import { useState } from 'react';
import { Box, TextField, Button, Typography, Chip } from '@mui/material';
import { motion } from 'framer-motion';
import { useAddVideo } from '../../hooks/useAddVideo';

function AddVideo() {
    const { mutate, isPending, isSuccess, isError, error } = useAddVideo();

    const [form, setForm] = useState({
        title: '',
        description: '',
        url: '',
        category: '',
    });

    const [categories, setCategories] = useState([]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleAddCategory = () => {
        if (form.category && !categories.includes(form.category)) {
            setCategories([...categories, form.category]);
            setForm({ ...form, category: '' });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const payload = {
            title: form.title,
            description: form.description,
            courseUrl: form.url,
            category: categories,
        };
        mutate(payload);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <Box 
                component="form"
                onSubmit={handleSubmit}
                sx={{ 
                    maxWidth: 600, 
                    mx: 'auto', 
                    mt: 5, 
                    display: 'flex', 
                    flexDirection: 'column', 
                    gap: 2 
                }}
            >
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
                    }}
                >
                    Agrega un nuevo video
                </Typography>

                <TextField 
                    name="title" 
                    label="Titulo del video" 
                    value={form.title} 
                    onChange={handleChange} 
                    required
                    variant="filled"
                    InputProps={{ sx: { color: 'white' } }}
                    InputLabelProps={{ sx: { color: 'white' } }}
                    sx={{
                        '& .MuiFilledInput-root': {
                            backgroundColor: 'rgba(255,255,255,0.1)',
                            '&:hover': {
                                backgroundColor: 'rgba(255,255,255,0.15)',
                            },
                            '&.Mui-focused': {
                                backgroundColor: 'rgba(255,255,255,0.2)',
                            },
                        },
                    }}
                />

                <TextField 
                    name="description" 
                    label="Descripción del video" 
                    value={form.description} 
                    onChange={handleChange} 
                    multiline 
                    rows={4} 
                    required 
                    variant="filled"
                    InputProps={{ sx: { color: 'white' } }}
                    InputLabelProps={{ sx: { color: 'white' } }}
                    sx={{
                        '& .MuiFilledInput-root': {
                            backgroundColor: 'rgba(255,255,255,0.1)',
                            '&:hover': {
                                backgroundColor: 'rgba(255,255,255,0.15)',
                            },
                            '&.Mui-focused': {
                                backgroundColor: 'rgba(255,255,255,0.2)',
                            },
                        },
                    }}
                />

                <TextField 
                    name="url" 
                    label="URL del video" 
                    value={form.url} 
                    onChange={handleChange} 
                    required 
                    variant="filled"
                    InputProps={{ sx: { color: 'white' } }}
                    InputLabelProps={{ sx: { color: 'white' } }}
                    sx={{
                        '& .MuiFilledInput-root': {
                            backgroundColor: 'rgba(255,255,255,0.1)',
                            '&:hover': {
                                backgroundColor: 'rgba(255,255,255,0.15)',
                            },
                            '&.Mui-focused': {
                                backgroundColor: 'rgba(255,255,255,0.2)',
                            },
                        },
                    }}
                />

                <Box sx={{ display: 'flex', gap: 1 }}>
                    <TextField 
                        name="category" 
                        label="Agregar la categoría" 
                        value={form.category} 
                        onChange={handleChange} 
                        variant="filled"
                        InputProps={{ sx: { color: 'white' } }}
                        InputLabelProps={{ sx: { color: 'white' } }}
                        sx={{
                            '& .MuiFilledInput-root': {
                                backgroundColor: 'rgba(255,255,255,0.1)',
                                '&:hover': {
                                    backgroundColor: 'rgba(255,255,255,0.15)',
                                },
                                '&.Mui-focused': {
                                    backgroundColor: 'rgba(255,255,255,0.2)',
                                },
                            },
                        }}
                    />
                    <Button 
                        variant="outlined" 
                        onClick={handleAddCategory} 
                        sx={{
                            backgroundColor: "#7c3aed",
                            color: "#ffffff",
                            fontWeight: 600,
                            "&:hover": {
                                backgroundColor: "#a78bfa",
                                color: "#ffffff",
                            },
                            textTransform: "none",
                            px: 3,
                            py: 1.2,
                        }}
                    >
                        Agregar
                    </Button>
                </Box>

                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                    {categories.map((cat, idx) => (
                        <Chip key={idx} label={cat} />
                    ))}
                </Box>

                <Button 
                    type="submit" 
                    variant="contained" 
                    disabled={isPending}
                    sx={{
                        backgroundColor: "#7c3aed",
                        color: "#ffffff",
                        fontWeight: 600,
                        "&:hover": {
                            backgroundColor: "#a78bfa",
                            color: "#ffffff",
                        },
                        borderRadius: "999px",
                        textTransform: "none",
                        px: 3,
                        py: 1.2,
                    }}
                >
                    {isPending ? 'Guardando...' : 'Agregar Video'}
                </Button>

                {isSuccess && <Typography color="green">Video added successfully!</Typography>}
                {isError && <Typography color="red">Error: {error.message}</Typography>}
            </Box>
        </motion.div>
    );
}

export default AddVideo;