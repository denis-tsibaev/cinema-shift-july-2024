/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button } from '../components/Button';
import { getSchedule } from '../utils/api/serviceApi';
import { ScheduleByDayPage } from './ScheduleByDayPage';

export const SchedulePage = ({ setFilmId, setDay, time, setTime, tickets, setTickets }) => {
  const { filmId } = useParams();
  setFilmId(filmId);

  const [schedules, setSchedules] = useState([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    getSchedule(filmId).then(({ data }) => {
      setSchedules(data?.schedules);
    });
  }, [filmId]);

  return (
    <div className='movie-page'>
      <h1 className='schedule-title'>Расписание</h1>
      {schedules.map(({ date }, index) => (
        <Button
          className='schedule-button'
          key={index}
          onClick={() => {
            setIndex(index);
            setDay(schedules[index]?.date);
          }}
        >
          {date}
        </Button>
      ))}
      <h2 className='schedule-date'>Выбрана дата: {schedules[index]?.date}</h2>
      <h3 className='schedule-hall-to-choose'>Выберите время и зал</h3>

      <ScheduleByDayPage
        schedules={schedules}
        index={index}
        time={time}
        setTime={setTime}
        tickets={tickets}
        setTickets={setTickets}
      />

      <ToastContainer />
    </div>
  );
};
