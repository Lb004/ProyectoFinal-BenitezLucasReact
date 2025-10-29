import { useState } from "react";

const ItemCount = ({ stock, initial = 1, onAdd }) => {
  const [count, setCount] = useState(initial);

  const handleIncrement = () => {
    if (count < stock) {
      setCount(count + 1);
    }
  };

  const handleDecrement = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        maxWidth: "200px",
      }}
    >
      {/* Controles de cantidad */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          border: "1px solid #ccc",
          padding: "5px",
        }}
      >
        <button onClick={handleDecrement} disabled={count === 1}>
          -
        </button>
        <span>{count}</span>
        <button onClick={handleIncrement} disabled={count === stock}>
          +
        </button>
      </div>

      {/* Botón agregar al carrito */}
      <button
        onClick={() => onAdd(count)}
        disabled={stock === 0}
        style={{
          backgroundColor: stock === 0 ? "#ccc" : "#27ae60",
          color: "white",
          border: "none",
          padding: "10px",
          cursor: stock === 0 ? "not-allowed" : "pointer",
        }}
      >
        {stock === 0 ? "Sin stock" : "Agregar al carrito"}
      </button>
    </div>
  );
};

export default ItemCount;
