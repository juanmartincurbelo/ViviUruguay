import React from "react";
import images from "../constants/images";
import CardComponent from "./CardComponent";

const MainActividades = () => {
  return (
    <section className="container mx-auto flex flex-col px-10 py-5 lg:flex-row">
      <div className="bg-secondary grid grid-cols-5 md:grid-cols-9 m-auto gap-5">
        {/* Titulo y desc */}
        <div className="col-span-5 md:col-span-4 flex flex-col justify-between">
          <div>
            <h1 className="font-extrabold text-white text-4xl md:text-5xl lg:text-6xl text-center md:text-left">
              Vi<span className="text-primary">vv</span>í{" "}
              <span className="text-[1.8rem] md:text-4xl lg:text-[2.68rem]">
                NUEVAS EXPERIENCIAS
              </span>
            </h1>
            <p className="text-center text-white my-4 md:text-xl lg:text-2xl xl:text-xl md:text-left">
              ¿Listo para vivir una experiencia inolvidable? <br /> Reserva tu
              próxima actividad de forma rápida, sencilla y segura.
            </p>
          </div>
          <div>
            <img src={images.hero} alt="" />
          </div>
        </div>

        {/* Primer Banner */}
        <div className="col-span-5 flex w-full">
          <CardComponent
            img={images.DummyImg}
            categoria="Categoría"
            precio="1000"
            currency="USD"
            titulo="Título demasiado largo larguisimo para probar el responsive de la tarjeta de actividades"
            proveedor="Proveedor Ejemplo"
          />
        </div>
        <div className="col-span-5 lg:col-span-4 grid columns-2 gap-5 w-full">
          <div className="flex gap-5">
            <CardComponent
              img={images.DummyImg2}
              categoria="Categoría"
              precio="1000"
              currency="USD"
              titulo="Prueba tarjeta chica corto"
              proveedor="Proveedor Ejemplo"
            />
            <CardComponent
              img={images.DummyImg2}
              categoria="Categoría"
              precio="1000"
              currency="USD"
              titulo="Prueba tarjeta chica corto"
              proveedor="Proveedor Ejemplo"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default MainActividades;
