import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './style.scss';
import Navbar from 'src/components/Navbar';
import CardHome from 'src/components/CardHome';
import CardHomeTitle from 'src/components/CardHomeTitle';
import screenImage from './../../img/screen.jpg';

import CardActivity from 'src/components/CardActivity';

const Home = () => {

  // let title = "VIBIEN";
  let description = "Reservá tu próxima salida de forma fácil y rápida.";

  const [events, setEvents] = useState([]);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const response = await axios.get('http://localhost:3003/api/clients/auth-events');
        setEvents(response.data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    }

    fetchEvents();
  }, []);

  const featuredActivitiesList = events.map(event => (
    <CardActivity
      key={event._id}
      imageActivity={`/eventImages/${event.name}/${event.previewImage}`}
      title={event.name}
      description={event.description}
    />
  ));

  const locationActivitiesList = events.map(event => (
    <CardActivity
      key={event._id}
      imageActivity={`/eventImages/${event.name}/${event.previewImage}`}
      title={event.name}
      description={event.description}
    />
  ));

  return (
    <>
      <Navbar />
      <div className='card-home-top'>
        <CardHomeTitle
        // title={title}
        />
        <CardHome
          title={description}
        />
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
      </div>

    </>
  )
};

export default Home;
