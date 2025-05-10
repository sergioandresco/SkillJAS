import { useState, useEffect } from "react";
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    Box,
    useMediaQuery,
    useTheme,
    Slide,
} from "@mui/material";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import { motion, AnimatePresence } from "framer-motion";
import GradientText from "../gradientText";

const subtitles = [
    "Cursos personalizados para ti",
    "Aprende de forma dinámica",
    "Para desarrolladores ambiciosos",
    "Contenido de calidad",
    "Aprende a tu ritmo",
];

function Header() {
    const [elevate, setElevate] = useState(false);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
        setElevate(window.scrollY > 10);
        };
        window.addEventListener("scroll", handleScroll);
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % subtitles.length);
        }, 4000);

        return () => clearInterval(interval);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <Slide in direction="down">
            <AppBar
                position="fixed"
                elevation={elevate ? 4 : 0}
                sx={{
                    backgroundColor: elevate ? "#0E0E10" : "transparent",
                    transition: "background-color 0.3s ease, box-shadow 0.3s ease",
                    color: "white",
                    backdropFilter: elevate ? "blur(10px)" : "none",
                }}
            >
                <Toolbar sx={{ justifyContent: "space-between", padding: {xs: '15px 21px', md: '15px 40px'} }}>
                    
                    {/* <Typography variant="h6" sx={{ fontWeight: "bold", letterSpacing: 1.5 }}>
                        SkillJAS
                    </Typography> */}

                    <GradientText
                        colors={[
                            "#facc15",
                            "#a855f7", 
                            "#f472b6", 
                            "#38bdf8", 
                            "#facc15"
                        ]}
                        animationSpeed={3}
                        showBorder={false}
                        className="custom-class"
                    >
                        SkillJAS
                    </GradientText>

                    <Box
                        sx={{ display: {xs: 'none', md: 'flex'} }}
                    >
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.5 }}
                            >
                                <Typography variant="h6" sx={{ fontSize: '18px' }}>{subtitles[index]}</Typography>
                            </motion.div>
                        </AnimatePresence>
                    </Box>

                    
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                        <SignedIn>
                            <UserButton appearance={{
                                elements: {
                                    userButtonAvatarBox: { width: 32, height: 32 }
                                }
                            }} />
                        </SignedIn>
                        <SignedOut>
                            <SignInButton mode="modal">
                                <Button
                                    variant="contained"
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
                                    {isMobile ? "Ingresar" : "Iniciar sesión"}
                                </Button>
                            </SignInButton>
                        </SignedOut>
                    </Box>
                </Toolbar>
            </AppBar>
        </Slide>
    );
}

export default Header;