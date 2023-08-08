import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './style.scss';
import Navbar from 'src/components/Navbar';
import CardHome from 'src/components/CardHome';
import screenImage from './../../img/screen.jpg';

import CardActivity from 'src/components/CardActivity';

const Home = () => {

  let title = "Tu sitio de actividades para todas las edades";
  let description = "Reserva actividades desde la comodidad de tu casa, sin preocuparte por nada "

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
      imageActivity={event.previewImage}
      title={event.name}
      description={event.description}
    />
  ));

  const locationActivitiesList = events.map(event => (
    <CardActivity
      key={event._id}
      imageActivity={event.previewImage}
      title={event.name}
      description={event.description}
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

      {/* <div className="card-home-activities">
        <div className='title'>
          <h1>Más Actividades</h1>
        </div>
        <div className="card-home-container">
          {moreActivitiesList}
          {moreActivitiesList}
        </div>
      </div> */}

    </>
  )
};

export default Home;
