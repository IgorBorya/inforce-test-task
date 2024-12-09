import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../store/store";
import {
  setProducts,
  deleteProduct,
  addProduct,
} from "../../store/productSlice";
import axios from "axios";
import styles from "./ProductList.module.css";
import Modal from "../Modal/modal";
import AddNewProductForm from "../AddNewProductForm/AddNewProductForm";
import { useNavigate } from "react-router-dom";

const ProductList: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [newProduct, setNewProduct] = useState();

  const navigate = useNavigate();

  const toggleModalOpen = () => setIsModalOpen(!isModalOpen);

  const dispatch = useDispatch<AppDispatch>();
  const products = useSelector((state: RootState) => state.products.products);

  useEffect(() => {
    // Завантажуємо продукти з сервера
    axios.get("http://localhost:3001/products").then((response) => {
      dispatch(setProducts(response.data));
    });
  }, [dispatch]);

  const navigateToDetails = (id: number) => navigate(`products/${id}`);

  const createProduct = (product) => {
    axios.post(`http://localhost:3001/products`, product).then((response) => {
      console.log(response.data);
      dispatch(addProduct(response.data));
      toggleModalOpen();
    });
  };

  const handleDelete = (id: number) => {
    // Видалення продукту
    axios.delete(`http://localhost:3001/products/${id}`).then(() => {
      dispatch(deleteProduct(id));
    });
  };

  return (
    <div className={styles.productList}>
      <h2>Products List</h2>
      <button
        className={styles.primaryButton}
        onClick={() => toggleModalOpen()}
      >
        Add
      </button>
      <ul>
        {products.map((product) => (
          <li
            key={product.id}
            className={styles.productItem}
            onClick={() => navigateToDetails(product.id)}
          >
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
              onClick={(e) => {
                e.preventDefault();
                handleDelete(product.id);
              }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
      <Modal
        isOpen={isModalOpen}
        onClose={toggleModalOpen}
        title="Add New Product"
      >
        <AddNewProductForm onSubmit={createProduct} />
      </Modal>
    </div>
  );
};

export default ProductList;
