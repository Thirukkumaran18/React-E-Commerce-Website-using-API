import React, { useEffect, useState } from 'react';
import Products from './components/products/Products'
import Navbar from './components/Navbar/Navbar'
import { Commercefile } from './lib/Commercefile'
import Cart from './components/Cart/Cart';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Checkout from './components/CheckoutForm/Checkout/Checkout';



// import { Cart } from '@chec/commerce.js/features/cart'


const App = () => {

  const [products, setProducts] = useState([]);

  const [cart , setCart] = useState([]);

  const [isCartLoaded, setIsCartLoaded] = useState(false);

  const fetchProducts = async () => {
      const { data } = await Commercefile.products.list();
      setProducts(data);
  }

  const fetchCart = async () => {
      const cartdata = await Commercefile.cart.retrieve();
      setCart(cartdata);
      setIsCartLoaded(true);
  }

  const handleAddToCart = async (productId, quantity) => {
    try {
        const item = await Commercefile.cart.add(productId, quantity);
        setCart(item);
    } catch (error) {
        console.error('Error adding item to cart:', error);
    }
}

  const updateCartQuantity = async (productId, quantity) => {
    const response = await Commercefile.cart.update(productId, {quantity});
    setCart(response);
  }

  const removeFromCart = async (productId) => {
    const response = await Commercefile.cart.remove(productId);
    setCart(response);
  }

  const emptyCart = async () => {
    const response = await Commercefile.cart.empty();
    setCart(response)
  }

  useEffect(() => {
    fetchProducts();
    fetchCart();
    
  },[]);
  

  // console.log(cart);
 
  
  // cart && cart.line_items ? cart.line_items.length : 0;
 
  return (
<Router>
      <div>
        <Navbar totalitems={cart.total_items&& cart.total_items } />
        <Routes>
          <Route path="/" element={<Products products={products} onAddToCart={handleAddToCart} />} />
          <Route path="/cart" 
              element={isCartLoaded ? 
              <Cart cart={cart} 
              updateCartQuantity = {updateCartQuantity}
              removeFromCart={removeFromCart}
              emptyCart={emptyCart}
              /> : <div>Loading...</div>} 
          />
          <Route path='/checkout' element={<Checkout cart={cart} />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
