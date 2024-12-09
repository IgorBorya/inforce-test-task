import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../store/store";
import { setProducts, deleteProduct } from "../../store/productSlice";
import axios from "axios";
import styles from "./ProductList.module.css";

const ProductList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const products = useSelector((state: RootState) => state.products.products);

  useEffect(() => {
    // Завантажуємо продукти з сервера
    axios.get("http://localhost:3001/products").then((response) => {
      dispatch(setProducts(response.data));
    });
  }, [dispatch]);

  const handleDelete = (id: number) => {
    // Видалення продукту
    axios.delete(`http://localhost:3001/products/${id}`).then(() => {
      dispatch(deleteProduct(id));
    });
  };

  return (
    <div className={styles.productList}>
      <h2>Products List</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id} className={styles.productItem}>
            <img
              src={product.imageUrl}
              alt={product.name}
              width="50"
              height="50"
            />
            <div>
              <strong>{product.name}</strong>
              <p>Count: {product.count}</p>
            </div>
            <button
              className={styles.deleteButton}
              onClick={() => handleDelete(product.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
