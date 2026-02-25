"use client";

import React, { useState, useRef } from "react";

export default function ProductCard({ product }) {
  const [showModel, setShowModel] = useState(false);
  const modelRef = useRef(null);

  const openAR = () => {
    if (modelRef.current) {
      modelRef.current.activateAR();
    }
  };

  return (
    <div className="group relative bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500">
      {/* Image */}
      <div className="relative overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-64 object-cover transform group-hover:scale-110 transition duration-700"
        />

        {/* Desktop View 3D Button */}
        <button
          onClick={() => setShowModel(true)}
          className="hidden md:block absolute bottom-4 left-1/2 -translate-x-1/2 bg-black text-white px-6 py-2 rounded-full text-sm opacity-0 group-hover:opacity-100 transition"
        >
          View in 3D
        </button>

        {/* 📱 Mobile Camera Button */}
        <button
          onClick={openAR}
          className="md:hidden absolute bottom-4 right-4 bg-black text-white p-3 rounded-full shadow-lg"
        >
          📷
        </button>
      </div>

      {/* Info */}
      <div className="p-6 space-y-2">
        <h2 className="text-xl font-semibold text-gray-900">{product.name}</h2>

        <p className="text-gray-600 text-sm">Color: {product.color}</p>

        <p className="text-gray-600 text-sm">Size: {product.size}</p>

        <p className="text-2xl font-bold text-gray-900 mt-2">
          ${product.price}
        </p>

        <button className="w-full mt-4 bg-black text-white py-3 rounded-xl hover:bg-gray-800 transition">
          Add to Cart
        </button>
      </div>

      {/* Hidden model-viewer for AR */}
      <model-viewer
        ref={modelRef}
        src={product.model}
        alt={product.name}
        ar
        ar-modes="scene-viewer webxr quick-look"
        camera-controls
        style={{ display: "none" }}
      ></model-viewer>

      {/* Desktop 3D Modal */}
      {showModel && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="relative w-[90%] md:w-[600px] bg-white rounded-2xl p-4">
            <button
              onClick={() => setShowModel(false)}
              className="absolute top-3 right-3 text-black text-lg"
            >
              ✕
            </button>

            <model-viewer
              src={product.model}
              alt={product.name}
              auto-rotate
              camera-controls
              ar
              ar-modes="scene-viewer webxr quick-look"
              style={{ width: "100%", height: "400px" }}
            ></model-viewer>
          </div>
        </div>
      )}
    </div>
  );
}
