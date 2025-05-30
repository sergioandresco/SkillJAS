import { Box, Typography, Grid, Paper } from "@mui/material";
import { motion } from "framer-motion";
import TiltedCard from "../tiltedCard";

const technologies = [
    { name: "React", logo: "https://microsistem.s3.us-east-2.amazonaws.com/react.svg" },
    { name: ".NET", logo: "https://microsistem.s3.us-east-2.amazonaws.com/dot-net.svg" },
    { name: "Node.js", logo: "https://microsistem.s3.us-east-2.amazonaws.com/nodejs.svg" },
    { name: "Python", logo: "https://microsistem.s3.us-east-2.amazonaws.com/python.svg" },
    { name: "Figma", logo: "https://microsistem.s3.us-east-2.amazonaws.com/figma.svg" },
    { name: "JavaScript", logo: "https://microsistem.s3.us-east-2.amazonaws.com/javascript.svg" },
    { name: "TypeScript", logo: "https://microsistem.s3.us-east-2.amazonaws.com/typescript.svg" },
    { name: "Docker", logo: "https://microsistem.s3.us-east-2.amazonaws.com/docker.svg" },
    { name: "AWS", logo: "https://microsistem.s3.us-east-2.amazonaws.com/aws.svg" },
    { name: "MongoDB", logo: "https://microsistem.s3.us-east-2.amazonaws.com/mongodb.svg" },
    { name: "MySQL", logo: "https://microsistem.s3.us-east-2.amazonaws.com/mysql.svg" },
];

function FinalCTASection() {
    return ( 
        <Box
            sx={{
                width: "100%",
                py: { xs: 10, md: 16 },
                px: 2,
                color: "#fff",
                textAlign: "center",
            }}
        >
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: true }}
            >
                <Typography variant="h3" fontWeight={700} gutterBottom>
                    ¿Listo para aprender en serio?
                </Typography>
                <Typography variant="body1" mb={6}>
                    Explora contenido de las tecnologías más demandadas del mercado.
                </Typography>

                <Grid container spacing={3} justifyContent="center">
                    {technologies.map((tech, i) => (
                        <Grid item xs={4} sm={3} md={2} key={tech.name}>
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                transition={{ type: "spring", stiffness: 300 }}
                            >
                                <TiltedCard
                                    imageSrc={tech.logo}
                                    altText={tech.name}
                                    captionText={tech.name}
                                    containerHeight="150px"
                                    containerWidth="150px"
                                    imageHeight="150px"
                                    imageWidth="150px"
                                    rotateAmplitude={12}
                                    scaleOnHover={1.2}
                                    showMobileWarning={false}
                                    showTooltip={true}
                                    displayOverlayContent={true}
                                    overlayContent={
                                        <p className="tilted-card-demo-text">
                                            {tech.name}
                                        </p>
                                    }
                                />
                            </motion.div>
                        </Grid>
                    ))}
                </Grid>
            </motion.div>
        </Box>
    );
}

export default FinalCTASection;