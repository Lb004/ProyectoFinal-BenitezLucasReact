import { createContext, useState, useContext } from "react";

// 1. Crear el contexto
const CartContext = createContext();

// 2. Hook personalizado para usar el contexto fácilmente
export const useCart = () => {
  return useContext(CartContext);
};

// 3. Provider que envuelve toda la app
export const CartProvider = ({ children }) => {
  // Estado: array con los productos del carrito
  const [cart, setCart] = useState([]);

  // Función: Agregar producto al carrito
  const addToCart = (product, quantity) => {
    // Verificar si el producto ya está en el carrito
    const existingProduct = cart.find((item) => item.id === product.id);

    if (existingProduct) {
      // Si ya existe, aumentar la cantidad
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      );
    } else {
      // Si no existe, agregarlo
      setCart([...cart, { ...product, quantity }]);
    }
  };

  // Función: Remover producto del carrito
  const removeFromCart = (productId) => {
    setCart(cart.filter((item) => item.id !== productId));
  };

  // Función: Limpiar todo el carrito
  const clearCart = () => {
    setCart([]);
  };

  // Función: Obtener cantidad total de productos
  const getTotalQuantity = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  // Función: Obtener precio total
  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  // Función: Verificar si un producto está en el carrito
  const isInCart = (productId) => {
    return cart.some((item) => item.id === productId);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        getTotalQuantity,
        getTotalPrice,
        isInCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
