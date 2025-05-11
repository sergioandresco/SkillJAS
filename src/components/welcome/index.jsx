// src/pages/dashboard/Welcome.js
import { Box, Typography, Button } from "@mui/material";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function Welcome() {
    const { user } = useUser();
    const navigate = useNavigate();

    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <Box sx={{ padding: 4 }}>
                <Typography variant="h4" gutterBottom>
                    ¡Hola, {user?.firstName || "usuario"}! 👋
                </Typography>
                <Typography variant="subtitle1" sx={{ mb: 3 }}>
                    Bienvenido al panel de administración de SkillJAS.
                </Typography>

                <Box sx={{ display: "flex", gap: 2, flexWrap: 'wrap' }}>
                    <Button 
                        variant="contained" 
                        color="primary"
                        onClick={() => navigate("/dashboard/categories")}
                    >
                        Ver categorías
                    </Button>

                    <Button 
                        variant="outlined" 
                        color="secondary"
                        onClick={() => navigate("/dashboard/add-video")}
                    >
                        Agregar nuevo video
                    </Button>
                </Box>
            </Box>
        </motion.div>
    );
}

export default Welcome;