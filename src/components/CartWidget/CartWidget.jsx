import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";

const CartWidget = () => {
  const { getTotalQuantity } = useCart();
  const totalQuantity = getTotalQuantity();

  return (
    <Link
      to="/cart"
      style={{ color: "white", textDecoration: "none", position: "relative" }}
    >
      <span style={{ fontSize: "24px" }}>🛒</span>
      {totalQuantity > 0 && (
        <span
          style={{
            backgroundColor: "red",
            color: "white",
            borderRadius: "50%",
            padding: "2px 8px",
            fontSize: "12px",
            position: "absolute",
            top: "-8px",
            right: "-8px",
          }}
        >
          {totalQuantity}
        </span>
      )}
    </Link>
  );
};

export default CartWidget;
