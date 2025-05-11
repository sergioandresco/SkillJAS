import { Link } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Box } from '@mui/material';
import { IoHome } from "react-icons/io5";
import { MdAddToQueue } from "react-icons/md";
import GradientText from '../../gradientText';

import './vertical-menu.css'

function VerticalMenu({ open }){

    const { user } = useUser();
    const role = user?.publicMetadata?.role || "user";

    return (
        <Drawer
            className='vertical-header'
            classes={{ paper: 'vertical-header' }}
            variant="persistent"
            anchor="left"
            open={open}
            sx={{
                width: 240,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: 240,
                    boxSizing: 'border-box',
                    background: 'linear-gradient(135deg, #2C2C4A, #3A3A6A)'
                },
            }}
        >
            <Box 
                sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '16px 0',
                }}
            >
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
                    className="title-dashboard"
                >
                    SkillJAS
                </GradientText>
            </Box>
            <Box sx={{ overflow: 'auto' }}>
            
                <List>

                    <ListItem
                        className='opt-vertical-menu' 
                        button
                        component={Link} 
                        to="/dashboard/categories"
                    >
                        <ListItemIcon sx={{ minWidth: 40 }}>
                            <IoHome color='#F0F0F0' style={{ fontSize: 22 }} />
                        </ListItemIcon>
                        <ListItemText sx={{ color: '#F0F0F0', fontSize: '17px' }} primary="Categorías" />
                    </ListItem>

                    {role === "admin" && (
                        <ListItem
                            className='opt-vertical-menu' 
                            button
                            component={Link} 
                            to="/dashboard/add-video"
                        >
                            <ListItemIcon sx={{ minWidth: 40 }}>
                                <MdAddToQueue color='#F0F0F0' style={{ fontSize: 22 }} />
                            </ListItemIcon>
                            <ListItemText sx={{ color: '#F0F0F0', fontSize: '17px' }} primary="Agregar video" />
                        </ListItem>
                    )}
                    
                </List>
            </Box>
        </Drawer>
        
    );
};

export default VerticalMenu;