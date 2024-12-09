import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import styles from "./ProductDetails.module.css";

interface Product {
  id: number;
  name: string;
  imageUrl: string;
  count: number;
  size: { width: number; height: number };
  weight: string;
  comments: string[]; // Simplified for now
}

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Extract the product ID from the route
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/products/${id}`)
      .then((response) => setProduct(response.data))
      .catch((error) => console.error("Error fetching product:", error));
  }, [id]);

  if (!product) {
    return <p>Loading...</p>;
  }

  return (
    <div className={styles.productDetails}>
      <h2>
        <Link to={"/"}> List /</Link> {product.name}
      </h2>
      <img src={product.imageUrl} alt={product.name} />
      <p>Count: {product.count}</p>
      <p>
        Size: {product.size.width} x {product.size.height}
      </p>
      <p>Weight: {product.weight}</p>
      <h3>Comments</h3>
      <ul>
        {product.comments.map((comment, index) => (
          <li key={index}>{comment}</li>
        ))}
      </ul>
    </div>
  );
};

export default ProductDetails;
