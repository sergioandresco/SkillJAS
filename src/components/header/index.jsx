import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';

function Header() {
    return ( 
        <AppBar position="static">
            <Toolbar sx={{ justifyContent: "space-between" }}>
                <Typography variant="h6">SkillJAS</Typography>

                <Box>
                    <SignedIn>
                        <UserButton />
                    </SignedIn>
                    <SignedOut>
                        <SignInButton mode="modal">
                            <Button color="inherit">Login</Button>
                        </SignInButton>
                    </SignedOut>
                </Box>
            </Toolbar>
        </AppBar>
    );
}

export default Header;