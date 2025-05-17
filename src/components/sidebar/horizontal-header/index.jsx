import { useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, Typography, Grid } from '@mui/material';
import { MdMenu, MdOutlineChevronLeft, MdKeyboardBackspace } from "react-icons/md";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";

function HorizontalHeader({ open, toggleDrawer }){

    const navigate = useNavigate();

    return (
        <AppBar 
            className='horizontal-header' 
            position="fixed" 
            sx={{ 
                background: 'linear-gradient(135deg, #2C2C4A, #3A3A6A)', 
                width: open ? `calc(100% - 240px)` : '100%', transition: 'width 0.3s' 
            }}
        >
            <Toolbar sx={{ justifyContent: 'space-between' }}>
                <Grid sx={{ display: 'flex', alignItems: 'center', gap: '20px' }} >
                    <IconButton color="inherit" onClick={toggleDrawer}>
                        {open ? <MdOutlineChevronLeft color='#F0F0F0' /> : <MdMenu color='#F0F0F0' />}
                    </IconButton>
                    <MdKeyboardBackspace 
                        style={{
                            color: '#F0F0F0',
                            cursor: 'pointer'
                            , '&:hover': {
                                transform: 'scale(1.2)',
                                transition: 'transform 0.3s ease-in-out'
                            } 
                        }} 
                        onClick={() => navigate(-1)} 
                    />
                </Grid>
                <SignedIn>
                    <UserButton appearance={{
                        elements: {
                            userButtonAvatarBox: { width: 32, height: 32 }
                        }
                    }} />
                </SignedIn>
            </Toolbar>
        </AppBar>
    );
};

export default HorizontalHeader;