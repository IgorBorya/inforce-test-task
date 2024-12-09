import React, { FC, FormEvent, useState } from "react";
import styles from "./AddNewProductForm.module.css";

interface Product {
  id: number;
  name: string;
  weight: string;
  imageUrl: string;
  count: number;
  size: {
    width: number;
    height: number;
  };
  comments: string[];
}

interface AddNewProductFormProps {
  onSubmit: (product: Product) => void;
  formValues?: Partial<Product>;
}

const AddNewProductForm: FC<AddNewProductFormProps> = ({
  onSubmit,
  formValues,
}) => {
  const [newProduct, setNewProduct] = useState({
    imageUrl: "https://via.placeholder.com/150",
    name: "Product A",
    count: 4,
    size: {
      width: 200,
      height: 200,
    },
    weight: "200g",
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(newProduct);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.formWrapper}>
      {/* Inputs for product details */}
      <label>
        Name:
        <input
          type="text"
          value={newProduct.name}
          onChange={(e) =>
            setNewProduct({ ...newProduct, name: e.target.value })
          }
          required
        />
      </label>
      <label>
        Image URL:
        <input
          type="text"
          value={newProduct?.imageUrl ?? ""}
          onChange={(e) =>
            setNewProduct({ ...newProduct, imageUrl: e.target.value })
          }
          required
        />
      </label>
      <label>
        Count:
        <input
          type="number"
          value={newProduct.count}
          onChange={(e) =>
            setNewProduct({
              ...newProduct,
              count: parseInt(e.target.value, 10),
            })
          }
          required
        />
      </label>
      <label>
        Size (Width x Height):
        <input
          type="number"
          placeholder="Width"
          value={newProduct?.size?.width ?? 0}
          onChange={(e) =>
            setNewProduct({
              ...newProduct,
              size: { ...newProduct.size, width: parseInt(e.target.value) },
            })
          }
          required
        />
        <input
          type="number"
          placeholder="Height"
          value={newProduct?.size?.height ?? 0}
          onChange={(e) =>
            setNewProduct({
              ...newProduct,
              size: { ...newProduct.size, height: parseInt(e.target.value) },
            })
          }
          required
        />
      </label>
      <label>
        Weight:
        <input
          type="text"
          value={newProduct.weight}
          onChange={(e) =>
            setNewProduct({ ...newProduct, weight: e.target.value })
          }
          required
        />
      </label>
      <button className={styles.submitButton} onClick={onSubmit}>
        Submit
      </button>
    </form>
  );
};

export default AddNewProductForm;
