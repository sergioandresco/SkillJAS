import React, { createContext, useContext, useState } from 'react';

const MenuContext = createContext();

export const useMenu = () => {
    return useContext(MenuContext);
};

export const MenuProvider = ({ children }) => {
    const [open, setOpen] = useState(false);

    const toggleMenu = () => {
        setOpen(prevOpen => !prevOpen);
    };

    return (
        <MenuContext.Provider value={{ open, toggleMenu }}>
            {children}
        </MenuContext.Provider>
    );
};