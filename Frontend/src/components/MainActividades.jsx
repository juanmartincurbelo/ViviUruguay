import images from "../constants/images";
import ButtonComponent from "./ButtonComponent";
import CardComponent from "./CardComponent";

const MainActividades = () => {
  return (
    <section className="py-5 flex flex-col gap-5">
      <div className="flex flex-col gap-5 md:grid md:grid-cols-9">
        <div className="md:col-span-4">
          <h1 className="font-extrabold text-white text-4xl md:text-5xl lg:text-6xl text-center md:text-left md:row-span-2">
            Vi<span className="text-primary">vv</span>í{" "}
            <span className="text-[1.8rem] md:text-4xl lg:text-[2.68rem]">
              NUEVAS EXPERIENCIAS
            </span>
          </h1>
          <p className="row-span-1 text-center text-white my-4 md:text-lg lg:text-xl md:text-left">
            ¿Listo para vivir una experiencia inolvidable? <br /> Reserva tu
            próxima actividad de forma rápida, sencilla y segura.
          </p>
        </div>
        <div className="md:col-span-5">
          <CardComponent
            img={images.DummyImg}
            category="Culinario"
            price="15000"
            currency="$"
            title="Visita Guiada a Bodega Garzón + Cata de Vino"
            desc="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam"
          />
        </div>
      </div>
      <div className="flex flex-col gap-5 md:grid md:grid-cols-9">
        <div className="md:col-span-4 flex flex-col gap-5">
          <ButtonComponent text="VER MÁS ACTIVIDADES" />
          <div className="md:min-h-[20rem] lg:min-h-[50vh]">
            <CardComponent
              img={images.DummyImg5}
              category="Espectáculo"
              price="1400"
              currency="$"
              title="Evento en Teatro Solís"
              desc="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam"
            />
          </div>
        </div>
        <div className="md:col-span-5 flex flex-col gap-5">
          <div className="flex flex-col md:grid gap-5 h-full md:grid-cols-2 md:grid-rows-2">
            <CardComponent
              img={images.DummyImg4}
              category="Turismo"
              price="200"
              currency="USD"
              title="Paseo por Colonia"
              desc="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam"
            />
            <CardComponent
              img={images.DummyImg2}
              category="Turismo"
              title="Tour con Guía por Punta del Este"
              desc="Lorem ipsum dolor sit amet consectetur adipisicing elit. QuisquamelitQuisquamelit Quisquamelit. Hola 123 1234 12345"
            />
            <div className="col-span-2">
              <CardComponent
                img={images.DummyImg3}
                category="Turismo"
                price="2300"
                currency="$"
                title="Paseo por Casapueblo"
                desc="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MainActividades;
