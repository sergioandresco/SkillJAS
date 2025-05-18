import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import {
    Typography,
    Drawer, 
    List, 
    ListItem, 
    ListItemIcon, 
    ListItemText, 
    Box, 
    useMediaQuery, 
    useTheme,
    Accordion,
    AccordionSummary,
    AccordionDetails,
} from '@mui/material';
import { IoHome } from "react-icons/io5";
import { useAuth } from "@clerk/clerk-react";
import { MdAddToQueue, MdOutlineVideoSettings, MdFavorite, MdExpandMore, MdEditDocument } from "react-icons/md";
import { HiDocumentMagnifyingGlass, HiDocumentPlus } from "react-icons/hi2";
import GradientText from '../../gradientText';
import { useMenu } from '../../../context/MenuContext';
import { useCategories } from '../../../hooks/useCategories';

import './vertical-menu.css'

function VerticalMenu({ open }){

    const { user } = useUser();
    const role = user?.publicMetadata?.role || "user";

    const { getToken } = useAuth();
    const [token, setToken] = useState(null);

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const { toggleMenu } = useMenu();
    const navigate = useNavigate();

    useEffect(() => {
        getToken().then(setToken);
    }, [getToken]);

    const { data: apiCategories, isLoading, error } = useCategories(token);

    const handleCategoryClick = (categorie) => {
        navigate(`/dashboard/course/category/${categorie.name.toLowerCase()}`, {
            state: {
                token,
                logo: categorie.logo,
                title: categorie.name
            }
        });
    };

    return (
        <Drawer
            className='vertical-header'
            classes={{ paper: 'vertical-header' }}
            variant={isMobile ? 'temporary' : 'persistent'}
            anchor="left"
            open={open}
            onClose={toggleMenu}
            ModalProps={{
                keepMounted: true,
            }}
            sx={{
                width: isMobile ? 240 : 240,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: isMobile ? 240 : 240,
                    boxSizing: 'border-box',
                    background: 'linear-gradient(135deg, #2C2C4A, #3A3A6A)',
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
                <Link 
                    to="/dashboard"
                    style={{ 
                        textDecoration: 'none', 
                        color: 'inherit', 
                        display: 'inline-block' 
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
                </Link>
            </Box>
            <Box sx={{ overflow: 'auto' }}>
            
                <List>
                    <Accordion
                        sx={{
                            background: 'transparent',
                            color: '#fff',
                            boxShadow: 'none',
                            '&::before': { display: 'none' }
                        }}
                    >
                        <AccordionSummary
                            expandIcon={<MdExpandMore color='#F0F0F0' style={{ fontSize: 28 }} />}
                            aria-controls="categories-content"
                            id="categories-header"
                            sx={{
                                '&.Mui-expanded': {
                                    minHeight: 'auto',
                                    margin: 0,
                                },
                                '& .MuiAccordionSummary-content': {
                                    margin: 0,
                                }
                            }}
                        >
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <IoHome color='#F0F0F0' style={{ fontSize: 22 }} />
                                <Typography>Categorías</Typography>
                            </Box>
                        </AccordionSummary>
                        <AccordionDetails sx={{ paddingLeft: 2 }}>
                            <ListItem
                                button
                                component={Link}
                                to="/dashboard/courses"
                                sx={{
                                    pl: 2,
                                    color: '#F0F0F0',
                                    '&:hover': {
                                        color: '#F0F0F0',
                                        backgroundColor: '#4c4c7a',
                                    }
                                }}
                                className='opt-vertical-menu'
                            >
                                <ListItemText primary="Ver todos" />
                            </ListItem>
                            {isLoading && <Typography>Cargando...</Typography>}
                            {error && <Typography>Error al cargar categorías</Typography>}
                            {apiCategories && Object.entries(apiCategories).map(([key]) => (
                                <ListItem
                                    key={key}
                                    button
                                    onClick={() => handleCategoryClick({ name: key })}
                                    sx={{
                                        pl: 2,
                                        color: '#F0F0F0',
                                        cursor: 'pointer',
                                        '&:hover': {
                                            color: '#F0F0F0',
                                            backgroundColor: '#4c4c7a',
                                        }
                                    }}
                                    className='opt-vertical-menu'
                                >
                                    <ListItemText primary={key} />
                                </ListItem>
                            ))}
                        </AccordionDetails>
                    </Accordion>

                    <ListItem
                        className='opt-vertical-menu' 
                        button
                        component={Link} 
                        to="/dashboard/documentations"
                    >
                        <ListItemIcon sx={{ minWidth: 40 }}>
                            <HiDocumentMagnifyingGlass color='#F0F0F0' style={{ fontSize: 22 }} />
                        </ListItemIcon>
                        <ListItemText sx={{ color: '#F0F0F0', fontSize: '17px' }} primary="Documentaciones" />
                    </ListItem>

                    <ListItem
                        className='opt-vertical-menu' 
                        button
                        component={Link} 
                        to="/dashboard/favorites"
                    >
                        <ListItemIcon sx={{ minWidth: 40 }}>
                            <MdFavorite color='#F0F0F0' style={{ fontSize: 22 }} />
                        </ListItemIcon>
                        <ListItemText sx={{ color: '#F0F0F0', fontSize: '17px' }} primary="Favoritos" />
                    </ListItem>

                    {role === "admin" && (
                        <>
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

                            <ListItem
                                className='opt-vertical-menu' 
                                button
                                component={Link} 
                                to="/dashboard/admin-videos"
                            >
                                <ListItemIcon sx={{ minWidth: 40 }}>
                                    <MdOutlineVideoSettings color='#F0F0F0' style={{ fontSize: 22 }} />
                                </ListItemIcon>
                                <ListItemText sx={{ color: '#F0F0F0', fontSize: '17px' }} primary="Administración de videos" />
                            </ListItem>

                            <ListItem
                                className='opt-vertical-menu' 
                                button
                                component={Link} 
                                to="/dashboard/add-documentation"
                            >
                                <ListItemIcon sx={{ minWidth: 40 }}>
                                    <HiDocumentPlus color='#F0F0F0' style={{ fontSize: 22 }} />
                                </ListItemIcon>
                                <ListItemText sx={{ color: '#F0F0F0', fontSize: '17px' }} primary="Agregar Documentación" />
                            </ListItem>
                            <ListItem
                                className='opt-vertical-menu' 
                                button
                                component={Link} 
                                to="/dashboard/admin-documentations"
                            >
                                <ListItemIcon sx={{ minWidth: 40 }}>
                                    <MdEditDocument color='#F0F0F0' style={{ fontSize: 22 }} />
                                </ListItemIcon>
                                <ListItemText sx={{ color: '#F0F0F0', fontSize: '17px' }} primary="Administrar Documentación" />
                            </ListItem>
                        </>
                    )}
                    
                </List>
            </Box>
        </Drawer>
        
    );
};

export default VerticalMenu;