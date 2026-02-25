"use client"; // Required for useState and event handling

import { BellRing, ShoppingCart, Van, Sun, Moon } from "lucide-react";
import Link from "next/link";
import React, { useState, useEffect } from "react";

export default function Navbar() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Synchronize the theme change
  const handleThemeToggle = (e) => {
    const isChecked = e.target.checked;
    setIsDarkMode(isChecked);
    // This tells DaisyUI/Tailwind which theme to apply
    const theme = isChecked ? "sunset" : "light";
    document.querySelector("html").setAttribute("data-theme", theme);
  };

  const links = (
    <>
      <li>
        <Link href="/">Home</Link>
      </li>
      <li>
        <Link href="/about">About</Link>
      </li>
      <li>
        <Link href="/contact">Contact</Link>
      </li>
      <li>
        <Link href="/products">Products</Link>
      </li>
    </>
  );

  // Refactored Toggle to be a reusable component
  const ThemeToggle = () => (
    <label className="swap swap-rotate">
      <input
        type="checkbox"
        className="theme-controller"
        checked={isDarkMode}
        onChange={handleThemeToggle}
      />
      {/* Sun Icon (Visible when checked/Sunset) */}
      <Sun className="swap-on h-6 w-6 text-accent" />
      {/* Moon Icon (Visible when unchecked/Light) */}
      <Moon className="swap-off h-6 w-6 text-accent" />
    </label>
  );

  return (
    <div className="navbar bg-base-100 shadow-sm px-4">
      {/* LEFT: Logo & Mobile Menu */}
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[50] mt-3 w-52 p-2 shadow"
          >
            {links}
            <div className="divider lg:hidden"></div>
            <li className="lg:hidden flex flex-row items-center justify-between px-4 py-2">
              <span>Theme</span>
              <ThemeToggle />
            </li>
          </ul>
        </div>
        <Link href="/" className="btn btn-ghost text-xl">
          Touch<span className="font-bold text-blue-800">&</span>Buy
        </Link>
      </div>

      {/* CENTER: Desktop Links */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>

      {/* RIGHT: Icons & Desktop Toggle */}
      <div className="navbar-end gap-2">
        <div className="hidden lg:block mr-4">
          <ThemeToggle />
        </div>

        <div className="flex space-x-2">
          <button className="btn btn-ghost btn-circle btn-sm md:btn-md">
            <ShoppingCart size={20} />
          </button>
          <button className="btn btn-ghost btn-circle btn-sm md:btn-md">
            <BellRing size={20} />
          </button>
          <button className="btn btn-ghost btn-circle btn-sm md:btn-md">
            <Van size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
