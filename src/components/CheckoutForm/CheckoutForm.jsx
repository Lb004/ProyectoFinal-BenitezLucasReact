// src/components/CheckoutForm/CheckoutForm.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, addDoc, writeBatch, doc } from "firebase/firestore";
import { db } from "../../services/firebase";
import { useCart } from "../../context/CartContext";

const CheckoutForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [orderId, setOrderId] = useState(null);
  const [loading, setLoading] = useState(false);
  const { cart, getTotalPrice, clearCart } = useCart();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Crear objeto de orden
      const order = {
        buyer: formData,
        items: cart,
        total: getTotalPrice(),
        date: new Date(),
      };

      // Guardar orden en Firestore
      const orderRef = await addDoc(collection(db, "orders"), order);

      // Actualizar stock de productos
      const batch = writeBatch(db);
      cart.forEach((item) => {
        const productRef = doc(db, "products", item.id);
        batch.update(productRef, {
          stock: item.stock - item.quantity,
        });
      });
      await batch.commit();

      // Guardar ID de orden y limpiar carrito
      setOrderId(orderRef.id);
      clearCart();
    } catch (error) {
      console.error("Error al crear la orden:", error);
      alert("Hubo un error al procesar tu compra");
    } finally {
      setLoading(false);
    }
  };

  // Si no hay productos en el carrito
  if (cart.length === 0 && !orderId) {
    return (
      <div style={{ textAlign: "center", padding: "4rem" }}>
        <h2>Tu carrito está vacío</h2>
        <button
          onClick={() => navigate("/")}
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
      </div>
    );
  }

  // Si la compra fue exitosa
  if (orderId) {
    return (
      <div style={{ textAlign: "center", padding: "4rem" }}>
        <h2>¡Compra realizada con éxito!</h2>
        <p style={{ margin: "2rem 0", fontSize: "1.2rem" }}>
          Tu número de orden es: <strong>{orderId}</strong>
        </p>
        <button
          onClick={() => navigate("/")}
          style={{
            backgroundColor: "#3498db",
            color: "white",
            border: "none",
            padding: "10px 20px",
            cursor: "pointer",
            borderRadius: "4px",
          }}
        >
          Volver al inicio
        </button>
      </div>
    );
  }

  // Formulario
  return (
    <div style={{ maxWidth: "500px", margin: "2rem auto", padding: "2rem" }}>
      <h2>Finalizar Compra</h2>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          marginTop: "2rem",
        }}
      >
        <input
          type="text"
          name="name"
          placeholder="Nombre completo"
          value={formData.name}
          onChange={handleChange}
          required
          style={{ padding: "10px", fontSize: "1rem" }}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          style={{ padding: "10px", fontSize: "1rem" }}
        />
        <input
          type="tel"
          name="phone"
          placeholder="Teléfono"
          value={formData.phone}
          onChange={handleChange}
          required
          style={{ padding: "10px", fontSize: "1rem" }}
        />
        <button
          type="submit"
          disabled={loading}
          style={{
            backgroundColor: loading ? "#95a5a6" : "#27ae60",
            color: "white",
            border: "none",
            padding: "12px",
            cursor: loading ? "not-allowed" : "pointer",
            borderRadius: "4px",
            fontSize: "1rem",
            fontWeight: "bold",
          }}
        >
          {loading ? "Procesando..." : "Confirmar compra"}
        </button>
      </form>
    </div>
  );
};

export default CheckoutForm;
