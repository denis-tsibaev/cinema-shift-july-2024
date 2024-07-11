/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { Button } from '../components/Button';
import { getSchedule } from '../utils/api/serviceApi';
import { ScheduleByDayPage } from './ScheduleByDayPage';

export const SchedulePage = ({ setDay, time, setTime, tickets, setTickets }) => {
  const { filmId } = useParams();
  const [schedules, setSchedules] = useState([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    getSchedule(filmId).then(({ data }) => {
      setSchedules(data?.schedules);
    });
  }, [filmId]);

  return (
    <div className='movie-page'>
      <h1 className='schedule-title'>Расписание на {schedules[index]?.date} </h1>
      {schedules.map(({ date }, index) => (
        <Button
          className='schedule-button'
          key={index}
          onClick={() => {
            setIndex(index);
            setDay(schedules[index]?.date);
            toast.success(`Выбрана дата: ${schedules[index]?.date}`, { autoClose: 750 });
          }}
        >
          {date}
        </Button>
      ))}
      <h3 className='schedule-hall-to-choose'>Выберите время и зал</h3>

      <ScheduleByDayPage
        schedules={schedules}
        index={index}
        date={schedules[index]?.date}
        time={time}
        setTime={setTime}
        tickets={tickets}
        setTickets={setTickets}
      />
    </div>
  );
};
