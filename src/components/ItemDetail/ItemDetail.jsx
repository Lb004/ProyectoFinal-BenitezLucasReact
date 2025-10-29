import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import ItemCount from "../ItemCount/ItemCount";

const ItemDetail = ({ product }) => {
  const [quantityAdded, setQuantityAdded] = useState(0);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleOnAdd = (quantity) => {
    addToCart(product, quantity);
    setQuantityAdded(quantity);
  };

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "2rem",
        maxWidth: "1000px",
        margin: "2rem auto",
        padding: "2rem",
      }}
    >
      <img
        src={product.img}
        alt={product.name}
        style={{ width: "100%", height: "400px", objectFit: "cover" }}
      />

      <div>
        <h2>{product.name}</h2>
        <p style={{ color: "#7f8c8d", margin: "1rem 0" }}>
          {product.description}
        </p>
        <p style={{ fontSize: "2rem", color: "#3498db", fontWeight: "bold" }}>
          ${product.price}
        </p>
        <p style={{ color: product.stock > 0 ? "#27ae60" : "#e74c3c" }}>
          Stock: {product.stock}
        </p>

        {/* Mostrar ItemCount SOLO si aún no agregó al carrito */}
        {quantityAdded === 0 ? (
          <ItemCount stock={product.stock} onAdd={handleOnAdd} />
        ) : (
          <div style={{ marginTop: "1rem" }}>
            <p style={{ color: "#27ae60", marginBottom: "1rem" }}>
              ✅ Producto agregado al carrito
            </p>
            <button
              onClick={() => navigate("/cart")}
              style={{
                backgroundColor: "#3498db",
                color: "white",
                border: "none",
                padding: "10px 20px",
                cursor: "pointer",
                marginRight: "10px",
              }}
            >
              Ir al carrito
            </button>
            <button
              onClick={() => navigate("/")}
              style={{
                backgroundColor: "#95a5a6",
                color: "white",
                border: "none",
                padding: "10px 20px",
                cursor: "pointer",
              }}
            >
              Seguir comprando
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ItemDetail;
