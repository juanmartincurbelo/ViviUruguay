import React from "react";

const ButtonComponent = ({ text }) => {
  return (
    <button
      type="text"
      className="py-5 px-2 w-full bg-primary md:text-xl font-bold text-white rounded-lg uppercase hover:bg-primary-hover transition-colors duration-300"
    >
      {text}
    </button>
  );
};

export default ButtonComponent;
