import React from 'react';
import './productt.css';

const Productt = ({pdData,handleClickBtn,inc,dec}) => {
    const {name,seller,stock,img,price,clicked,quantity,key} = pdData;
    return (
        <div className='pd-main-div'>
            <div className='img-div'>
                <img src={img} alt="" />
            </div>
            <div className='pd-details'>
                <h3>{name}</h3>
                <small>Seller:{seller}</small><br></br>
                <small>Only left {stock} in stock.Order soon...</small>
                <h4>Price: ${price}</h4>
                
                <button className={`add-to-bag-btn ${clicked?'clicked':''}`}
                onClick={ clicked? null:()=>handleClickBtn(key)}
                >
                    {
                        clicked?(
                                <>
                                <span className='dec-btn' onClick={()=>dec(key)} >-</span>
                                <span className='quantity-btn'>{quantity}</span>
                                <span className='inc-btn' onClick={()=>inc(key)}>+</span>
                                </>
                        ):(
                            'Add to Bag'
                        )
                    }
                </button>
                
            </div>
        </div>
    );
};

export default Productt;