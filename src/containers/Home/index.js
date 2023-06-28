import React from 'react';

import './style.scss';
import Navbar from 'src/components/Navbar';
import CardHome from 'src/components/CardHome';
import screenImage from './../../img/screen.jpg';
import CardDescription from 'src/components/CardDescription';

import CardActivity from 'src/components/CardActivity';
import pdeActivity from './../../img/pde.jpg';
import mvdActivity from './../../img/mvd.jpg';
import colActivity from './../../img/col.jpg';
import canActivity from './../../img/can.jpg';
import teatroActivity from './../../img/teatroSolis.jpg';
import yogaActivity from './../../img/yoga.jpg';
import bodegaActivity from './../../img/bodega.jpg';
import cineActivity from './../../img/cine.jpg';


const Home = () => {

  let title = "Tu sitio de actividades para todas las edades";
  let description = "Reserva actividades desde la comodidad de tu casa, sin preocuparte por nada "

  let teatroTitle = "Visita Teatro";
  let teatroDescription = "Visita el Teatro Solís, un tesoro cultural en Uruguay. Sumérgete en su historia y arquitectura impresionante para vivir una experiencia teatral única. ¡Disfruta de momentos llenos de arte y encanto en este icónico teatro!";

  let yogaTitle = "Clase de Yoga";
  let yogaDescription = "Sumérgete en una clase de yoga de una hora, donde encontrarás serenidad y equilibrio. Disfruta de posturas suaves y meditación, creando un espacio de calma interior. Regálate un momento de bienestar y relajación total.";

  let bodegaTitle = "Visita Bodega";
  let bodegaDescription = "Una experiencia para conocer Bodega Garzón en profundidad, disfrutar de su entorno y degustar una selección de vinos de la línea Reserva.";

  let cineTitle = "Cine Argentino";
  let cineDescription = "Disfruta de la película 'Argentina, 1985'. Basada en una historia real de valientes fiscales que desafiaron a la dictadura militar. Acompaña esta emocionante historia con una copa de vino.";

  let mvdTitle = "Montevideo";
  let mvdDescription = "Montevideo, la fascinante capital de Uruguay. Sumérgete en su encanto histórico, pasea por sus hermosas playas y déjate seducir por su vibrante escena cultural y su deliciosa gastronomía.";

  let pdeTitle = "Punta del Este";
  let pdeDescription = "Playas de ensueño y sofisticación en Uruguay. Descubre un destino costero lleno de encanto y diversión.";

  let colTitle = "Colonia";
  let colDescription = "Una joya colonial que te transporta en el tiempo. Sus calles empedradas, casas coloridas y murallas históricas brindan un encanto pintoresco. Con su rica historia, paisajes ribereños y una oferta cultural diversa.";

  let canTitle = "Canelones";
  let canDescription = "Combina encanto rural y urbanismo moderno. Conocida por sus extensos viñedos y bodegas, es un paraíso para los amantes del vino. Además, cuenta con hermosos paisajes naturales, playas y una rica oferta gastronómica.";

  const featuredActivities = [
    { imageActivity: teatroActivity, title: teatroTitle, description: teatroDescription },
    { imageActivity: yogaActivity, title: yogaTitle, description: yogaDescription },
    { imageActivity: bodegaActivity, title: bodegaTitle, description: bodegaDescription },
    { imageActivity: cineActivity, title: cineTitle, description: cineDescription }
  ];

  const featuredActivitiesList = featuredActivities.map(activity => (
    <CardActivity
      key={activity.title} // Asegúrate de proporcionar una clave única para cada elemento en la lista
      imageActivity={activity.imageActivity}
      title={activity.title}
      description={activity.description}
    />
  ));

  const locationActivities = [
    { imageActivity: mvdActivity, title: mvdTitle, description: mvdDescription },
    { imageActivity: pdeActivity, title: pdeTitle, description: pdeDescription },
    { imageActivity: colActivity, title: colTitle, description: colDescription },
    { imageActivity: canActivity, title: canTitle, description: canDescription }
  ]

  const locationActivitiesList = locationActivities.map(activity => (
    <CardActivity
      key={activity.title} // Asegúrate de proporcionar una clave única para cada elemento en la lista
      imageActivity={activity.imageActivity}
      title={activity.title}
      description={activity.description}
    />
  ));

  const moreActivities = [
    { imageActivity: teatroActivity, title: teatroTitle, description: teatroDescription },
    { imageActivity: yogaActivity, title: yogaTitle, description: yogaDescription },
    { imageActivity: bodegaActivity, title: bodegaTitle, description: bodegaDescription },
    { imageActivity: cineActivity, title: cineTitle, description: cineDescription },
    { imageActivity: bodegaActivity, title: bodegaTitle, description: bodegaDescription },
    { imageActivity: cineActivity, title: cineTitle, description: cineDescription },
    { imageActivity: teatroActivity, title: teatroTitle, description: teatroDescription },
    { imageActivity: yogaActivity, title: yogaTitle, description: yogaDescription },
  ]

  const moreActivitiesList = moreActivities.map(activity => (
    <CardActivity
      key={activity.title} // Asegúrate de proporcionar una clave única para cada elemento en la lista
      imageActivity={activity.imageActivity}
      title={activity.title}
      description={activity.description}
    />
  ));

  return (
    <>
      <Navbar />
      <div className='card-home-top'>
        <CardHome
          title={title}
          description={description}
        />
        <div className="imgBxHome">
          <img src={screenImage} alt="Screen" className="image" />
        </div>
      </div>

      <div className="card-home-activities">
        <div className='title'>
          <h1>Actividades destacadas</h1>
        </div>
        <div className="card-home-container">
          {featuredActivitiesList}
        </div>
      </div >

      <div className="card-home-activities">
        <div className='title'>
          <h1>Principales Destinos</h1>
        </div>
        <div className="card-home-container">
          {locationActivitiesList}
        </div>
      </div>

      <div className="card-home-activities">
        <div className='title'>
          <h1>Más Actividades</h1>
        </div>
        <div className="card-home-container">
          {moreActivitiesList}
          {moreActivitiesList}
        </div>
      </div>

      <div>
        <h1>hola</h1>
      </div>

    </>
  )
};

export default Home;
