import React from 'react';

import './style.scss';
import Navbar from 'src/components/Navbar';
import CardProfile from 'src/components/CardProfile';

import juanmaImage from './../../img/juanma.jpg';
import sebaImage from './../../img/seba.jpg';
import linkedinLogo from './../../img/linkedin.png';
import CardDescription from 'src/components/CardDescription';

const AboutUs = () => {
    let nameJuan = "Juan Curbelo";
    let roleJuan = "Cofounder of Vivila";
    let descriptionJuan = "Cursando 4to año de Ingeniería en Sistemas en la Universidad ORT Uruguay."
    let linkedinJuan = "https://www.linkedin.com/in/juan-curbelo-37b231249/"

    let nameSeba = "Sebastian Rojí";
    let roleSeba = "Cofounder of Vivila";
    let descriptionSeba = "Cursando 4to año de Negocios Internacionales en la Universidad Católica delUruguay."
    let linkedinSeba = "https://www.linkedin.com/in/juan-curbelo-37b231249/"

    let title = "¿Quiénes somos?"
    let description1stParagraph = "Nuestra empresa surge de la iniciativa de jóvenes estudiantes que han identificado las carencias existentes en el sector de actividades destinadas a personas mayores de 60 años. Con el objetivo de abordar esta problemática, hemos decidido crear un sitio web innovador y funcional que centralice todas estas actividades en un solo lugar."
    let description2ndParagraph = "Nuestro principal propósito es impulsar la movilidad y la participación activa de las personas mayores de 60 años, brindándoles una plataforma accesible y amigable donde puedan explorar, buscar y reservar diversas actividades que se ajusten a sus intereses y preferencias."
    let description3rdParagraph = "A través de nuestro sitio web, buscamos facilitarles el proceso de encontrar actividades que se adapten a sus necesidades, gustos y habilidades. Además, nos esforzamos por garantizar que todas las actividades ofrecidas sean inclusivas, seguras y adaptadas a las capacidades físicas y emocionales de este grupo de edad."
    let description4thParagraph = "Nuestra plataforma se convertirá en un espacio virtual donde los usuarios podrán descubrir una amplia gama de opciones, desde cursos y talleres para adquirir nuevas habilidades, hasta salidas culturales, eventos sociales y turismo tanto a nivel nacional como internacional."
    let description5thParagraph = "Para asegurar la calidad de las actividades y la satisfacción de nuestros usuarios, trabajaremos en estrecha colaboración con proveedores y organizadores de eventos, estableciendo criterios y estándares rigurosos de selección. Asimismo, implementaremos un sistema de reseñas y valoraciones que permitirá a los usuarios compartir sus experiencias y recomendar actividades a otros miembros de la comunidad."
    let description6thParagraph = "Nuestro equipo está compuesto por jóvenes emprendedores comprometidos en mejorar la calidad de vida de las personas mayores de 60 años, reconociendo su importancia y el valor que aportan a la sociedad. Estamos entusiasmados por crear un espacio en línea que fomente su participación activa, promueva la socialización y proporcione oportunidades para el crecimiento personal y el disfrute de su tiempo libre."
    let description7thParagraph = "En resumen, nuestra empresa se ha desarrollado con la intención de suplir las carencias existentes en el sector de actividades para personas mayores de 60 años. A través de nuestro sitio web, buscamos impulsar su movilidad y bienestar, brindándoles una plataforma donde puedan encontrar, reservar y disfrutar de una amplia variedad de actividades adaptadas a sus necesidades e intereses."

    return (
        <div>
            <Navbar />
            <div className='card-container'>
                <CardProfile
                    name={nameJuan}
                    role={roleJuan}
                    description={descriptionJuan}
                    profileImg={juanmaImage}
                    linkedinLogo={linkedinLogo}
                    linkedinProfile={linkedinJuan}
                />
                <CardProfile
                    name={nameSeba}
                    role={roleSeba}
                    description={descriptionSeba}
                    profileImg={sebaImage}
                    linkedinLogo={linkedinLogo}
                    linkedinProfile={linkedinSeba}
                />
            </div>
        </div>
    );
};

export default AboutUs;