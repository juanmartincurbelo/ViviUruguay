import { useState } from "react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { MdKeyboardArrowDown } from "react-icons/md";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FiSearch } from "react-icons/fi";

import images from "../constants/images";

const navItemsInfo = [
  { name: "Inicio", type: "link", href: "/", icon: null },
  { name: "Buscar", type: "link", href: "/buscar", icon: <FiSearch /> },
  { name: "Guardados", type: "link", href: "/guardados", icon: null },
  { name: "Pagos", type: "link", href: "/pagos", icon: null },
  {
    name: "Información",
    type: "dropdown",
    items: [
      { title: "Sobre Nosotros", href: "/about" },
      { title: "Contacto", href: "/contacto" },
      { title: "Ayuda", href: "/ayuda" },
    ],
  },
];

const NavItem = ({ item }) => {
  const [dropdown, setDropdown] = useState(false);
  const location = useLocation();
  const isActive = item.href && location.pathname === item.href;

  const toggleDropdownHandler = () => {
    setDropdown((curState) => !curState);
  };

  return (
    <li className="relative group hover:text-primary">
      {item.type === "link" ? (
        <Link
          to={item.href}
          className={`text-white flex items-center gap-2 px-4 transition-all duration-500 hover:text-primary ${
            isActive ? "!text-primary" : ""
          }`}
        >
          {item.icon}
          {item.name}
        </Link>
      ) : (
        <div className="flex flex-col items-center">
          <button
            onClick={toggleDropdownHandler}
            className="flex gap-x-1 items-center px-4 transition-all duration-500  group-hover:text-primary"
          >
            <span className="text-white ">{item.name}</span>
            <MdKeyboardArrowDown className="text-white" />
          </button>
          <div
            className={`${
              dropdown ? "block" : "hidden"
            } lg:hidden transition-all duration-500 pt-4 lg:absolute lg:bottom-0 lg:right-0 lg:transform lg:translate-y-full lg:group-hover:block w-max`}
          >
            <ul className="bg-detail-25 lg:bg-white text-center flex flex-col shadow-lg rounded-lg overflow-hidden">
              {item.items.map((page, index) => (
                <Link
                  key={index}
                  to={page.href}
                  className="bg-detail-25 text-white hover:text-white hover:bg-detail px-4 py-2 lg:bg-white lg:text-secondary lg:hover:bg-detail"
                >
                  {page.title}
                </Link>
              ))}
            </ul>
          </div>
        </div>
      )}
    </li>
  );
};

const Header = () => {
  const navigate = useNavigate();
  const [navIsVisible, setNavIsVisible] = useState(false);

  const navVisibilityHandler = () => {
    setNavIsVisible((curState) => !curState);
  };

  return (
    <section className="sticky top-0 left-0 right-0 z-50 bg-secondary">
      <header className="container mx-auto flex justify-between py-4 px-10 items-center">
        <Link to={"/"}>
          <img
            src={images.LogoSmall}
            alt="Logo Vivví Small"
            className="h-6 sm:h-8 md:h-10"
          />
        </Link>
        <div className="text-white z-50 visible lg:hidden">
          {navIsVisible ? (
            <AiOutlineClose
              className="w-6 h-6"
              onClick={navVisibilityHandler}
            />
          ) : (
            <AiOutlineMenu className="w-6 h-6" onClick={navVisibilityHandler} />
          )}
        </div>
        <div
          className={`${
            navIsVisible ? "right-0" : "-right-full"
          }  mt-[56px] lg:mt-0 bg-secondary lg:bg-transparent z-[49] flex flex-col lg:flex-row w-full lg:w-auto justify-center lg:justify-end  fixed top-0 bottom-0 lg:static gap-x-9 items-center transition-all duration-500`}
        >
          <ul className="items-center gap-y-5 flex flex-col lg:flex-row gap-x-2 font-semibold">
            {navItemsInfo.map((item, index) => (
              <NavItem key={index} item={item} />
            ))}
          </ul>

          <button
            onClick={() => {
              navigate("/login");
            }}
            className="transition-all duration-300 mt-5 lg:mt-0 border-2 px-6 py-2 rounded-md text-white font-semibold hover:bg-white hover:text-secondary"
          >
            Log In
          </button>
        </div>
      </header>
    </section>
  );
};

export default Header;
