import { Box } from "@mui/material";
import { useUser } from "@clerk/clerk-react";
import { motion } from 'framer-motion';
import { Outlet } from 'react-router-dom';
import HorizontalHeader from "../../components/sidebar/horizontal-header";
import VerticalMenu from "../../components/sidebar/vertical-menu";
import { useMenu } from "../../context/MenuContext.jsx";

function Dashboard() {

	const { open, toggleMenu } = useMenu();
	const { user } = useUser();
	const role = user?.publicMetadata?.role || "user";

    return ( 
		<Box sx={{ position: 'relative', height: '100vh', width: '100%', overflow: 'hidden' }}>
            
            <motion.div
                initial={{ x: '-240px' }}
                animate={{ x: open ? '0' : '-240px' }}
                transition={{ type: 'tween', duration: 0.3 }}
                style={{ position: 'absolute', height: '100%', zIndex: 1200 }}
            >
                <VerticalMenu open={open} />
            </motion.div>
            
            <motion.div
                initial={{ marginLeft: '0' }}
                animate={{ marginLeft: open ? '240px' : '0' }}
                transition={{ type: 'tween', duration: 0.3 }}
            >
                <Box 
                    className="main-content" 
                    sx={{ 
                        width: open ? 'calc(100% - 48px)' : 'unset',
                        transition: 'left 0.3s ease',
                        height: '100vh',
                        display: 'flex',
                        flexDirection: 'column',
                        overflowX: 'hidden', 
                        overflowY: 'auto',
                        padding: '24px'
                    }}
                >
                    <HorizontalHeader open={open} toggleDrawer={toggleMenu} />
                    
                    <Box 
                        component="main" 
                        sx={{ 
                            flexGrow: 1, 
                            marginTop: '64px',
                            overflowX: 'hidden'
                        }}
                    >
                        <Outlet />
                    </Box>
                </Box>
            </motion.div>
        </Box>
    );
}

export default Dashboard;