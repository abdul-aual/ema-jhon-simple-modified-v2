import React, { useContext, useEffect } from 'react';
import fakeData from '../fakedata/fakeData.json';
import Productt from './Productt';
import {MyContext} from '../ContextProvider';

const Products = () => {
    // const [products, setProducts] = useContext(MyContext) 
    // const [cart, setCart]=  useContext(MyContext) 
    const { products, setProducts, cart, setCart } = useContext(MyContext);

    // Load cart and sync with products when the component mounts
    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem('cart')) || { TotalItems: 0, TotalAmount: 0, Items: [] };
        const first20 = fakeData.slice(0, 20);

        // Sync products with stored cart
        const updatedProducts = first20.map((product) => {
            const cartItem = storedCart.Items.find((item) => item.key === product.key);
            return cartItem
                ? { ...product, clicked: true, quantity: cartItem.quantity }
                : { ...product, clicked: false, quantity: 0 };
        });

        setProducts(updatedProducts);
        setCart(storedCart); // Load stored cart into state
    }, []); // Run only on mount

    // Save cart to local storage whenever it changes
    useEffect(() => {
        if (cart) {
            localStorage.setItem('cart', JSON.stringify(cart));
        }
    }, [cart]);

    const handleClickBtn = (key) => {
        const selectedProduct = products.find((product) => product.key === key);

        // Update the products state
        const updatedProducts = products.map((product) =>
            product.key === key
                ? { ...product, clicked: true, quantity: 1 }
                : product
        );
        setProducts(updatedProducts);

        // Update the cart state
        setCart((prevCart) => {
            const existingItem = prevCart.Items.find((item) => item.key === key);

            const updatedItems = existingItem
                ? prevCart.Items
                : [...prevCart.Items, { ...selectedProduct, quantity: 1 }];

            return {
                TotalItems: updatedItems.length,
                TotalAmount: prevCart.TotalAmount + selectedProduct.price,
                Items: updatedItems,
            };
        });
    };
    

    const inc = (key) => {
        const selectedProduct = products.find((product) => product.key === key);

        // Update the products state
        const updatedProducts = products.map((product) =>
            product.key === key
                ? { ...product, quantity: product.quantity + 1 }
                : product
        );
        setProducts(updatedProducts);


        // Update the cart state
        setCart((prevCart) => {
            const updatedItems = prevCart.Items.map((item) =>
                item.key === key
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            );
            return {
                TotalItems: prevCart.TotalItems,
                TotalAmount: prevCart.TotalAmount + selectedProduct.price,
                Items: updatedItems,
            };
        });
    };

    const dec = (key) => {
        const selectedProduct = products.find((product) => product.key === key);

        // Update the products state
        const updatedProducts = products.map((product) =>
            product.key === key
                ? {
                      ...product,
                      quantity: product.quantity > 1 ? product.quantity - 1 : 0,
                      clicked: product.quantity > 1,
                  }
                : product
        );
        setProducts(updatedProducts);

        // Update the cart state
        setCart((prevCart) => {
            const updatedItems = prevCart.Items.map((item) =>
                item.key === key
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
            ).filter((item) => item.quantity > 0);

            return {
                TotalItems: updatedItems.length,
                TotalAmount: Math.max(0, prevCart.TotalAmount - selectedProduct.price),
                Items: updatedItems,
            };
        });
    };
  

    return (
        <div>
            {products.map((product, index) => (
                <Productt
                    pdData={product}
                    handleClickBtn={handleClickBtn}
                    inc={inc}
                    dec={dec}
                    key={index}
                />
            ))}
        </div>
    );
};

export default Products;