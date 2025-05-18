import { useState, useEffect } from "react";
import { Box, Grid, useMediaQuery, useTheme } from "@mui/material";
import { motion } from "framer-motion";
import { useAuth } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { useCategories } from "../../hooks/useCategories";
import TiltedCard from "../tiltedCard";
import Loader from "../loader";

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
    { name: "Mysql", logo: "https://microsistem.s3.us-east-2.amazonaws.com/mysql.svg", url: "/dashboard/course/mysql" },
    { name: "SQL", logo: "https://microsistem.s3.us-east-2.amazonaws.com/microsoft-sql-server.svg", url: "/dashboard/course/sql" },
    { name: "Visual studio", logo: "https://microsistem.s3.us-east-2.amazonaws.com/visual-studio.svg", url: "/dashboard/course/visual-studio" },
    { name: "CSHARP", logo: "https://microsistem.s3.us-east-2.amazonaws.com/c.svg", url: "/dashboard/course/c" },
    { name: "HTML", logo: "https://microsistem.s3.us-east-2.amazonaws.com/html.svg", url: "/dashboard/course/html" },
    { name: "CSS", logo: "https://microsistem.s3.us-east-2.amazonaws.com/css.svg", url: "/dashboard/course/css" },
    { name: "Excel", logo: "https://microsistem.s3.us-east-2.amazonaws.com/excel.svg", url: "/dashboard/course/excel" },
    { name: "Git", logo: "https://microsistem.s3.us-east-2.amazonaws.com/git.svg", url: "/dashboard/course/git" },
    { name: "Clerk", logo: "https://microsistem.s3.us-east-2.amazonaws.com/clerk.svg", url: "/dashboard/course/clerk" },
];

function Categories() {

    const { getToken } = useAuth();
    const [token, setToken] = useState(null);
    const navigate = useNavigate();

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    useEffect(() => {
        getToken().then(setToken);
    }, [getToken]);

    const { data: apiCategories, isLoading } = useCategories(token);

    const handleCategoryClick = (categorie) => {
        navigate(`/dashboard/course/category/${categorie.name.toLowerCase()}`, {
            state: {
                token,
                logo: categorie.logo,
                title: categorie.name
            }
        });
    };

    const validCategoryNames = apiCategories ? new Set(Object.keys(apiCategories)) : new Set();

    const filteredCategories = categories.filter(cat => validCategoryNames.has(cat.name));

    return ( 
        <Box
            sx={{
                width: "100%",
                px: {xs: 0, md: 2},
                color: "#fff",
                textAlign: "center",
                marginBottom: "45px",
            }}
        >
            {isLoading ? (
                <Loader />
            ) : (
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    viewport={{ once: true }}
                >
                    <Grid container spacing={3} justifyContent="center">
                        {filteredCategories.map((categorie) => (
                            <Grid item xs={4} sm={3} md={2} key={categorie.name}>
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                    onClick={() => handleCategoryClick(categorie)}
                                    style={{ cursor: "pointer" }}
                                >
                                    <TiltedCard
                                        imageSrc={categorie.logo}
                                        altText={categorie.name}
                                        captionText={categorie.name}
                                        containerHeight={isMobile ? "100px" : "150px"}
                                        containerWidth={isMobile ? "100px" : "150px"}
                                        imageHeight={isMobile ? "100px" : "150px"}
                                        imageWidth={isMobile ? "100px" : "150px"}
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
            )}
        </Box>
    );
}

export default Categories;