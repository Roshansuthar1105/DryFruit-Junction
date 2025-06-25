import { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { toast } from "react-hot-toast";
import axios from 'axios';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user, BACKEND_API } = useAuth();
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('sweetDelightsCart');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('sweetDelightsCart', JSON.stringify(cart));
  }, [cart]);

  const fetchCart = async () => {
    const token = localStorage.getItem('token');
    if (user && token) {
      try {
        const response = await axios.get(`${BACKEND_API}/api/cart`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const serverCart = (response.data.items || []).map(item => ({
          ...item.product,
          images: item.product.images,
          quantity: item.quantity,
          _id: item.product._id,
          itemId: item._id,
          variantId: item.variant,
          price: item.price,
          weight: item.product.variants?.find(v => v._id === item.variant)?.weight || ''
        }));

        setCart(serverCart);
        localStorage.setItem('sweetDelightsCart', JSON.stringify(serverCart));
      } catch (err) {
        console.error('❌ Fetching cart failed:', err);
        toast.error('Failed to load cart');
      }
    }
  };

  useEffect(() => {
    fetchCart();
  }, [user]);

  const addToCart = async (product, quantity = 1, variantId = null) => {
    const existingItemIndex = cart.findIndex(
      item => item._id === product._id && item.variantId === variantId
    );

    const updatedCart = existingItemIndex >= 0
      ? cart.map((item, index) =>
        index === existingItemIndex
          ? { ...item, quantity: item.quantity + quantity }
          : item
      )
      : [
        ...cart,
        {
          ...product,
          quantity,
          variantId,
          price: variantId
            ? product.variants.find(v => v._id === variantId)?.price
            : product.price,
          weight: variantId
            ? product.variants.find(v => v._id === variantId)?.weight
            : product.weight
        }
      ];

    setCart(updatedCart);
    toast.success("Item added to cart");

    if (user) {
      try {
        await axios.post(`${BACKEND_API}/api/cart`, {
          productId: product._id,
          variantId,
          quantity,
        }, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
      } catch (err) {
        console.error('❌ Failed to sync cart:', err);
        toast.error('Failed to sync cart with server');
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
    toast.success("Cart Cleared")
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