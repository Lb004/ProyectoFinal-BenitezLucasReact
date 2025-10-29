// src/components/CartItem/CartItem.jsx
import { useCart } from "../../context/CartContext";

const CartItem = ({ item }) => {
  const { removeFromCart } = useCart();

  return (
    <div
      style={{
        display: "flex",
        gap: "1rem",
        padding: "1rem",
        border: "1px solid #ddd",
        borderRadius: "8px",
        alignItems: "center",
      }}
    >
      <img
        src={item.img}
        alt={item.name}
        style={{ width: "100px", height: "100px", objectFit: "cover" }}
      />
      <div style={{ flex: 1 }}>
        <h3>{item.name}</h3>
        <p>Cantidad: {item.quantity}</p>
        <p>Precio unitario: ${item.price}</p>
        <p style={{ fontWeight: "bold", color: "#3498db" }}>
          Subtotal: ${item.price * item.quantity}
        </p>
      </div>
      <button
        onClick={() => removeFromCart(item.id)}
        style={{
          backgroundColor: "#e74c3c",
          color: "white",
          border: "none",
          padding: "10px 20px",
          cursor: "pointer",
          borderRadius: "4px",
        }}
      >
        Eliminar
      </button>
    </div>
  );
};

export default CartItem;
