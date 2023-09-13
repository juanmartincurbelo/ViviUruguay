import React from "react";
import { GiWeightLiftingUp } from "react-icons/gi";
import { FaTheaterMasks } from "react-icons/fa";

const getIcon = (type) => {
  switch (type) {
    case "ejercicio":
      return (
        <GiWeightLiftingUp className="h-full w-full text-white p-1 rounded-full" />
      );
    case "arte":
      return (
        <FaTheaterMasks className="h-full w-full text-white p-1 rounded-full" />
      );
    default:
      return null;
  }
};

const CategoryCard = ({ type, text, image }) => {
  return (
    <div
      className={`p-2 relative bg-cover bg-center rounded-xl w-[calc(50%-1rem)]  md:w-[calc(33.333%-1rem)] aspect-square md:aspect-video flex items-center justify-center hover:scale-105 cursor-pointer custom-shadow transition-all duration-300 ${
        type ? "my-6" : "my-4"
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
      <span className="text-white text-xl bg-black bg-opacity-50 px-4 py-2 rounded-md z-50 text-center">
        {text}
      </span>
    </div>
  );
};

export default CategoryCard;
