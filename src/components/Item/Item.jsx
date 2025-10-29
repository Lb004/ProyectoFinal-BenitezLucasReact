import { Link } from "react-router-dom";

const Item = ({ product }) => {
  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: "8px",
        padding: "1rem",
        textAlign: "center",
      }}
    >
      <img
        src={product.img}
        alt={product.name}
        style={{ width: "100%", height: "200px", objectFit: "cover" }}
      />
      <h3>{product.name}</h3>
      <p style={{ color: "#3498db", fontSize: "1.5rem", fontWeight: "bold" }}>
        ${product.price}
      </p>
      <p style={{ color: "#7f8c8d" }}>Stock: {product.stock}</p>
      <Link to={`/item/${product.id}`}>
        <button
          style={{
            backgroundColor: "#3498db",
            color: "white",
            border: "none",
            padding: "10px 20px",
            cursor: "pointer",
            borderRadius: "4px",
          }}
        >
          Ver detalle
        </button>
      </Link>
    </div>
  );
};

export default Item;
