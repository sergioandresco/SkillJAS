import { Box, Grid } from "@mui/material";
import { motion } from "framer-motion";
import TiltedCard from "../tiltedCard";
import { useAuth } from "@clerk/clerk-react";

const categories = [
    { name: "React", logo: "https://microsistem.s3.us-east-2.amazonaws.com/react.svg", url: "/dashboard/course/react" },
    { name: ".NET", logo: "https://microsistem.s3.us-east-2.amazonaws.com/dot-net.svg", url: "/dashboard/course/net" },
    { name: "Node.js", logo: "https://microsistem.s3.us-east-2.amazonaws.com/nodejs.svg", url: "/dashboard/course/node" },
    { name: "Python", logo: "https://microsistem.s3.us-east-2.amazonaws.com/python.svg", url: "/dashboard/course/python" },
    { name: "Figma", logo: "https://microsistem.s3.us-east-2.amazonaws.com/figma.svg", url: "/dashboard/course/figma" },
    { name: "JavaScript", logo: "https://microsistem.s3.us-east-2.amazonaws.com/javascript.svg", url: "/dashboard/course/js" },
    { name: "TypeScript", logo: "https://microsistem.s3.us-east-2.amazonaws.com/typescript.svg", url: "/dashboard/course/ts" },
    { name: "Docker", logo: "https://microsistem.s3.us-east-2.amazonaws.com/docker.svg", url: "/dashboard/course/docker" },
    { name: "AWS", logo: "https://microsistem.s3.us-east-2.amazonaws.com/aws.svg", url: "/dashboard/course/aws" },
    { name: "MongoDB", logo: "https://microsistem.s3.us-east-2.amazonaws.com/mongodb.svg", url: "/dashboard/course/mongodb" },
    { name: "MySQL", logo: "https://microsistem.s3.us-east-2.amazonaws.com/mysql.svg", url: "/dashboard/course/mysql" },
];

function Categories() {

    const { getToken } = useAuth();
    const token = getToken();

    console.log("Token:", token);

    return ( 
        <Box
            sx={{
                width: "100%",
                px: 2,
                color: "#fff",
                textAlign: "center",
                marginBottom: "45px",
            }}
        >
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: true }}
            >
                <Grid container spacing={3} justifyContent="center">
                    {categories.map((categorie, i) => (
                        <Grid item xs={4} sm={3} md={2} key={categorie.name}>
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                transition={{ type: "spring", stiffness: 300 }}
                            >
                                <TiltedCard
                                    imageSrc={categorie.logo}
                                    altText={categorie.name}
                                    captionText={categorie.name}
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
                                            {categorie.name}
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

export default Categories;