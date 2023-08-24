import * as React from 'react';
import ButtonForm from '../ButtonForm';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import TextField from '@mui/material/TextField';

import DatePickerCalendar from 'src/components/DatePicker';
import mapa from './../../img/mapa.png';
import HourSelector from '../HourSelector';
import InputNumber from '../InputNumber';

import './style.scss'


const steps = ['Elige tu actividad', 'Completa tus datos', 'Realiza el pago'];

import CarouselPhotos from '../Carousel';
import CardReservation from '../CardReservation';

export default function CardActivityDialog({ selectedEvent, onClose }) {
    const [scroll, setScroll] = React.useState('paper');

    const descriptionElementRef = React.useRef(null);
    React.useEffect(() => {
        const { current: descriptionElement } = descriptionElementRef;
        if (descriptionElement !== null) {
            descriptionElement.focus();
        }
    }, []);

    const handleClose = () => {
        onClose();
        resetSteps();
    };

    /* STEPPER */
    const [activeStep, setActiveStep] = React.useState(0);
    const [completed, setCompleted] = React.useState({});
    const [requiredFields, setRequiredFields] = React.useState({});

    const totalSteps = () => {
        return steps.length;
    };

    const completedSteps = () => {
        return Object.keys(completed).length;
    };

    const isLastStep = () => {
        return activeStep === totalSteps() - 1;
    };

    const allStepsCompleted = () => {
        return completedSteps() === totalSteps();
    };

    const handleNext = () => {
        const requiredFieldsCompleted = checkRequiredFields();

        if (activeStep == 3) {
            return;
        }

        if (requiredFieldsCompleted) {
            const newActiveStep = activeStep + 1;
            setActiveStep(newActiveStep);
        }
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const checkRequiredFields = () => {
        return true;
    };

    const resetSteps = () => {
        setActiveStep(0);
    }

    return (
        <div>
            {selectedEvent !== null && (
                <Dialog
                    open={true}
                    onClose={handleClose}
                    scroll={scroll}
                    aria-labelledby="scroll-dialog-title"
                    aria-describedby="scroll-dialog-description"
                    PaperProps={{
                        style: {
                            minWidth: '50%',
                            maxWidth: '50%',
                            height: '90vh',
                            display: 'flex',
                            flexDirection: 'column',
                            marginTop: '30px',
                            marginBottom: '0px',
                        },
                    }}
                >
                    <DialogContent dividers={scroll === 'paper'}>
                        {/* STEPPER TOP*/}
                        <Stepper nonLinear activeStep={activeStep}>
                            {steps.map((label, index) => (
                                <Step key={label} completed={completed[index]}>
                                    <StepButton color="inherit">
                                        {label}
                                    </StepButton>
                                </Step>
                            ))}
                        </Stepper>
                        {/*  */}

                        {activeStep === 0 && (
                            <div>
                                <div className='dialog-title'>
                                    <h1>{selectedEvent.name} <span>{selectedEvent.price}</span></h1>
                                </div>
                                <CarouselPhotos />
                                <div className='card-content'>
                                    <div className='card-description'>
                                        <h2>Descripción</h2>
                                        <p>{selectedEvent.description}</p>
                                        <h2>¿Dónde es la actividad?</h2>
                                        <img className='map-container' src={mapa} />
                                    </div>
                                    <div className='right-container'>
                                        <div className="date-picker-container">
                                            <DatePickerCalendar></DatePickerCalendar>
                                        </div>

                                        <div className="selector-container">
                                            <HourSelector />
                                            <InputNumber />
                                        </div>
                                        <h2>Total: <span>$2780</span></h2>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeStep === 1 && (
                            <div>
                                <CardReservation
                                    title='Detalles de la reserva:'
                                    name={selectedEvent.name}
                                    date='19 de enero de 2024'
                                    hour='15:00 hs.'
                                    quantity='2 Adultos'
                                    price='Total: $2780'

                                    imageActivity='/eventImages/Tour Bodega Garzón/Tour Bodega Garzon 2.jpg' />

                                <div className='dialog-title-complete'>
                                    <h2>Completa sus datos</h2>
                                </div>
                                <div className='card-content-personalInfo'>
                                    <div className="text-field-group">
                                        <TextField
                                            required
                                            id="outlined-required-1"
                                            label="Cédula de identidad"
                                        />
                                        <TextField
                                            required
                                            id="outlined-required-2"
                                            label="Nombre y apellido"
                                        />
                                    </div>
                                    <div className="text-field-group">
                                        <TextField
                                            required
                                            id="outlined-required-3"
                                            label="Celular"
                                        />
                                        <TextField
                                            required
                                            id="outlined-required-4"
                                            label="Mail"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}


                        <div className="action-buttons">
                            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                                <ButtonForm
                                    color="#9b9b9b"
                                    disabled={activeStep === 0}
                                    onClick={handleBack}
                                    sx={{ mr: 1 }}
                                    text={"ATRÁS"}
                                />
                                <Box sx={{ flex: '1 1 auto' }} />
                                <ButtonForm
                                    onClick={handleNext}
                                    sx={{ mr: 1 }}
                                    text={"SIGUIENTE"}
                                    color="#28b761"
                                />
                            </Box>
                        </div>

                    </DialogContent>
                </Dialog>

            )
            }
        </div >
    );
}
