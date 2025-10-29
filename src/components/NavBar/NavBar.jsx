import { Link } from "react-router-dom";
import CartWidget from "../CartWidget/CartWidget";

const NavBar = () => {
  return (
    <nav
      style={{
        backgroundColor: "#2c3e50",
        padding: "1rem 2rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      {/* Logo/Marca */}
      <Link to="/" style={{ color: "white", textDecoration: "none" }}>
        <h1>MiTienda</h1>
      </Link>

      {/* Links de navegación */}
      <div style={{ display: "flex", gap: "2rem" }}>
        <Link to="/" style={{ color: "white", textDecoration: "none" }}>
          Inicio
        </Link>
        <Link
          to="/category/electronics"
          style={{ color: "white", textDecoration: "none" }}
        >
          Electrónica
        </Link>
        <Link
          to="/category/clothing"
          style={{ color: "white", textDecoration: "none" }}
        >
          Ropa
        </Link>
        <Link
          to="/category/books"
          style={{ color: "white", textDecoration: "none" }}
        >
          Libros
        </Link>
      </div>

      {/* Carrito */}
      <CartWidget />
    </nav>
  );
};

export default NavBar;
