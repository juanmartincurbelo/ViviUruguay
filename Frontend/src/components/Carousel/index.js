import React from 'react';
import Carousel from "@itseasy21/react-elastic-carousel";

import './style.scss';

const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 600, itemsToShow: 2 },
    { width: 1000, itemsToShow: 3 },
    { width: 1400, itemsToShow: 4 },
];

const CarouselPhotos = ({
    events,
}) => {

    return (
        <div className='carousel-container'>
            <Carousel breakPoints={breakPoints} pagination={false}>
                {events}
                {events}
                {events}
                {events}
                {events}
                {events}
                {events}
                {events}
            </Carousel >
        </div >
    );
}

export default CarouselPhotos;
