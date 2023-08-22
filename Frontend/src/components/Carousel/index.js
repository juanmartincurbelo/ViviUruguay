import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './style.scss';

const images = [
    '/eventImages/Visita Teatro Solis/Visita Teatro Solis 2.jpg',
    '/eventImages/Visita Teatro Solis/Visita Teatro Solis.jpg',
    '/eventImages/Visita Teatro Solis/Visita Teatro Solis 2.jpg',
    '/eventImages/Visita Teatro Solis/Visita Teatro Solis.jpg',
];

function CarouselPhotos() {
    return (
        <div className="box">
            <Carousel
                useKeyboardArrows={true}
                thumbWidth={80} // Ajusta el tamaño de las miniaturas
            >
                {images.map((URL, index) => (
                    <div className="slide" key={index}>
                        <img
                            alt="sample_file"
                            src={URL}
                            style={{ marginTop: '0px' }} // Ajusta el margen superior
                        />
                    </div>
                ))}
            </Carousel>
        </div>
    );
}

export default CarouselPhotos;
