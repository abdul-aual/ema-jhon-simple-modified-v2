import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ContextProvider from './components/ContextProvider';
import Header from './components/HeaderF/Header';
import Navbar from './components/NavbarF/Navbar';
import Products from './components/products/Products';
import Cart from './components/CartF/Cart';
function App() {
  return (
    <div>
      <ContextProvider>
        <Router>
          <Header/>
          <Navbar/>
          <Routes>
            <Route path='/products' element={<Products/>} ></Route>
          </Routes>
          <Cart/>
        </Router>
        
      </ContextProvider>
    </div>
  );
}

export default App;
