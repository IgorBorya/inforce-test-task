import React, { useState } from "react";
import { Product } from "../../types/Product";
import styles from "../AddNewProductForm/AddNewProductForm.module.css";

interface AddNewProductFormProps {
  onSubmit: (product: Omit<Product, "id">) => void;
}

const AddNewProductForm: React.FC<AddNewProductFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<Omit<Product, "id">>({
    name: "",
    imageUrl: "",
    count: 0,
    size: { width: 0, height: 0 },
    weight: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.wrapper}>
      <label className={styles.title}>
        Name:
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </label>
      <label className={styles.title}>
        Image URL:
        <input
          type="text"
          name="imageUrl"
          value={formData.imageUrl}
          onChange={handleChange}
          required
        />
      </label>
      <label className={styles.title}>
        Count:
        <input
          type="number"
          name="count"
          value={formData.count}
          onChange={handleChange}
          required
        />
      </label>
      <label className={styles.title}>
        Size (Width x Height):
        <input
          type="number"
          name="width"
          value={formData.size.width}
          onChange={(e) =>
            setFormData({
              ...formData,
              size: { ...formData.size, width: parseInt(e.target.value) },
            })
          }
          required
        />
        <input
          type="number"
          name="height"
          value={formData.size.height}
          onChange={(e) =>
            setFormData({
              ...formData,
              size: { ...formData.size, height: parseInt(e.target.value) },
            })
          }
          required
        />
      </label>
      <label className={styles.title}>
        Weight:
        <input
          type="text"
          name="weight"
          value={formData.weight}
          onChange={handleChange}
          required
        />
      </label>
      <button type="submit" className={styles.btn}>
        Add Product
      </button>
    </form>
  );
};

export default AddNewProductForm;
