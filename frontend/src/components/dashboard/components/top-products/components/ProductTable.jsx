import React from "react";
import { FaStar } from "react-icons/fa";

const ProductTable = ({ products }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white shadow-lg rounded-lg">
        <thead>
          <tr className="text-left border-b">
            <th className="p-4">Product</th>
            <th className="p-4">Sold amount</th>
            <th className="p-4">Unit price</th>
            <th className="p-4">Revenue</th>
            <th className="p-4">Rating</th>
          </tr>
        </thead>
        <tbody>
          {products.length === 0 ? (
            <tr>
              <td colSpan="5" className="p-4 text-center">
                No products available.
              </td>
            </tr>
          ) : (
            products.map((product, index) => (
              <tr key={index} className="border-b hover:bg-gray-100">
                <td className="p-4 flex items-center gap-4">
                  {/* <img
                    src={product.image || "placeholder.png"}
                    alt={product.product}
                    className="w-10 h-10 rounded-full"
                  /> */}
                  {product.product}
                </td>
                <td className="p-4">{product.sold_amount}</td>
                <td className="p-4">${product.unit_price.toFixed(2)}</td>
                <td className="p-4">${product.revenue.toLocaleString()}</td>
                <td className="p-4 flex items-center gap-1">
                  <FaStar className="text-yellow-400" />
                  <strong>{product.rating.toFixed(2)}</strong>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
