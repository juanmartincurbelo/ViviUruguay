import * as React from 'react';
import Button from '@mui/material/Button';

const ButtonCard = ({
    text,
    color,
    onClick
}) => (
    <Button style={{ backgroundColor: color, color: 'white', fontWeight: 'bold' }} onClick={onClick}>
        {text}
    </Button >
);

export default ButtonCard;