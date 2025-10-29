import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import NavBar from "./components/NavBar/NavBar";
import ItemListContainer from "./components/ItemListContainer/ItemListContainer";
import ItemDetailContainer from "./components/ItemDetailContainer/ItemDetailContainer";
import Cart from "./components/Cart/Cart";
import CheckoutForm from "./components/CheckoutForm/CheckoutForm";

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <NavBar />
        <Routes>
          {/* Ruta principal - todos los productos */}
          <Route
            path="/"
            element={<ItemListContainer greeting="Todos los productos" />}
          />

          {/* Ruta para categorías */}
          <Route
            path="/category/:categoryId"
            element={<ItemListContainer greeting="Productos por categoría" />}
          />

          {/* Ruta para detalle de producto */}
          <Route path="/item/:itemId" element={<ItemDetailContainer />} />

          {/* Ruta para el carrito */}
          <Route path="/cart" element={<Cart />} />

          {/* Ruta para checkout */}
          <Route path="/checkout" element={<CheckoutForm />} />
        </Routes>
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;
