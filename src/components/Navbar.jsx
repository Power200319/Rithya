import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/Button";
import logo from "../assets/SWIMMING_Logo.png";

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
        <nav className="nav-desktop items-center space-x-8 text-body">
          {[
            { label: "ទំព័រដើម", href: "#home" },
            { label: "អំពីយើង", href: "#about" },
            { label: "កម្មវិធីសិក្សា", href: "#programs" },
            { label: "កាលវិភាគ", href: "#schedule" },
            { label: "រូបភាព", href: "#gallery" },
            { label: "វីដេអូ", href: "#videos" },
            { label: "ទំនាក់ទំនង", href: "#contact" },
          ].map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`font-medium hover transition-colors ${
                isScrolled ? "text-navy-700" : "text-white"
              }`}
            >
              {item.label}
            </a>
          ))}
          <a href="https://docs.google.com/forms/d/e/1FAIpQLSeh_IBmsqMSXlCWiLvPopAI7wB_B9KHF3Sh6zVgzU9pwo8-pQ/viewform?usp=sharing">
            <Button className="bg-aqua-500 hover text-white">
              <span className="text-body">ចុះឈ្មោះឥឡូវ</span>
            </Button>
          </a>
        </nav>

        {/* Mobile Menu Button */}
        <div className="nav-mobile">
          {/* <button
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
          </button> */}
          <a href="https://docs.google.com/forms/d/e/1FAIpQLSeh_IBmsqMSXlCWiLvPopAI7wB_B9KHF3Sh6zVgzU9pwo8-pQ/viewform?usp=sharing">
            <Button className="bg-aqua-500 hover:bg-aqua-600 text-white w-full py-5 justify-center">
              <span className="text-body1 w-11 text-sm">
                ចុះឈ្មោះ
                <br />
                Register
              </span>
            </Button>
          </a>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
    </header>
  );
};

export default Navbar;
