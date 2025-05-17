import { useState } from 'react';
import { Box, TextField, Button, Typography, Chip } from '@mui/material';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { useAddDocumentation } from '../../hooks/useAddDocumentation';

function AddDocumentation() {
    const { mutate, isPending, isSuccess, isError, error } = useAddDocumentation();

    const [form, setForm] = useState({
        title: '',
        description: '',
        url: '',
    });

    const [documentations, setDocumentations] = useState([]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const payload = {
            title: form.title,
            description: form.description,
            url: form.url,
        };
        mutate(payload, {
            onSuccess: () => {
                toast.success("Documentación agregado correctamente");
                setForm({
                    title: '',
                    description: '',
                    url: '',
                });
                setDocumentations([]);
            },
            onError: () => {
                toast.error("Error al agregar la documentación, intenta nuevamente");
            }
        });
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
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
                    Agrega una nueva documentación
                </Typography>

                <TextField 
                    name="title" 
                    label="Titulo de la documentación" 
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
                    label="Descripción de la documentación" 
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
                    label="URL de la documentación oficial" 
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

                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                    {documentations.map((cat, idx) => (
                        <Chip 
                            key={idx} 
                            label={cat} 
                            onDelete={() => {
                                setDocumentations(documentations.filter((c) => c !== cat));
                            }}
                            sx={{ 
                                color: 'white', 
                                background: '#7c3aed',
                                '& .MuiChip-deleteIcon': {
                                    color: 'white',
                                }
                            }} 
                        />
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
                    {isPending ? 'Guardando...' : 'Agregar Documentación'}
                </Button>
            </Box>
        </motion.div>
    );
}

export default AddDocumentation;