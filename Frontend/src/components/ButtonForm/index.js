import * as React from 'react';
import Button from '@mui/material/Button';

const ButtonCard = ({
    text,
    color
}) => (
    <Button style={{ backgroundColor: color, color: 'white', fontWeight: 'bold' }}>
        {text}
    </Button >
);

export default ButtonCard;