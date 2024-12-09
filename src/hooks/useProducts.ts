import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../store/store";
import { setProducts, addProduct, deleteProduct } from "../store/productSlice";
import {
  fetchProducts,
  createProductApi,
  deleteProductApi,
} from "../api/apiService";
import { Product } from "../types/Product";

export const useProducts = () => {
  const dispatch = useDispatch<AppDispatch>();
  const products = useSelector((state: RootState) => state.products.products);

  useEffect(() => {
    fetchProducts()
      .then((response) => dispatch(setProducts(response.data)))
      .catch((error) => console.error("Error fetching products:", error));
  }, [dispatch]);

  const createProduct = async (product: Omit<Product, "id">) => {
    try {
      const response = await createProductApi(product);
      dispatch(addProduct(response.data));
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  const deleteProductHandler = async (id: number) => {
    try {
      await deleteProductApi(id);
      dispatch(deleteProduct(id));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return { products, createProduct, deleteProductHandler };
};
