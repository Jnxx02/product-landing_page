import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Wallet, Vault, CreditCard, BanknoteArrowUp } from "lucide-react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faYoutube, faTiktok } from '@fortawesome/free-brands-svg-icons';

export default function ProductInfoPage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  // Menu Produk
  const menuItems = [
    { icon: <Wallet className="w-5 h-5" />, label: "Tabungan", action: () => window.open('https://hasamitra.com/tabungan', '_blank') },
    { icon: <BanknoteArrowUp className="w-5 h-5" />, label: "Deposito", action: () => window.open('https://hasamitra.com/deposito', '_blank') },
    { icon: <CreditCard className="w-5 h-5" />, label: "Kredit", action: () => window.open('https://hasamitra.com/kredit', '_blank') },
    { icon: <Vault className="w-5 h-5" />, label: "E-Channel", action: () => window.open('https://hasamitra.com/e-channel', '_blank') },
  ];

  // Filter menu items based on search query
  const filteredMenuItems = menuItems.filter(item =>
    item.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col bg-[#e6fff5] font-sans">
      {/* Header */}
      <header className="text-white p-6 relative justify-center" style={{
        backgroundImage: "url('/BG.jpg')", // Ganti Background
        backgroundSize: "cover",
        backgroundPosition: "center",
        paddingBottom: "4rem"
      }}>
        <div className="mb-4 px-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Cari di sini..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full py-3 pl-5 pr-12 rounded-full text-[#006b4c] placeholder:text-[#006b4c] bg-white"
            />
            <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[#006b4c]" />
          </div>
        </div>
        <div className="flex-col flex items-center justify-center gap-4 mt-4 w-full">
          <img src="/hasamitra-logo.jpg" alt="Hasamitra Logo" className="h-30 w-auto" />
          <h1 className="text-4xl font-bold leading-tight text-center">Informasi Produk</h1>
        </div>
      </header>

      {/* Menu */}
      <div className="mt-[-40px] mx-6 bg-white rounded-2xl p-4 shadow-sm divide-y divide-[#006b4c]/20 relative z-10 mx-4">
        {filteredMenuItems.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between py-4 hover:bg-[#f4a261]/10 px-2 rounded-lg cursor-pointer"
            onClick={item.action}
          >
            <div className="flex items-center gap-3 text-[#006b4c]">
              {item.icon}
              <span className="text-base font-medium">{item.label}</span>
            </div>
            <span className="text-[#006b4c]">›</span>
          </div>
        ))}
      </div>

      {/* Back Button */}
      <div className="flex justify-left ml-6 mt-4">
        <button
          onClick={() => navigate(-1)}
          className="bg-[#006b4c] text-white py-2 px-4 rounded-lg shadow-md hover:bg-[#00543a]"
        >
          Kembali ke Halaman Utama
        </button>
      </div>

      {/* Spacer */}
      <div className="flex-grow h-10"></div>

      {/* Footer */}
      <footer className="bg-[#f0f0f0] text-[#333] text-sm py-8 mt-auto">
        <div className="container mx-auto px-4 text-left grid grid-cols-1 gap-8 md:grid-cols-3">
          <div>
            <h3 className="font-bold mb-2">Kantor Pusat</h3>
            <p>Jln. DR. Wahidin Sudirohusodo<br />
              Komp. Pusat Pertokoan No. 5 - 6<br />
              Ende, Wajo, Kota Makassar 90174<br />
              Sulawesi Selatan, Indonesia
            </p>
            <a href="https://hasamitra.com/lokasi" className="text-[#f4a261] hover:underline">Lokasi kantor lainnya →</a>
          </div>
          <div>
            <h3 className="font-bold mb-2">Hubungi Kami</h3>
            <p>
              <a href="tel:+624113652000" className="flex items-center gap-2 hover:underline">
                📞 Call Center (365 2000)
              </a>
              <a href="https://api.whatsapp.com/send?phone=6281371200097&text=Halo%20Hasamitra%20:)" className="flex items-center gap-2 hover:underline">
                💬 Mica (0813 7120 0097)
              </a>
              <a href="mailto:bpr@hasamitra.com" className="flex items-center gap-2 hover:underline">
                📧 bpr@hasamitra.com
              </a>
            </p>
          </div>
          <div>
            <h3 className="font-bold mb-2">Media Sosial</h3>
            <div className="flex gap-4">
              <a href="https://www.facebook.com/hasamitra" className="hover:underline">
                <FontAwesomeIcon icon={faFacebook} className="w-6 h-6" />
              </a>
              <a href="https://www.instagram.com/bankhasamitra/" className="hover:underline">
                <FontAwesomeIcon icon={faInstagram} className="w-6 h-6" />
              </a>
              <a href="https://www.youtube.com/@bprhasamitra" className="hover:underline">
                <FontAwesomeIcon icon={faYoutube} className="w-6 h-6" />
              </a>
              <a href="https://www.tiktok.com/@hasamitra" className="hover:underline">
                <FontAwesomeIcon icon={faTiktok} className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
        <hr className="my-4 border-t border-gray-300" />
        <div className="text-left text-xs text-gray-600 px-4">
          <p>BPR Hasamitra berizin dan diawasi oleh <strong>Otoritas Jasa Keuangan (OJK)</strong> dan merupakan peserta penjaminan <strong>Lembaga Penjamin Simpanan (LPS)</strong>.</p>
          <p className="mt-2">© 2005 - {new Date().getFullYear()} BPR Hasamitra All Rights Reserved</p>
        </div>
        <a
          href="https://api.whatsapp.com/send?phone=6281371200097&text=Halo%20Hasamitra%20:)"
          className="fixed bottom-6 right-6 bg-[#25D366] hover:bg-[#1ebe5b] text-white p-4 rounded-full shadow-lg"
          target="_blank"
          rel="noopener noreferrer"
          style={{ position: 'fixed', bottom: '1.5rem', right: '1.5rem' }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 32 32"
            className="w-6 h-6 fill-current"
          >
            <path d="M16.04 5.002c5.9 0 10.72 4.755 10.72 10.618 0 5.86-4.82 10.618-10.72 10.618a10.52 10.52 0 01-5.376-1.468L5 27l2.3-5.742A10.57 10.57 0 015.32 15.62c0-5.863 4.82-10.618 10.72-10.618zm0-2.002C8.42 3 2.64 8.758 2.64 15.62c0 2.4.722 4.63 1.95 6.48L2 31l8.182-2.954a13.13 13.13 0 005.858 1.384c7.62 0 13.4-5.758 13.4-12.62C29.44 8.758 23.66 3 16.04 3z" />
            <path d="M22.262 19.478l-2.906-.838a1.077 1.077 0 00-1.013.204l-.754.607a8.826 8.826 0 01-4.36-4.228l.64-.688c.27-.29.36-.71.23-1.09l-.956-2.893c-.24-.723-1.1-1.083-1.807-.81-.9.346-1.613 1.095-1.613 2.06 0 3.003 2.47 6.67 5.592 8.246 1.54.77 2.82.9 3.882.9.97 0 1.84-.35 2.357-1.146.44-.67.103-1.558-.293-1.324z" />
          </svg>
        </a>
      </footer>
    </div>
  );
}