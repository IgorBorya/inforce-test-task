import axios from "axios";
import { Product } from "../types/Product";

const BASE_URL = "http://localhost:3001/products";

export const fetchProducts = () => axios.get<Product[]>(BASE_URL);

export const createProductApi = (product: Omit<Product, "id">) =>
  axios.post<Product>(BASE_URL, product);

export const deleteProductApi = (id: number) =>
  axios.delete(`${BASE_URL}/${id}`);
