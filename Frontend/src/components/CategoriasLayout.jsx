import React from "react";
import CategoryCard from "./CategoryCard";

const CategoriasLayout = ({ title, items }) => {
  return (
    <section className="mt-6 container mx-auto px-10 md:px-16 lg:px-32">
      <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2 md:mb-3 lg:mb-4">
        {title}
      </h2>
      <div className="flex flex-wrap mx-auto justify-between">
        {items.map((item) => {
          return (
            <CategoryCard
              key={"category" + item.text}
              text={item.text}
              image={item.image}
              type={item.type}
            />
          );
        })}
      </div>
    </section>
  );
};

export default CategoriasLayout;
