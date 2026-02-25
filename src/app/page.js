"use client";

import React from "react";
import Furniture3D from "./Components/Furniture3D";

export default function page() {
  return (
    <div>
      <main className="relative w-full min-h-screen overflow-hidden">
        {/* Hero Section */}
        <section className="relative z-10 flex flex-col-reverse md:flex-row items-center justify-between px-6 md:px-20 pt-5 md:pt-32">
          {/* Text Content */}
          <div className="max-w-xl text-center md:text-left space-y-6">
            <h1 className="text-5xl md:text-6xl font-bold text-accent leading-tight">
              Premium Furniture for Your Home
            </h1>
            <p className="text-content text-lg md:text-xl">
              Discover high-quality tables, chairs & beds. Designed to bring
              style and comfort to every room.
            </p>
            <div className="flex justify-center md:justify-start gap-4">
              <button className="btn btn-accent">Shop Now</button>
              <button className="btn btn-outline btn-info">
                Explore Collection
              </button>
            </div>
          </div>

          {/* 3D Model */}
          <div className="w-full md:w-1/2 h-96 md:h-[500px] mt-2 md:mt-0">
            <Furniture3D />
          </div>
        </section>

        {/* Decorative floating shapes */}
        <div className="absolute top-0 left-0 w-60 h-60 bg-blue-200 rounded-full opacity-30 animate-blob mix-blend-multiply filter blur-3xl"></div>
        <div className="absolute bottom-20 right-0 w-72 h-72 bg-pink-200 rounded-full opacity-30 animate-blob animation-delay-2000 mix-blend-multiply filter blur-3xl"></div>
      </main>
    </div>
  );
}
