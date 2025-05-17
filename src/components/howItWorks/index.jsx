import { Box, Typography, Grid, Stack, useMediaQuery } from "@mui/material";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MdOutlinePersonAddAlt, MdMenuBook, MdOutlinePlayCircleFilled } from "react-icons/md";
import ImageFirstStep from "../../assets/imgs/firstStep.webp";
import ImageSecondStep from "../../assets/imgs/secondStep.webp";
import ImageThirdStep from "../../assets/imgs/thirdStep.webp";

const steps = [
    {
      icon: <MdOutlinePersonAddAlt size={32} />,
      title: "Paso 1: Regístrate",
      description: "Crea tu cuenta en segundos para empezar.",
      image: ImageFirstStep,
    },
    {
      icon: <MdMenuBook size={32} />,
      title: "Paso 2: Elige tus temas",
      description: "Selecciona los temas que quieres aprender.",
      image: ImageSecondStep,
    },
    {
      icon: <MdOutlinePlayCircleFilled size={32} />,
      title: "Paso 3: Mira cursos rápidos",
      description: "Accede a contenido directo y sin relleno.",
      image: ImageThirdStep,
    },
];

function HowItWorksSection() {

    const [activeIndex, setActiveIndex] = useState(0);
    const isMobile = useMediaQuery("(max-width: 768px)");

    return (
        <Box
            sx={{
                paddingTop: { xs: '111px', md: '0' },
                px: { xs: 2, md: 8 },
                color: "#fff",
                width: "100%",
            }}
        >
            {isMobile ? (
                <Stack spacing={6}>
                    <Typography variant="h3" sx={{ fontWeight: 700, mb: 4, fontSize: '2rem', textAlign: 'center' }}>
                        ¿Cómo funciona?
                    </Typography>
                {steps.map((step, index) => (
                  <Box key={index}>
                    <Stack direction="row" spacing={2} alignItems="center" mb={2} sx={{ paddingLeft: '5px' }}>
                      <Box color="#fff">{step.icon}</Box>
                      <Box>
                        <Typography variant="h6" fontWeight={600}>
                          {step.title}
                        </Typography>
                        <Typography variant="body2" color="aquamarine">
                          {step.description}
                        </Typography>
                      </Box>
                    </Stack>
      
                    <Box
                      sx={{
                        width: '100%',
                        borderRadius: '20px',
                        overflow: 'hidden',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <img
                        src={step.image}
                        alt={`Paso ${index + 1}`}
                        style={{
                          width: '100%',
                          maxHeight: '385px',
                          objectFit: 'contain',
                          borderRadius: '20px',
                          maskImage: 'linear-gradient(black 93%, transparent)',
                        }}
                      />
                    </Box>
                  </Box>
                ))}
              </Stack>
            ):(
                <Grid 
                    container 
                    spacing={6} 
                    alignItems="center" 
                    sx={{ 
                        display: 'grid', 
                        gridTemplateColumns: '517px 580px', 
                        height: '100%', 
                        gap: '80px', 
                        justifyContent: 'center' 
                    }}
                >
                    {/* Panel de pasos */}
                    <Grid item xs={12} md={6} sx={{ minWidth: { xs: 'auto', md: '400px' }, maxWidth: '490px', flex: 1 }}>
                        <Typography variant="h3" sx={{ fontWeight: 700, mb: 4 }}>
                            ¿Cómo funciona?
                        </Typography>

                        <Stack spacing={3}>
                            {steps.map((step, index) => (
                                <Box
                                    key={index}
                                    onMouseEnter={() => !isMobile && setActiveIndex(index)}
                                    onClick={() => isMobile && setActiveIndex(index)}
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 2,
                                        p: 2,
                                        borderRadius: 2,
                                        cursor: "pointer",
                                        backgroundColor: activeIndex === index ? "#ffffff11" : "transparent",
                                        transition: "0.3s",
                                    }}
                                >
                                    <Box color="#ffff">{step.icon}</Box>
                                    <Box>
                                        <Typography variant="h6" fontWeight={600}>
                                            {step.title}
                                        </Typography>
                                        <Typography variant="body2" color="aquamarine">
                                            {step.description}
                                        </Typography>
                                    </Box>
                                </Box>
                            ))}
                        </Stack>
                    </Grid>

                    {/* Imagen ilustrativa */}
                    <Grid item xs={12} md={6}>
                        <Box
                            sx={{
                                width: '100%',
                                maxWidth: '600px',
                                height: '422px',
                                borderRadius: '20px',
                                overflow: 'hidden',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <motion.img
                                key={steps[activeIndex].image}
                                src={steps[activeIndex].image}
                                alt={`Paso ${activeIndex + 1}`}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                                style={{
                                    // width: "100%",
                                    maxHeight: "385px",
                                    objectFit: "contain",
                                    borderRadius: "20px",
                                    maskImage: "linear-gradient(black 93%, transparent)"
                                }}
                            />
                        </Box>
                    </Grid>
                </Grid>
            )}
        </Box>
    );
}

export default HowItWorksSection;