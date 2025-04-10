import React from 'react';


export default function ProductList({ products, onEdit, onDelete }) {
  return (
    <div className="mt-6">
      {products.length === 0 ? (
        <p className="text-gray-500">Belum ada produk.</p>
      ) : (
        <ul className="space-y-4">
          {products.map((product, index) => (
            <li key={index} className="p-4 border rounded shadow">
              <h3 className="font-bold text-lg">{product.name}</h3>
              <p>{product.description}</p>
              <ul className="list-disc ml-5 my-2">
                {product.features.map((f, i) => (
                  <li key={i}>{f}</li>
                ))}
              </ul>
              <p className="text-blue-600 text-sm"><a href={product.link}>Lihat produk</a></p>
              <div className="mt-2 space-x-2">
                <button onClick={() => onEdit(index)} className="text-yellow-600">Edit</button>
                <button onClick={() => onDelete(index)} className="text-red-600">Hapus</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
