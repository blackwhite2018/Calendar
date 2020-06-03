import React from 'react';
import Calendar from './Calendar';
import './css/main.css';

const now = new Date(2017, 2, 8);

const App = () => (
    <Calendar date={ now } />
);

export default App;
