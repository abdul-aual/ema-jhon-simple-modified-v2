import React, { useContext } from 'react';
import { MyContext } from './ContextProvider';
const Kak = () => {
    const {count} = useContext(MyContext);
    return (
        <div>
            <p>This is kak</p>
            <p>{count}</p>
        </div>
    );
};

export default Kak;