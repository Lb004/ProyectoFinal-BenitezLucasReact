import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../services/firebase";
import ItemDetail from "../ItemDetail/ItemDetail";

const ItemDetailContainer = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { itemId } = useParams();

  useEffect(() => {
    setLoading(true);

    // Referencia al documento específico
    const docRef = doc(db, "products", itemId);

    getDoc(docRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          setProduct({ id: snapshot.id, ...snapshot.data() });
        }
      })
      .catch((error) => console.error("Error:", error))
      .finally(() => setLoading(false));
  }, [itemId]);

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "2rem" }}>Cargando...</div>
    );
  }

  if (!product) {
    return (
      <div style={{ textAlign: "center", padding: "2rem" }}>
        Producto no encontrado
      </div>
    );
  }

  return <ItemDetail product={product} />;
};

export default ItemDetailContainer;
