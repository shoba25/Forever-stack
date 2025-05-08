import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from "axios";
import { ShopContext } from "../context/ShopContext";


const Compare = () => {
  const { productId } = useParams();
  const {products,backendUrl,currency} = useContext(ShopContext);

  const [localProduct, setLocalProduct] = useState(null);
  const [flipkartProduct, setFlipkartProduct] = useState(null);


  useEffect(() => {
    
    const product = products.find(p => p._id === productId);
    setLocalProduct(product);
    
    if (!product) return;

    const fetchFlipkartData = async () => {
      try {
        const res = await axios(`${backendUrl}/api/product/compare/flipkart?query=${encodeURIComponent(product.name)}`);
        setFlipkartProduct(res.data);
      } catch (err) {
        console.error('Error fetching Flipkart data', err);
      }
    };

    fetchFlipkartData();
  }, [productId,products,backendUrl]);

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-8">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Product Comparison</h2>
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-blue-100 text-gray-700">
              <th className="border border-gray-300 px-4 py-2 text-left">Feature</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Our Site</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Flipkart</th>
            </tr>
          </thead>
          <tbody>
            <tr className="odd:bg-white even:bg-gray-50">
              <td className="border px-4 py-3 font-medium">Name</td>
              <td className="border px-4 py-3">{localProduct?.name}</td>
              <td className="border px-4 py-3">{localProduct?.name || 'Loading...'}</td>
            </tr>
            <tr className="odd:bg-white even:bg-gray-50">
              <td className="border px-4 py-3 font-medium">Price</td>
              <td className="border px-4 py-3">{currency  }{localProduct?.price}</td>
              <td className="border px-4 py-3">{flipkartProduct?.price || 'Loading...'}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Compare;
