import React, { useState, useRef } from 'react';
import ProductForm from './components/ProductForm';
import ProductList from './components/ProductList';
import './index.css';

export default function MainApp() {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const fileInputRef = useRef(null);

  const addProduct = (product) => {
    if (editingProduct !== null) {
      const updated = products.map((p, i) =>
        i === editingProduct ? product : p
      );
      setProducts(updated);
      setEditingProduct(null);
    } else {
      setProducts([...products, product]);
    }
  };

  const deleteProduct = (index) => {
    const confirmed = window.confirm("Are you sure you want to delete this product?");
    if (confirmed) {
      setProducts(products.filter((_, i) => i !== index));
    }
  };

  const editProduct = (index) => {
    setEditingProduct(index);
  };

  const downloadJSON = () => {
    const dataStr = JSON.stringify(products, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download = 'products.json';
    link.href = url;
    link.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const json = JSON.parse(e.target.result);
          if (Array.isArray(json)) {
            setProducts(json);
          } else {
            console.error("JSON is not an array");
            alert("Invalid JSON format: Expected an array of products.");
          }
        } catch (error) {
          console.error("Invalid JSON file", error);
          alert("Failed to parse JSON file. Please check the file format.");
        }
      };
      reader.readAsText(file);
    }
  };

  const clearProducts = () => {
    const confirmed = window.confirm("Are you sure you want to clear all imported data?");
    if (confirmed) {
      setProducts([]);
      if (fileInputRef.current) {
        fileInputRef.current.value = null; // Reset the file input
      }
    }
  };

  console.log("addProduct function:", addProduct);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <ProductForm onSubmit={addProduct} product={products[editingProduct]} />
        <ProductList
          products={products}
          onEdit={editProduct}
          onDelete={deleteProduct}
        />
        <div className="mt-4 flex justify-between">
          <button onClick={downloadJSON} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Download JSON
          </button>
          <input type="file" ref={fileInputRef} onChange={handleFileChange} className="border p-2" />
          <button onClick={clearProducts} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
            Clear Products
          </button>
        </div>
      </div>
    </div>
  );
}
