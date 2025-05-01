import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import logo from "../assets/SWIMMING_logo.png";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white bg-opacity-95 shadow-md py-3"
          : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link
          to="/"
          className="flex items-center space-x-3"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          {/* Logo */}
          <img
            src={logo}
            alt="Logo"
            className="w-12 h-12 object-cover rounded-3xl border-2 border-sky-500"
          />

          {/* School Name */}
          <div className="grid grid-cols-1 gap-0 leading-tight">
            <span
              className={`text-head font-bold text-sm md:text-base ${
                isScrolled ? "text-navy-700" : "text-white"
              }`}
            >
              សាលាបង្រៀនហែលទឹក​ រិទ្ធិយ៉ា​
            </span>
            <span
              className={`font-bold text-sm md:text-base ${
                isScrolled ? "text-navy-700" : "text-white"
              }`}
            >
              Rithya Swimming School
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8 text-body">
          {[
            "ទំព័រដើម",
            "អំពីយើង",
            "កម្មវិធីសិក្សា",
            "កាលវិភាគ",
            "រូបភាព",
            "វីដេអូ",
            "ទំនាក់ទំនង",
          ].map((item) => (
            <Link
              key={item}
              to={item === "ទំព័រដើម" ? "/" : `/${item.toLowerCase()}`}
              className={`font-medium hover transition-colors ${
                isScrolled ? "text-navy-700" : "text-white"
              }`}
            >
              {item}
            </Link>
          ))}
          <a href="https://docs.google.com/forms/d/e/1FAIpQLSeh_IBmsqMSXlCWiLvPopAI7wB_B9KHF3Sh6zVgzU9pwo8-pQ/viewform?usp=sharing">
            <Button className="bg-aqua-500 hover text-white">
              <span className="text-body">ចុះឈ្មោះឥឡូវ</span>
            </Button>
          </a>
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={toggleMobileMenu}
            className={`p-2 ${isScrolled ? "text-navy-700" : "text-white"}`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg animate-fade-in">
          <div className="container mx-auto px-4 py-4">
            <div className="flex flex-col space-y-4 text-body">
              {[
                "ទំព័រដើម",
                "អំពីយើង",
                "កម្មវិធីសិក្សា",
                "កាលវិភាគ",
                "រូបភាព",
                "វីដេអូ",
                "ទំនាក់ទំនង",
              ].map((item) => (
                <Link
                  key={item}
                  to={item === "ទំព័រដើម" ? "/" : `/${item.toLowerCase()}`}
                  className="text-navy-700 font-medium py-2 hover:text-aqua-500 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item}
                </Link>
              ))}
              <a href="https://docs.google.com/forms/d/e/1FAIpQLSeh_IBmsqMSXlCWiLvPopAI7wB_B9KHF3Sh6zVgzU9pwo8-pQ/viewform?usp=sharing">
                <Button className="bg-aqua-500 hover:bg-aqua-600 text-white w-full">
                  <span className="text-body">ចុះឈ្មោះឥឡូវ</span>
                </Button>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
