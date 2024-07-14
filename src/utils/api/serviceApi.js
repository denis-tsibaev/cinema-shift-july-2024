import axios from 'axios';

export const BASE_URL = 'https://shift-backend.onrender.com';
axios.defaults.baseURL = BASE_URL;

const token = {
  set(token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
  unset() {
    axios.defaults.headers.common.Authorization = '';
  }
};

export const getMoviesToday = () => axios.get('/cinema/today');

export const getMovie = (filmId) => axios.get(`/cinema/film/${filmId}`);

export const getSchedule = (filmId) => axios.get(`/cinema/film/${filmId}/schedule`);

export const getTickets = ({ filmId, person, debitCard, seance, tickets }) =>
  axios.post(`/cinema/payment`, { filmId, person, debitCard, seance, tickets });

export const getOtpCode = async (phone) => {
  try {
    const { data } = await axios.post('/auth/otp', {
      phone
    });
    return data;
  } catch (error) {
    console.error(error.message);
  }
};

export const userSignin = async (credentials) => {
  try {
    const { data } = await axios.post('/users/signin', credentials);
    token.set(data.token);
    return data;
  } catch (error) {
    console.error('проверьте код', error);
  }
};

export const getUserSession = () => axios.get('/users/session');

export const updateUser = (profile) => axios.patch('/users/profile', profile);

export const getOrders = () => axios.get('/cinema/orders');

export const cancelTicket = (orderId) => axios.put('/cinema/orders/cancel', { orderId });

// export const cancelResponse = async (orderId) => {
//   try {
//     const { data } = await axios.put('/cinema/orders/cancel', { orderId });
//     return data.then((data) => data);
//   } catch (error) {
//     // console.error(error.message);
//   }
// };
