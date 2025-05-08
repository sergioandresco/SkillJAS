import { Typography, Container } from "@mui/material";
import Header from "../../components/header";

function Dashboard() {
    return ( 
        <>
            <Header />
            <Container sx={{ mt: 4 }}>
                <Typography variant="h4">Dashboard when the user is login</Typography>
            </Container>
        </>  
    );
}

export default Dashboard;