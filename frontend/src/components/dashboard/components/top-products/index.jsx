import React, { useEffect, useState } from "react";
import ProductTable from "./components/ProductTable";
import CustomButton from "../../../CustomButton";
import axios from "axios";

const TopProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch product data from the backend
  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/products");
      setProducts(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div id="top-products" className="w-full h-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-bold text-xl text-stone-600">Top Products</h2>
        <CustomButton>Full results</CustomButton>
      </div>

      {loading ? (
        <p>Loading products...</p>
      ) : (
        <ProductTable products={products} />
      )}
    </div>
  );
};

export default TopProducts;
