import { useLocation } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { useDocumentations } from "../../hooks/useDocumentations";
import {
    Box,
    Typography,
    Grid,
    Card,
    CardContent,
    Button,
} from "@mui/material";
import Loader from "../../components/loader";

function Documentations() {
    const { state } = useLocation();
    const { logo, title } = state || {};
    const { getToken } = useAuth();
    const [token, setToken] = useState(null);

    useEffect(() => {
        getToken().then(setToken);
    }, [getToken]);

    const { data, isLoading, error } = useDocumentations(token);

    if (isLoading || !token) return <Loader />;
    if (error) return <Typography>Error loading documentatios</Typography>;

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
                    Documentaciones oficiales
                </Typography>
            </Box>
            <Grid container spacing={4}>
                {data
                    .filter((documentation) => documentation.isActive)
                    .map((documentation) => {
                    return (
                        <Grid item xs={12} sm={6} md={4} key={documentation.id}>
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
                                <CardContent 
                                    sx={{ 
                                        display: 'flex', 
                                        flexDirection: 'column', 
                                        flexGrow: 1,
                                        color: 'white' 
                                    }}
                                >
                                    <Typography variant="h6" gutterBottom sx={{ color: 'white', minHeight: '37px', textAlign: 'center', fontSize: '34px', fontWeight: 'bold' }}>
                                        {documentation.title}
                                    </Typography>
                                    <Typography variant="body2" mb={2} sx={{ color: 'white', textAlign: 'justify' }}>
                                        {documentation.description}
                                    </Typography>
                                    <Box mt="auto">
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            href={documentation.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            fullWidth
                                            sx={{
                                                background: '#7c3aed',
                                                "&:hover": {
                                                    backgroundColor: "#a78bfa",
                                                    color: "#ffffff",
                                                },
                                            }}
                                        >
                                            Ir a la documentación
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

export default Documentations;