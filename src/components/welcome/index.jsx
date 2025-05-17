import { Box, Typography, Button } from "@mui/material";
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function Welcome() {
    const { user } = useUser();
    const navigate = useNavigate();

    const containerVariants = {
        hidden: { opacity: 0, scale: 0.8, y: 20 },
        visible: {
            opacity: 1,
            scale: 1,
            y: 0,
            transition: { duration: 0.7, ease: "easeOut" },
        },
    };

    const handVariants = {
        initial: { rotate: 0 },
        animate: {
            rotate: [0, 20, 0],
            transition: { duration: 1, repeat: Infinity, ease: "easeInOut" },
        },
    };

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <Box sx={{ padding: {xs: 0, md: 4}, textAlign: "center" }}>
                <Typography variant="h1" gutterBottom sx={{ fontWeight: "bold", color: 'white', fontSize: {xs: '40px', md: '80px'} }}>
                    ¡Hola, {user?.firstName || "usuario"}!{" "}
                    <motion.span variants={handVariants} initial="initial" animate="animate">
                        👋
                    </motion.span>
                </Typography>
                <Typography variant="h5" sx={{ mb: 3, color: 'white' }}>
                    Bienvenido al panel de administración de SkillJAS.
                </Typography>

                <Box sx={{ display: "flex", justifyContent: "center", gap: 2, flexWrap: "wrap" }}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => navigate("/dashboard/courses")}
                        sx={{ 
                            px: 3, 
                            py: 1.5,
                            backgroundColor: "#7c3aed",
                            color: "#ffffff",
                            fontWeight: 600,
                            "&:hover": {
                                backgroundColor: "#a78bfa",
                                color: "#ffffff",
                            },
                            borderRadius: "999px",
                            textTransform: "none",
                        }}
                    >
                        Ver categorías
                    </Button>
                </Box>
            </Box>
        </motion.div>
    );
}

export default Welcome;