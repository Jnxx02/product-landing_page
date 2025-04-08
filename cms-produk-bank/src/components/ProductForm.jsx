import React, { useEffect, useState } from 'react';

export default function ProductForm({ onSubmit, product }) {
  const [form, setForm] = useState({
    type: 'produk',
    name: '',
    description: '',
    features: [''],
    link: ''
  });

  useEffect(() => {
    if (product) {
      setForm(product);
    }
  }, [product]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFeatureChange = (index, value) => {
    const updatedFeatures = [...form.features];
    updatedFeatures[index] = value;
    setForm({ ...form, features: updatedFeatures });
  };

  const addFeature = () => {
    setForm({ ...form, features: [...form.features, ''] });
  };

  const removeFeature = (index) => {
    const updatedFeatures = form.features.filter((_, i) => i !== index);
    setForm({ ...form, features: updatedFeatures });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
    setForm({
      type: 'produk',
      name: '',
      description: '',
      features: [''],
      link: ''
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow">
      <input
        type="text"
        name="name"
        placeholder="Nama Produk"
        value={form.name}
        onChange={handleChange}
        className="w-full p-2 border mb-2"
        required
      />
      <textarea
        name="description"
        placeholder="Deskripsi"
        value={form.description}
        onChange={handleChange}
        className="w-full p-2 border mb-2"
        required
      />
      <div>
        <label className="block mb-1 font-semibold">Fitur:</label>
        {form.features.map((feature, index) => (
          <div key={index} className="flex gap-2 mb-2">
            <input
              type="text"
              value={feature}
              onChange={(e) => handleFeatureChange(index, e.target.value)}
              className="flex-1 p-2 border"
              required
            />
            <button type="button" onClick={() => removeFeature(index)} className="text-red-600">✕</button>
          </div>
        ))}
        <button type="button" onClick={addFeature} className="text-blue-600 text-sm">+ Tambah Fitur</button>
      </div>
      <input
        type="text"
        name="link"
        placeholder="Link Produk"
        value={form.link}
        onChange={handleChange}
        className="w-full p-2 border my-2"
      />
      <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded">
        Simpan Produk
      </button>
    </form>
  );
}
