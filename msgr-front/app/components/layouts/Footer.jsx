import Link from "next/link";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-900 via-purple-900 to-gray-800 text-white py-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Logo & About */}
        <div>
          <Link
            href="/"
            className="text-2xl font-bold text-indigo-400 hover:text-indigo-300"
          >
            BloodHub
          </Link>
          <p className="mt-4 text-sm text-gray-300">
            BloodHub is a platform dedicated to connecting blood donors and
            recipients in need. Every drop counts — join us in saving lives.
          </p>
        </div>

        {/* Useful Links */}
        <div>
          <h3 className="text-lg font-semibold text-indigo-300 mb-4">
            Quick Links
          </h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/" className="hover:text-indigo-300 transition">
                Home
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-indigo-300 transition">
                About
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="hover:text-indigo-300 transition"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Social & Contact */}
        <div>
          <h3 className="text-lg font-semibold text-indigo-300 mb-4">
            Follow Us
          </h3>
          <div className="flex space-x-4 mb-4">
            <a href="#" className="hover:text-indigo-300 transition">
              <FaFacebookF />
            </a>
            <a href="#" className="hover:text-indigo-300 transition">
              <FaTwitter />
            </a>
            <a href="#" className="hover:text-indigo-300 transition">
              <FaInstagram />
            </a>
          </div>
          <p className="text-sm text-gray-400">
            Email:{" "}
            <Link
              href="mailto:dev.arafath@gmail.com"
              className="text-indigo-300 hover:underline"
            >
              dev.arafath@gmail.com
            </Link>
          </p>
          <p className="text-sm text-gray-400">
            Phone:{" "}
            <Link
              href="https://wa.me/+8801719110664/"
              className="text-indigo-300 hover:underline"
            >
              +8801719110664
            </Link>
          </p>
        </div>
      </div>

      <div className="mt-8 border-t border-gray-700 pt-4 text-center text-sm text-gray-400">
        &copy; {new Date().getFullYear()} Arafath. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
