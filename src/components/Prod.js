import React, { useContext } from 'react';
import {MyContext} from './ContextProvider';
const Prod = () => {
   const {count,setCount} =useContext(MyContext);
    return (
        <div>
            <p>This is products</p>
            <p>{count}</p>
            <button  onClick={()=>setCount(count+1)} >inc</button>
        </div>
    );
};

export default Prod;