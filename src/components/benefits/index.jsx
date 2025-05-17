import { useState, useEffect } from "react";
import { Box, Typography, Grid, Paper } from "@mui/material";
import { motion } from "framer-motion";
import { MdAccessTime, MdOutlineSecurity, MdEmojiObjects, MdRocket } from "react-icons/md";
import PixelCard from "../pixelCard";

const benefits = [
    {
      icon: "⏱️",
      title: "Sin relleno innecesario",
      description: "Nuestro enfoque es directo al punto para maximizar tu tiempo de aprendizaje.",
    },
    {
      icon: "🎯",
      title: "Aprendizaje personalizado",
      description: "Elige el contenido que más te ayuda, sin distracciones ni contenido irrelevante.",
    },
    {
      icon: "🚀",
      title: "Creado por expertos",
      description: "El contenido está curado por profesionales para garantizar calidad y eficacia.",
    },
    {
      icon: "🔐",
      title: "100% gratuito",
      description: "Accede a todo el contenido sin costo alguno. Siempre será gratuito.",
    },
];

function BenefitsSection() {
    return ( 
        <Box
            sx={{
                height: { xs: 'auto' },
                color: "white",
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: '40px',
                paddingTop: { xs: '111px', md: '0' },
                width: "100%",
            }}
        >
            <Typography variant="h2" sx={{ fontWeight: 700, fontSize: { xs: "2rem", md: "3.5rem" } }}>
                ¿Por qué nosotros? / Beneficios
            </Typography>

            <Grid container spacing={4} justifyContent="center">
                {benefits.map((benefit, index) => (
                    <Grid item xs={12} sm={6} md={3} key={index}>
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.6 }}
                            transition={{ duration: 0.8, delay: index * 0.2 }}
                        >
                            <PixelCard variant="pink">
                                <Paper
                                    sx={{
                                        p: 4,
                                        borderRadius: "16px",
                                        background: "#ffffff1a",
                                        boxShadow: "0 4px 16px rgba(0, 0, 0, 0.2)",
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        height: "100%",
                                        position: "absolute",
                                    }}
                                >
                                    <Typography variant="h5" sx={{ fontSize: '34px', fontWeight: 600, color: 'white' }}>
                                        {benefit.icon}
                                    </Typography>
                                    <Typography variant="h5" sx={{ mt: 2, fontWeight: 600, color: 'white' }}>
                                        {benefit.title}
                                    </Typography>
                                    <Typography variant="body1" sx={{ mt: 1, color: 'white' }}>
                                        {benefit.description}
                                    </Typography>
                                </Paper>
                            </PixelCard>
                        </motion.div>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}

export default BenefitsSection;