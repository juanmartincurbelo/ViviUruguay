import React from "react";
import CategoryCard from "./CategoryCard";
import images from "../constants/images";

const CategoriasLayout = ({title}) => {
  return (
    <section className="mt-2">
      <h2 className="text-2xl text-white">{title}</h2>
      <div className="flex flex-wrap mx-auto justify-between">
        <CategoryCard text="Colonia" image={images.DummyImg4} />
        <CategoryCard text="Maldonado" image={images.DummyImg2} />
        <CategoryCard text="Canelones" image={images.DummyImg3} />
        <CategoryCard text="Lavalleja" image={images.DummyImg} />
        <CategoryCard text="Salto" image={images.DummyImg5} />
        <CategoryCard text="Tacuarembó" image={images.DummyImg4} />
      </div>
    </section>
  );
};

export default CategoriasLayout;
