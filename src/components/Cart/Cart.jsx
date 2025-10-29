// src/components/Cart/Cart.jsx
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import CartItem from "../CartItem/CartItem";

const Cart = () => {
  const { cart, clearCart, getTotalPrice } = useCart();

  if (cart.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: "4rem" }}>
        <h2>Tu carrito está vacío</h2>
        <Link to="/">
          <button
            style={{
              marginTop: "1rem",
              backgroundColor: "#3498db",
              color: "white",
              border: "none",
              padding: "10px 20px",
              cursor: "pointer",
              borderRadius: "4px",
            }}
          >
            Ver productos
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "900px", margin: "2rem auto", padding: "2rem" }}>
      <h2>Tu Carrito</h2>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          margin: "2rem 0",
        }}
      >
        {cart.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </div>

      <div
        style={{
          backgroundColor: "#ecf0f1",
          padding: "1.5rem",
          borderRadius: "8px",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        <h3 style={{ textAlign: "right", color: "#3498db" }}>
          Total: ${getTotalPrice()}
        </h3>
        <button
          onClick={clearCart}
          style={{
            backgroundColor: "#95a5a6",
            color: "white",
            border: "none",
            padding: "10px 20px",
            cursor: "pointer",
            borderRadius: "4px",
          }}
        >
          Vaciar carrito
        </button>
        <Link to="/checkout">
          <button
            style={{
              width: "100%",
              backgroundColor: "#27ae60",
              color: "white",
              border: "none",
              padding: "10px 20px",
              cursor: "pointer",
              borderRadius: "4px",
            }}
          >
            Finalizar compra
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Cart;
