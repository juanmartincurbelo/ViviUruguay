import * as React from 'react';
import ButtonForm from '../ButtonForm';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import DatePickerCalendar from 'src/components/DatePicker';
import './style.scss'

import mapa from './../../img/mapa.png';
import HourSelector from '../HourSelector';
import InputNumber from '../InputNumber';

import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const steps = ['Elige tu actividad', 'Completa tus datos', 'Realiza el pago'];

import CarouselPhotos from '../Carousel';

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

        if (requiredFieldsCompleted) {
            const newActiveStep = activeStep + 1;
            setActiveStep(newActiveStep);
        }
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleStep = (step) => () => {
        setActiveStep(step);
    };

    const handleComplete = () => {
        const newCompleted = completed;
        newCompleted[activeStep] = true;
        setCompleted(newCompleted);
        handleNext();
    };

    const handleReset = () => {
        setActiveStep(0);
        setCompleted({});
    };

    const checkRequiredFields = () => {
        // Implement your own logic to check if required fields are completed
        // For example, you can iterate through requiredFields and check their values
        // Return true if all required fields are completed, otherwise return false
    };

    return (
        <div>
            {selectedEvent !== null && (
                <Dialog
                    open={true}
                    onClose={handleClose}
                    onExited={() => setSelectedEvent(null)}
                    scroll={scroll}
                    aria-labelledby="scroll-dialog-title"
                    aria-describedby="scroll-dialog-description"
                    PaperProps={{
                        style: {
                            minWidth: '400px', // Ajusta el ancho según tus necesidades, en este caso 80% del ancho de la ventana
                            maxWidth: '50%',
                            maxHeight: '90vh', // Ajusta la altura máxima según tu necesidad
                            display: 'flex', // Use flexbox layout
                            flexDirection: 'column', // Asegúrate de usar una disposición de columna
                            marginTop: '30px', // Espacio en la parte superior
                            marginBottom: '0px', // Espacio en la parte inferior
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

                                <div className="button-container">
                                    {/* <DialogActions>
                                        <ButtonForm onClick={handleClose} text={"Cancelar"} color="#9b9b9b" />
                                        <ButtonForm onClick={handleClose} text={"Reservar"} color="#28b761" />
                                    </DialogActions> */}
                                </div>
                            </div>
                        </div>

                        <div>
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
