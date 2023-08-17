import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './style.scss';
import Navbar from 'src/components/Navbar';
import Button from 'src/components/Button';
import CardHome from 'src/components/CardHome';
import CardHomeTitle from 'src/components/CardHomeTitle';
import screenImage from './../../img/screen.jpg';

import CardActivity from 'src/components/CardActivity';
import CardActivityDialog from 'src/components/CardActivityDialog';

const Home = () => {

  let description = "Reservá tu próxima actividad de forma rápida y sencilla.";

  const [dialogOpen, setDialogOpen] = useState(false);

  const handleDialogOpen = (event) => {
    setSelectedEvent(event); // Establecer el evento seleccionado
    setDialogOpen(true); // Abrir el diálogo
  };

  const handleDialogClose = () => {
    setSelectedEvent(null);
    setDialogOpen(false);
  };

  const [selectedEvent, setSelectedEvent] = useState(null);

  const [events, setEvents] = useState([]);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const response = await axios.get('http://localhost:3003/api/clients/auth-events');
        setEvents(response.data);
        console.log(response.data);
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
      onClick={() => handleDialogOpen(event)} // Pasar el evento al hacer clic
    />
  ));

  const locationActivitiesList = events.map(event => (
    <CardActivity
      key={event._id}
      imageActivity={`/eventImages/${event.name}/${event.previewImage}`}
      title={event.name}
      description={event.description}
      onClick={() => handleDialogOpen(event)} // Pasar el evento al hacer clic
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

      <div className="card-home-show-activities">
        <Button
          text="Ver actividades" />
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

      <CardActivityDialog selectedEvent={selectedEvent} onClose={handleDialogClose} />
    </>
  )
};

export default Home;
