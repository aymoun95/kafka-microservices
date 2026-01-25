import { useEffect, useState } from "react";
import { API_BASE_URLS } from "../constants";

interface Product {
  id: string;
  title: string;
  price: number;
}

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(API_BASE_URLS.PRODUCTS);
        const data = await res.json();
        setProducts(data);
      } catch (e) {
        console.error("Fetch products failed", e);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return { products, isLoading };
};
