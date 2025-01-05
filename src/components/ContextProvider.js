import React, { createContext, useState } from 'react';

export const MyContext = createContext();

const ContextProvider = ({ children }) => {
    const [cart, setCart] = useState({ TotalItems: 0, TotalAmount: 0, Items: [] });
    const [products, setProducts] = useState([]);

    return (
        <MyContext.Provider value={{ products, setProducts, cart, setCart }}>
            {children}
        </MyContext.Provider>
    );
};

export default ContextProvider;
