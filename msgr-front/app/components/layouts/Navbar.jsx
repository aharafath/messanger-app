"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import Image from "next/image";

const Navbar = () => {
  const { data: session, status } = useSession();
  const path = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  if (path.includes("/messages")) return null;

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="w-full fixed top-0 z-20 bg-gradient-to-r from-gray-900 via-purple-900 to-gray-800 text-white shadow-md">
      <div className="mx-auto max-w-7xl px-6 py-4 grid-cols-2 grid md:grid-cols-3 items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="text-2xl gap-2 flex  items-center font-bold text-indigo-400 hover:text-indigo-300"
        >
          <div>
            <Image
              src="/images/header/logo.png"
              width={30}
              height={40}
              alt="Logo"
            />
          </div>
          <div className="-mb-3">BloodHub</div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-6 text-lg justify-center">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="hover:text-indigo-300 transition"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Auth Buttons - Desktop */}
        <div className="hidden md:flex items-center space-x-4 justify-end">
          {session?.user ? (
            <>
              <Link
                href="/profile"
                className="text-sm font-medium text-indigo-300 hover:underline"
              >
                Profile
              </Link>
              <Link
                href="/messages"
                className="text-sm font-medium text-indigo-300 hover:underline"
              >
                Message
              </Link>
              <button
                onClick={() => signOut()}
                className="rounded-md bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-4 py-1.5 text-sm font-semibold text-white shadow hover:opacity-90 transition"
              >
                Sign Out
              </button>
            </>
          ) : (
            <Link
              href="/auth/sign-in"
              className="rounded-md bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-4 py-1.5 text-sm font-semibold text-white shadow hover:opacity-90 transition"
            >
              Log In
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white text-2xl flex justify-end"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="md:hidden px-6 pb-6 bg-gradient-to-b from-gray-900 via-purple-900 to-gray-800 shadow-lg space-y-4 text-lg">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={closeMenu}
              className="block hover:text-indigo-300 transition"
            >
              {link.name}
            </Link>
          ))}

          {status === "loading" ? (
            <span className="text-sm text-gray-300">Loading...</span>
          ) : session?.user ? (
            <>
              <Link
                href="/profile"
                onClick={closeMenu}
                className="block text-sm font-medium text-indigo-300 hover:underline"
              >
                Profile
              </Link>
              <Link
                href="/messages"
                onClick={closeMenu}
                className="block text-sm font-medium text-indigo-300 hover:underline"
              >
                Message
              </Link>
              <button
                onClick={() => {
                  signOut();
                  closeMenu();
                }}
                className="w-full text-left mt-2 rounded-md bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-4 py-2 text-sm font-semibold text-white shadow hover:opacity-90 transition"
              >
                Sign Out
              </button>
            </>
          ) : (
            <Link
              href="/auth/sign-in"
              onClick={closeMenu}
              className="block rounded-md bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-4 py-2 text-sm font-semibold text-white shadow hover:opacity-90 transition"
            >
              Log In
            </Link>
          )}
        </div>
      )}
    </header>
  );
};

export default Navbar;
