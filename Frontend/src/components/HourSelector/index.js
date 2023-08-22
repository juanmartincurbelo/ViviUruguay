import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const HorarioSelector = () => {
    const [horario, setHorario] = React.useState(10); // Establece el valor inicial como 10 (11:30)

    const handleChange = (event) => {
        setHorario(event.target.value);
    };

    return (
        <Box sx={{ minWidth: 120 }} >
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Horario</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={horario}
                    label="Horario"
                    onChange={handleChange}
                >
                    <MenuItem value={10}>11:30</MenuItem>
                    <MenuItem value={20}>15:30</MenuItem>
                </Select>
            </FormControl>
        </Box >
    );
}

export default HorarioSelector;
