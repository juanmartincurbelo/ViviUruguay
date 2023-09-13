import React from "react";
import MainLayout from "../components/MainLayout";
import MainActividades from "../components/MainActividades";
import CategoriasLayout from "../components/CategoriasLayout";
import SwiperLayout from "../components/SwiperLayout";

import { actividadesDestacadas, nuevasActividades } from "../data/actividades";

import { places, categories } from "../data/categories";

const HomePage = () => {
  return (
    <MainLayout>
      <MainActividades />
      <CategoriasLayout title="Principales Destinos" items={places} />
      <SwiperLayout title="Actividades Destacadas" items={actividadesDestacadas} />
      <SwiperLayout title="Nuevas Actividades" items={nuevasActividades} />
      <CategoriasLayout title="Categorías" items={categories} />
    </MainLayout>
  );
};

export default HomePage;
