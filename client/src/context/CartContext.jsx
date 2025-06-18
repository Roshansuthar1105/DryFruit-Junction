// src/context/CartContext.jsx
import { createContext, useContext, useState, useEffect } from 'react'
import { useAuth } from './AuthContext';

const CartContext = createContext()

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([])
  const { user } = useAuth();
  // Load cart from localStorage on initial render
  useEffect(() => {
    const savedCart = localStorage.getItem('sweetDelightsCart')
    if (savedCart) {
      setCart(JSON.parse(savedCart))
    }
  }, [])
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/cart', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setCart(response.data.items || []);
      } catch (error) {
        console.error('Failed to fetch cart:', error);
      }
    };
  
    if (user) {
      fetchCart();
    } else {
      // Load from localStorage for guest users
      const savedCart = localStorage.getItem('sweetDelightsCart');
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
    }
  }, [user]);
  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('sweetDelightsCart', JSON.stringify(cart))
  }, [cart])

  const addToCart = async (product, quantity = 1) => {
    if (user) {
      try {
        await axios.post('http://localhost:5000/api/cart', { productId: product.id, quantity });
      } catch (error) {
        console.error('Failed to add to cart:', error);
      }
    }
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id)
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      }
      return [...prevCart, { ...product, quantity }]
    })
  }

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(productId)
      return
    }
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    )
  }

  const removeFromCart = productId => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId))
  }

  const clearCart = () => {
    setCart([])
  }

  const cartTotal = cart.reduce(
    (total, item) => total + parseFloat(item.price.replace('$', '')) * item.quantity,
    0
  )

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        cartTotal,
        cartCount: cart.reduce((count, item) => count + item.quantity, 0),
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)