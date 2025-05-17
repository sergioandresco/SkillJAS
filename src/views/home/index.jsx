import { Box } from "@mui/material";
import Header from "../../components/header";
import HeroSection from "../../components/hero";
import BenefitsSection from "../../components/benefits";
import HowItWorksSection from "../../components/howItWorks";
import FinalCTASection from "../../components/finalCtaSection";

function HomePage() {

    return (
        <>
            <Header />
            <Box
                sx={{
                height: "100vh",
                overflowY: "scroll",
                scrollSnapType: "y mandatory",
                }}
            >
                {/* Sección 1: Hero */}
                <Box
                    sx={{
                        display: { xs: "flex", md: "flex" },
                        minHeight: "100vh",
                        scrollSnapAlign: "start",
                        scrollSnapStop: "always",
                    }}
                >
                    <HeroSection />
                </Box>

                {/* Sección 2: Beneficios */}
                <Box
                    sx={{
                        display: "flex",
                        minHeight: "100vh",
                        scrollSnapAlign: "start",
                        scrollSnapStop: "always",
                    }}
                >
                    <BenefitsSection />
                </Box>

                {/* Sección 3: Cómo funciona */}
                <Box
                    sx={{
                        display: "flex",
                        minHeight: "100vh",
                        scrollSnapAlign: "start",
                        scrollSnapStop: "always",
                    }}
                >
                    <HowItWorksSection />
                </Box>

                {/* Sección 4: Ultimo hero */}
                <Box
                    sx={{
                        display: "flex",
                        minHeight: "100vh",
                        scrollSnapAlign: "start",
                        scrollSnapStop: "always",
                    }}
                >
                    <FinalCTASection />
                </Box>
            </Box>
        </>
      );
};

export default HomePage;