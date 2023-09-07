import {
  FaPhone,
  FaMapMarkerAlt,
  FaFacebook,
  FaTwitter,
  FaInstagram,
} from "react-icons/fa";
import images from "../constants/images";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-detail shadow">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <Link to="/" className="flex items-center mb-4 sm:mb-0 mr-6">
            <img src={images.Logo} className="h-8 mr-3" alt="Vivví Logo" />
          </Link>

          <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-white sm:mb-0">
            {/* Existing Links */}
            <li>
              <Link to="/ayuda" className="mr-4 hover:underline md:mr-6">
                Ayuda
              </Link>
            </li>
            <li>
              <Link to="/about" className="mr-4 hover:underline md:mr-6">
                Sobre Nosotros
              </Link>
            </li>
            <li>
              <Link to="/contacto" className="mr-4 hover:underline md:mr-6">
                Contacto:
              </Link>
            </li>
            {/* Info de contacto */}
            <li>
              <a
                href="tel:+1234567890"
                className="flex items-center space-x-2 mr-2"
              >
                <span className="rotate-90">
                  <FaPhone />
                </span>
                <span>+1 234 567 890</span>
              </a>
            </li>
            <li>
              <a
                href={`https://www.google.com/maps/place/34°54'14.0"S+56°11'25.8"W`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2"
              >
                <FaMapMarkerAlt />
                <span>123 Calle, Montevideo, Uruguay</span>
              </a>
            </li>
          </ul>
        </div>

        <hr className="my-6 border-white sm:mx-auto lg:my-8" />

        <div className="flex justify-between items-center">
          <span className="block text-sm text-white sm:text-center">
            © 2023{" "}
            <Link to="/" className="hover:underline">
              Vivví
            </Link>
            . Todos los derechos reservados.
          </span>

          <div className="flex space-x-4">
            <a
              href="https://facebook.com/vivviuy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-primary"
            >
              <FaFacebook />
            </a>
            <a
              href="https://twitter.com/vivviuy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-primary"
            >
              <FaTwitter />
            </a>
            <a
              href="https://instagram.com/vivviuy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-primary"
            >
              <FaInstagram />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
