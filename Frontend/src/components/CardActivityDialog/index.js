import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import './style.scss'

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
                            minWidth: '400px',
                            maxWidth: '50%',
                            maxHeight: '80vh', // Ajusta la altura máxima según tu necesidad
                            display: 'flex', // Use flexbox layout
                        },
                    }}
                >
                    <DialogTitle id="scroll-dialog-title" className="custom-dialog-title">
                        <h2>{selectedEvent.name} <span>{selectedEvent.price}</span></h2>
                    </DialogTitle>
                    <DialogContent dividers={scroll === 'paper'}>
                        <img src={`/eventImages/${selectedEvent.name}/${selectedEvent.mainImage}`} className="dialog-image"></img>
                        <img src={`/eventImages/${selectedEvent.name}/${selectedEvent.previewImage}`} className="dialog-image"></img>
                        <DialogContentText id="scroll-dialog-description" ref={descriptionElementRef} tabIndex={-1}>
                            <div className='card-info'>
                                <h2>Descripción</h2>
                                <p>{selectedEvent.description}</p>
                            </div>
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button onClick={handleClose}>Subscribe</Button>
                    </DialogActions>
                </Dialog>
            )
            }
        </div >
    );
}
