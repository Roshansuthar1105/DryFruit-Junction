import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import axios from 'axios';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user,BACKEND_API } = useAuth();
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('sweetDelightsCart');
    return saved ? JSON.parse(saved) : [];
  });

  // 💾 Always save to localStorage
  useEffect(() => {
    localStorage.setItem('sweetDelightsCart', JSON.stringify(cart));
  }, [cart]);

  // 🔄 Load cart on login/logout
  // Update the fetchCart function to properly handle images
const fetchCart = async () => {
  const token = localStorage.getItem('token');
  if (user && token) {
    try {
      const response = await axios.get(`${BACKEND_API}/api/cart`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const serverCart = (response.data.items || []).map(item => ({
        ...item.product,
        images: item.product.images, // Ensure images are included
        quantity: item.quantity,
        _id: item.product._id,
        itemId: item._id,
      }));

      setCart(serverCart);
      localStorage.setItem('sweetDelightsCart', JSON.stringify(serverCart));
    } catch (err) {
      console.error('❌ Fetching cart failed:', err);
    }
  }
};
  useEffect(() => {

    fetchCart();
  }, [user]);

  const addToCart = async (product, quantity = 1) => {
    const updatedCart = cart.some(item => item._id === product._id)
      ? cart.map(item =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      : [...cart, { ...product, quantity }];

    setCart(updatedCart);

    if (user) {
      try {
        await axios.post(`${BACKEND_API}/api/cart`, {
          productId: product._id,
          quantity,
        }, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
      } catch (err) {
        console.error('❌ Failed to sync addToCart:', err);
      }
    }
  };

  const updateQuantity = async (productId, newQuantity) => {
    if (newQuantity < 1) return;

    const updated = cart.map(item =>
      item._id === productId ? { ...item, quantity: newQuantity } : item
    );
    setCart(updated);

    if (user) {
      const item = cart.find(i => i._id === productId);
      if (!item?.itemId) return;
      try {
        await axios.put(`${BACKEND_API}/api/cart/${item.itemId}`, {
          quantity: newQuantity,
        }, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
      } catch (err) {
        console.error('❌ Failed to update quantity:', err);
      }
    }
  };

  const removeFromCart = async (productId) => {
    const item = cart.find(i => i._id === productId);
    setCart(prev => prev.filter(item => item._id !== productId));

    if (user && item?.itemId) {
      try {
        await axios.delete(`${BACKEND_API}/api/cart/${item.itemId}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
      } catch (err) {
        console.error('❌ Failed to remove item:', err);
      }
    }
  };

  const clearCart = async () => {
    setCart([]);
    localStorage.removeItem('sweetDelightsCart');

    if (user) {
      try {
        await axios.delete(`${BACKEND_API}/api/cart`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
      } catch (err) {
        console.error('❌ Failed to clear cart:', err);
      }
    }
  };

  const cartTotal = cart.reduce((sum, item) => {
    const price = typeof item.price === 'string'
      ? parseFloat(item.price.replace(/[^0-9.-]/g, ''))
      : item.price;
    return sum + (price * item.quantity);
  }, 0);

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      updateQuantity,
      removeFromCart,
      clearCart,
      cartTotal,
      cartCount
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
