import React from "react";
import MainLayout from "../components/MainLayout";
import MainActividades from "../components/MainActividades";
import CategoriasLayout from "../components/CategoriasLayout";

const HomePage = () => {
  return (
    <MainLayout>
      <MainActividades />
      <CategoriasLayout title="Principales Destinos" />
    </MainLayout>
  );
};

export default HomePage;
