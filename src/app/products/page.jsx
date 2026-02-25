"use client";

import React, { useEffect, useState } from "react";
import ProductCard from "../Components/ProductCard";
// import ProductCard from "@/components/product/ProductCard";

export default function Page() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("/Data/product.json")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  return (
    <div className="min-h-screen px-6 py-12">
      <h1 className="text-4xl font-bold text-center mb-10">
        Our Furniture Collection
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {products.map((item) => (
          <ProductCard key={item.id} product={item} />
        ))}
      </div>
    </div>
  );
}
