export interface Product {
  id: number;
  name: string;
  imageUrl: string;
  count: number;
  size: { width: number; height: number };
  weight: string;
}
