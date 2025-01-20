import './cart.css';
import logo from '../images/logo.png';
import { useContext, useEffect } from 'react';
import { MyContext } from '../ContextProvider';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

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

         let totalbal = 0;
         updatedItems.forEach((itm) => {
             totalbal += parseFloat(itm.price) * itm.quantity; 
         });
         const updatedTotalAmount = parseFloat(totalbal.toFixed(2)); 
         
         

   const  updatedTotalItems = updatedItems.length;

    //     // Update cart state and localStorage
        setCart({
            TotalItems: updatedTotalItems,
           TotalAmount: updatedTotalAmount,
           Items: updatedItems,
      });
        

        if (Array.isArray(products)) {
            const updatedProducts = products.map((product) =>
                product.key === key ? { ...product, clicked: false, quantity: 0 } : product
            );
            setProducts(updatedProducts);
        }
    };
    const inc = (key) =>{
        const selectedProduct = products.find((product) => product.key === key);

        // Update the products state
        const updatedProducts = products.map((product) =>
            product.key === key
                ? { ...product, quantity: product.quantity + 1 }
                : product
        );
        setProducts(updatedProducts);

        setCart((prevCart) => {
            const updatedItems = prevCart.Items.map((item) =>
                item.key === key
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            );
            return {
                TotalItems: prevCart.TotalItems,
                TotalAmount: parseFloat((prevCart.TotalAmount + selectedProduct.price).toFixed(2)),
                Items: updatedItems,
            };
        });
    };

    const dec = (key) =>{
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
                TotalAmount: parseFloat(Math.max(0, prevCart.TotalAmount - selectedProduct.price).toFixed(2)),
                Items: updatedItems,
            };
        });
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
                <div className='expanded-header'>
                    <div className='shopping-cart-icon'>
                        <ShoppingCartIcon style={{ marginRight: '5px', fontSize:'20px', border:'1px solid white', borderRadius:'50%',padding:'5px' }} />
                        <h3>{cart.TotalItems} Item</h3>

                    </div>

                    <button className="cross-btn" onClick={toggleClass}>
                        &times;
                    </button>
                </div>
                <div className="scrollable-content">
                    {cart.Items.length > 0 ? (
                        cart.Items.map((item) => (
                            <div key={item.key} className="cart-item">
                                <div className='cart-item-child-div'>
                                    <div style={{display:'flex', flexDirection:'column',lineHeight:'5px'}}>
                                    <p style={{color:'#0c8542',fontWeight:'500'}}>{item.name.length > 15 ? `${item.name.slice(0, 15)}...` : item.name}</p>
                                    <small style={{fontSize:'10px',textAlign:'center',color:'black'}}>$ {item.price}</small>
                                    </div>
                                    <small> 
                                        <button className='cart-btn'>
                                            <>
                                            <span className='cart-inc' onClick={()=>dec(item.key)} >-</span>
                                            <span className='cart-itm' >{item.quantity}</span>
                                            <span className='cart-dec' onClick={()=>inc(item.key)}>+</span>
                                            </>
                                        </button>
                                    </small>
                                    <small> Price: {parseFloat(item.price*item.quantity).toFixed(2)}</small>
                                    <button
                                        className="remove-btn"
                                         onClick={() => removeItemFromCart(item.key)}
                                    >
                                        &times;
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p style={{ textAlign: 'center' }}>Your cart is empty.</p>
                    )}

                </div>
                <div className="expanded-footer">
                    <div  className='expanded-footer-child' style={{ height: '65%' }}>

                        <div style={{margin:'0px 5px',padding:'0px',lineHeight:'5px'}}>
                            <h4>Total Items</h4>
                            <h4>Total Amount</h4>
                        </div>
                        <div style={{margin:'0px 5px',padding:'0px',lineHeight:'5px'}}>
                        <h4 style={{textAlign:'right'}}>{cart.TotalItems}</h4>
                        <h4>{cart.TotalAmount}tk</h4>
                        </div>


                    </div>
                    <div style={{ height: '35%', display: 'flex', justifyContent: 'space-between', margin: '0px 15px' }}>
                        <div>
                            <button className='clear-the-cart-btn common-effect' onClick={() => {
                                clearCart();
                                toggleClass();
                            }}>
                                Clear the Cart
                            </button>
                        </div>
                        <div>
                            <button className='order-now-btn common-effect'>Order Now</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
