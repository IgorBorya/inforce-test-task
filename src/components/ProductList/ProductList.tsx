import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProducts } from "../../hooks/useProducts";
import Modal from "../Modal/Modal";
import AddNewProductForm from "../AddNewProductForm/AddNewProductForm";
import styles from "./ProductList.module.css";

const ProductList: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { products, createProduct, deleteProductHandler } = useProducts();
  const navigate = useNavigate();

  const toggleModalOpen = () => setIsModalOpen(!isModalOpen);

  return (
    <div className={styles.productList}>
      <h2>Products List</h2>
      <button className={styles.primaryButton} onClick={toggleModalOpen}>
        Add
      </button>
      <ul>
        {products.map((product) => (
          <li
            key={product.id}
            className={styles.productItem}
            onClick={() => navigate(`/products/${product.id}`)}
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
                e.stopPropagation(); // Prevent navigation on delete click
                deleteProductHandler(product.id);
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
        <AddNewProductForm
          onSubmit={(product) => {
            createProduct(product);
            toggleModalOpen();
          }}
        />
      </Modal>
    </div>
  );
};

export default ProductList;
