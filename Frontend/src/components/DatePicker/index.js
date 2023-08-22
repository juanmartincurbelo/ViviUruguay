import * as React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import dayjs from 'dayjs';
import 'dayjs/locale/es'; // Importa el adaptador de idioma español

export default function DatePickerCalendar() {
    const currentDate = dayjs();

    // // Establece el idioma de Day.js en español
    // dayjs.locale('es');

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateCalendar
                minDate={currentDate}
            />
        </LocalizationProvider>
    );
}
