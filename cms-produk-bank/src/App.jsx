import React, { useState, useRef } from 'react';
import ProductForm from './components/ProductForm';
import ProductList from './components/ProdcutList';

export default function App() {
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
    setProducts(products.filter((_, i) => i !== index));
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

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">CMS Produk Bank Hasamitra</h1>
      <div className="flex space-x-4">
        <div className="w-1/2">
          <ProductForm onSubmit={addProduct} product={products[editingProduct]} />
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload Existing JSON File
            </label>
            <input
              type="file"
              accept=".json"
              onChange={handleFileChange}
              ref={fileInputRef}
              className="block w-full text-sm text-gray-500
                         file:mr-4 file:py-2 file:px-4
                         file:rounded-full file:border-0
                         file:text-sm file:font-semibold
                         file:bg-blue-600 file:text-white
                         hover:file:bg-blue-700"
            />
            <p className="mt-1 text-sm text-gray-500">
              Choose a JSON file to update the product list.
            </p>
          </div>
          <button
            onClick={downloadJSON}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
          >
            Download JSON
          </button>
          <button
            onClick={clearProducts}
            className="mt-4 ml-2 px-4 py-2 bg-red-600 text-white rounded"
          >
            Clear Imported Data
          </button>
        </div>
        <div className="w-1/2 overflow-y-auto" style={{ maxHeight: '400px' }}>
          <ProductList
            products={products}
            onEdit={editProduct}
            onDelete={deleteProduct}
          />
        </div>
      </div>
    </div>
  );
}
