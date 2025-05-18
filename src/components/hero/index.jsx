import { Box, Button, Typography } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Typewriter from "typewriter-effect";
import { useUser, SignInButton } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

function HeroSection() {

    const [index, setIndex] = useState(0);
    const { isSignedIn } = useUser();
    const navigate = useNavigate();

    const handleClick = (e) => {
        if (isSignedIn) {
            navigate("/dashboard/courses");
        }
    };


    return (
        <motion.div
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.8, delay: index * 0.1 }}
            style={{
                height: { xs: 'auto', md: '100%' },
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                color: "white",
                padding: "1rem",
                width: "100%",
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    maxWidth: '1090px'
                }}
            >
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                >
                    <Typography
                        variant="h2"
                        fontWeight={700}
                        gutterBottom
                        sx={{ fontSize: { xs: "2rem", md: "3.5rem" }, color: "white" }}
                    >
                        <Typewriter
                            options={{
                                strings: [
                                    "Aprende rápido, sin perderte entre miles de opciones.",
                                ],
                                autoStart: true,
                                loop: false,
                                delay: 40,
                                cursor: "",
                                cursorClassName: "typewriter-cursor",
                                deleteSpeed: Infinity,
                            }}
                            onInit={(typewriter) => {
                                typewriter
                                  .typeString("Aprende rápido, sin perderte entre miles de opciones.")
                                  .callFunction((state) => {
                                    state.elements.cursor.style.display = "none";
                                  })
                                  .start();
                              }}
                        />
                    </Typography>
                </motion.div>

                <Typography
                    variant="h6"
                    sx={{
                        mb: 2,
                        fontWeight: 400,
                        color: "rgba(255,255,255,0.8)",
                        maxWidth: "600px",
                        marginX: "auto",
                    }}
                >
                    SkillJAS es una plataforma educativa gratuita para desarrolladores, donde encontrarás solo el mejor contenido previamente seleccionado. Olvídate de perder tiempo buscando cursos: aquí solo verás lo que realmente te ayuda a aprender.
                </Typography>

                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.8 }}
                >
                    {isSignedIn ? (
                        <Button
                            variant="contained"
                            onClick={handleClick}
                            sx={{
                                mt: 4,
                                px: 4,
                                py: 1.5,
                                borderRadius: "30px",
                                backgroundColor: "#7c3aed",
                                "&:hover": {
                                    backgroundColor: "#a78bfa",
                                },
                            }}
                        >
                            Explorar Cursos
                        </Button>
                    ) : (
                        <SignInButton mode="modal">
                            <Button
                                variant="contained"
                                onClick={handleClick}
                                sx={{
                                    mt: 4,
                                    px: 4,
                                    py: 1.5,
                                    borderRadius: "30px",
                                    backgroundColor: "#7c3aed",
                                    "&:hover": {
                                        backgroundColor: "#a78bfa",
                                    },
                                }}
                            >
                                Explorar Cursos
                            </Button>
                        </SignInButton>
                    )}
                </motion.div>
            </Box>
        </motion.div>
    );
}

export default HeroSection;