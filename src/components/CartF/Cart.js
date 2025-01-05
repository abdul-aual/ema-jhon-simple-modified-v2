import './cart.css';
import logo from '../images/logo.png';
import { useContext, useEffect } from 'react';
import { MyContext } from '../ContextProvider';

const Cart = () => {
    const { products, setProducts, cart, setCart } = useContext(MyContext);

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem('cart')) || { TotalItems: 0, TotalAmount: 0, Items: [] };
        setCart(storedCart);
    }, [setCart]);

    const toggleClass = () => {
        const divClass = document.getElementById('expandable-div');
        divClass.classList.toggle('expanded');
        divClass.classList.toggle('collapse');
    };

    const clearCart = () => {
        localStorage.removeItem('cart');
        setCart({ TotalItems: 0, TotalAmount: 0, Items: [] });

        if (Array.isArray(products)) {
            const clearedProducts = products.map((product) => ({
                ...product,
                clicked: false,
                quantity: 0,
            }));
            setProducts(clearedProducts);
        }
    };

    const removeItemFromCart = (key) => {
        const updatedItems = cart.Items.filter(item => item.key !== key);

        const updatedTotalAmount = updatedItems.reduce((total, item) => total + item.MRP * item.quantity, 0);
        const updatedTotalItems = updatedItems.length;

        // Update cart state and localStorage
        setCart({
            TotalItems: updatedTotalItems,
            TotalAmount: updatedTotalAmount,
            Items: updatedItems,
        });
        localStorage.setItem('cart', JSON.stringify({
            TotalItems: updatedTotalItems,
            TotalAmount: updatedTotalAmount,
            Items: updatedItems,
        }));

        // Update the products list state to reflect the changes
        if (Array.isArray(products)) {
            const updatedProducts = products.map((product) =>
                product.key === key ? { ...product, clicked: false, quantity: 0 } : product
            );
            setProducts(updatedProducts);
        }
    };

    if (!cart) {
        return <div>Loading...</div>;
    }

    const TotalAmount = parseFloat(cart.TotalAmount || 0).toFixed(2);

    return (
        <div id="expandable-div" className="collapse">
            <div className="collapse-content" onClick={toggleClass}>
                <div className="item-div">
                    <h5>{cart.TotalItems} Items</h5>
                </div>
                <div className="logo-div">
                    <img src={logo} alt="Logo" />
                </div>
                <div className="total-amount-div">
                    <h5>{TotalAmount}</h5>
                </div>
            </div>
            <div className="expandable-content">
                <button className="cross-btn" onClick={toggleClass}>
                    &times;
                </button>
                <div className="scrollable-content">
                    {cart.Items.length > 0 ? (
                        cart.Items.map((item) => (
                            <div key={item.key} className="cart-item">
                                <small>{item.name}</small>
                                <p>Quantity: {item.quantity}</p>
                                <p>Price: {item.MRP}</p>
                                <button
                                    className="remove-btn"
                                    onClick={() => removeItemFromCart(item.key)}
                                >
                                    &times; Remove
                                </button>
                            </div>
                        ))
                    ) : (
                        <p>Your cart is empty.</p>
                    )}
                    <button onClick={() => {
                        clearCart();  
                        toggleClass(); 
                    }}>
                        Clear the Cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Cart;
