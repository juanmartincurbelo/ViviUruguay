import { useState, useRef, useEffect } from "react";

import "./css/CardComponent/CardComponent.css";

const CardComponent = ({
  img,
  category,
  price = null,
  currency = null,
  title,
  desc,
  provider,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative w-full bg-center bg-cover rounded-lg h-56 md:h-full md:min-h-fit overflow-hidden cursor-pointer hover:scale-105 custom-shadow transition-all duration-300"
      style={{ backgroundImage: `url(${img})` }}
    >
      {/* Degradado del fondo */}
      <div
        className={`absolute inset-0 bg-gradient-to-t from-black ${
          isHovered ? "to-[rgba(0,0,0,0.3)]" : "to-transparent"
        } transition-all duration-300`}
      ></div>

      {/* Categoría */}
      <div
        className={`relative text-white z-10 top-4 left-4 float-left bg-black bg-opacity-20 backdrop-blur-sm py-1 px-2 rounded ${
          isHovered && "hidden"
        }`}
      >
        {category}
      </div>

      {/* price y Moneda */}
      <div className="relative z-10 top-4 right-4 float-right">
        {currency === null || price === null ? (
          <div className="text-white flex items-center">
            <span className={`ml-1 ${isHovered && "hidden"}`}>GRATIS</span>
          </div>
        ) : currency === "$" ? (
          <div className="text-white flex items-center">
            <span className={`text-sm drop-shadow-sm ${isHovered && "hidden"}`}>
              {currency}
            </span>
            <span
              className={`ml-1 text-xl dropshadow-md ${isHovered && "hidden"}`}
            >
              {price}
            </span>
          </div>
        ) : (
          <div className="text-white text-center flex flex-col justify-center items-center">
            <span className={`text-xl drop-shadow-sm ${isHovered && "hidden"}`}>
              {price}
            </span>
            <span
              className={`dropshadow-md text-sm w-full -mt-1.5 ${
                isHovered && "hidden"
              }`}
            >
              {currency}
            </span>
          </div>
        )}
      </div>

      {/* Proveedor y Título */}
      <div
        className={`absolute z-10 bottom-4 left-4 ${
          isHovered && "bottom-[45%]"
        } transition-all duration-300`}
      >
        <div className="text-white text-xl mt-2 pr-2">
          <p className="line-clamp-1">{provider}</p>
        </div>
        <div className="text-white text-xl mt-2 pr-2">
          <p className="line-clamp-2">{title}</p>
        </div>
        <div
          className={`text-white text-base mt-2 pr-2 h-0 translate-y-5 ${
            isHovered ? "!translate-y-0" : ""
          }`}
        >
          <p className="line-clamp-3">{desc}</p>
        </div>
      </div>
      <div className="absolute z-10 bottom-4 left-4"></div>
    </div>
  );
};

export default CardComponent;
