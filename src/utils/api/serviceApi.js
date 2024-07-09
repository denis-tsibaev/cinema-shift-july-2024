import axios from 'axios';

export const BASE_URL = 'https://shift-backend.onrender.com';
axios.defaults.baseURL = BASE_URL;

export const getMoviesToday = () => axios.get('/cinema/today');

export const getMovie = (filmId) => axios.get(`/cinema/film/${filmId}`);

export const getSchedule = (filmId) => axios.get(`/cinema/film/${filmId}/schedule`);

export const getTickets = ({ filmId, person, debitCard, seance, tickets }) =>
  axios.post(`/cinema/payment`, { filmId, person, debitCard, seance, tickets });

export const getOrders = () => axios.get('/cinema/orders');
