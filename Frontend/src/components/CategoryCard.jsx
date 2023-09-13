import React from "react";
import { GiWeightLiftingUp, GiForkKnifeSpoon } from "react-icons/gi";
import { FaTheaterMasks, FaBus, FaPaintBrush } from "react-icons/fa";
import { PiPopcornBold } from "react-icons/pi";
import { Link } from "react-router-dom";

const getIcon = (type) => {
  switch (type) {
    case "ejercicio":
      return <GiWeightLiftingUp className="h-full w-full text-white p-1" />;
    case "arte":
      return <FaTheaterMasks className="h-full w-full text-white p-1" />;
    case "culinario":
      return <GiForkKnifeSpoon className="h-full w-full text-white p-1" />;
    case "turismo":
      return <FaBus className="h-full w-full text-white p-1" />;
    case "talleres":
      return <FaPaintBrush className="h-full w-full text-white p-1" />;
    case "entretenimiento":
      return <PiPopcornBold className="h-full w-full text-white p-1" />;
    default:
      return null;
  }
};

const CategoryCard = ({ type, text, image, }) => {
  return (
    <Link
      to={`/category/`}
      className={`p-2 relative bg-cover bg-center rounded-xl w-[calc(50%-0.5rem)]  md:w-[calc(33.333%-1rem)] aspect-square md:aspect-video flex items-center justify-center hover:scale-105 cursor-pointer custom-shadow transition-all duration-300 ${
        type ? "my-6" : "my-2"
      }`}
      style={{ backgroundImage: `url(${image})` }}
    >
      <div className="absolute inset-0 rounded-xl bg-black opacity-40"></div>
      {/* Fondo oscurecido */}
      {type && (
        <div className="absolute top-0 left-0 translate-x-1/2 -translate-y-1/2 bg-primary rounded-sm p-1 w-10 h-10">
          {getIcon(type)}
        </div>
      )}
      <span className="text-white text-sm md:text-md lg:text-xl bg-black bg-opacity-50 px-4 py-2 rounded-md z-10 text-center">
        {text}
      </span>
    </Link>
  );
};

export default CategoryCard;
