import { Link } from "react-router-dom";
import { Waves, Phone, Mail, MapPin } from "lucide-react";
import logo from "../assets/SWIMMING_Logo.png";

const Footer = () => {
  return (
    <footer className="bg-navy-800 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2  lg:grid-cols-4 gap-8">
          {/* Column 1: Logo and about */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <img
                src={logo}
                alt="logo"
                loading="lazy"
                className="w-10 h-10 object-cover rounded-3xl border-2 border-sky-500"
              />
              <span className="text-xl font-bold"></span>
            </div>
            <div className="text-gray-300 mb-4 text-body1 grid grid-cols-1 gap-4">
              <h3>ទំនុកចិត្ត Trust </h3>
              <h3>គុណភាព Value </h3>
              <h3>និងរីកចម្រើន Development</h3>
            </div>
            <div className="flex space-x-4">
              {["facebook", "twitter", "instagram"].map((social) => (
                <a
                  key={social}
                  href={`#${social}`}
                  className="w-8 h-8 rounded-full bg-navy-700 flex items-center justify-center hover:bg-aqua-600 transition-colors"
                >
                  <span className="sr-only">{social}</span>
                  <div className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4 border-b border-aqua-700 pb-2">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {[
                "Home",
                "About Us",
                "Our Programs",
                "Schedule",
                "Gallery",
                "Contact Us",
              ].map((item) => (
                <li key={item}>
                  <Link
                    to={`/${
                      item === "Home"
                        ? ""
                        : item.toLowerCase().replace(/\s+/g, "-")
                    }`}
                    className="text-gray-300 hover:text-aqua-400 transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Programs */}
          <div>
            <h3 className="text-lg font-bold mb-4 border-b border-aqua-700 pb-2">
              Our Programs
            </h3>
            <ul className="space-y-2">
              {["Basic", "Intermediate", "Advanced", "Highest"].map(
                (program) => (
                  <li key={program}>
                    <Link
                      to="/programs"
                      className="text-gray-300 hover:text-aqua-400 transition-colors"
                    >
                      {program}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Column 4: Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-4 border-b border-aqua-700 pb-2">
              Contact Us
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <MapPin
                  className="text-aqua-400 mt-1 flex-shrink-0"
                  size={18}
                />
                <span className="text-gray-300">
                  Olympic Stadium / Khmer Swimming Federation
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="text-aqua-400 flex-shrink-0" size={18} />
                <span className="text-gray-300">
                  012 347 400 / 088 888 9400
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="text-aqua-400 flex-shrink-0" size={18} />
                <span className="text-gray-300">ksf.rithya@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-navy-600 mt-12 pt-8 text-center text-gray-400 text-sm">
          <div>
            © {new Date().getFullYear()} Rithya Swimming School. All rights
            reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
