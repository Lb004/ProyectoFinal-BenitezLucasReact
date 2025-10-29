import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../services/firebase";
import ItemList from "../ItemList/ItemList";

const ItemListContainer = ({ greeting }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { categoryId } = useParams();

  useEffect(() => {
    setLoading(true);

    // Referencia a la colección de productos
    const productsRef = collection(db, "products");

    // Si hay categoría, filtrar. Si no, traer todos
    const q = categoryId
      ? query(productsRef, where("category", "==", categoryId))
      : productsRef;

    // Obtener los documentos
    getDocs(q)
      .then((snapshot) => {
        const productsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(productsData);
      })
      .catch((error) => console.error("Error:", error))
      .finally(() => setLoading(false));
  }, [categoryId]);

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "2rem" }}>Cargando...</div>
    );
  }

  if (products.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: "2rem" }}>
        No hay productos disponibles
      </div>
    );
  }

  return (
    <div>
      <h2 style={{ textAlign: "center", padding: "2rem" }}>{greeting}</h2>
      <ItemList products={products} />
    </div>
  );
};

export default ItemListContainer;
