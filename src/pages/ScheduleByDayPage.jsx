/* eslint-disable react/prop-types */
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { Button } from '../components/Button';
import { SeatsPage } from './SeatsPage';

// eslint-disable-next-line react/prop-types
export const ScheduleByDayPage = ({ schedules, index, time, setTime, tickets, setTickets }) => {
  const [hallName, setHallName] = useState('Red');
  const [places, setPlaces] = useState([]);

  return (
    <>
      <div className='schedule-container'>
        <ol className='dateList'>
          {schedules[index]?.seances?.map(({ time, hall }, i) => (
            <li key={i} className='dateItem'>
              <Button
                className='hall-name-button'
                style={{ backgroundColor: hall.name }}
                onClick={() => {
                  //   console.log('places-array: ', schedules[index].seances[i].hall.name);
                  setHallName(schedules[index]?.seances[i]?.hall?.name);
                  setPlaces(schedules[index].seances[i]?.hall.places);
                  setTime(time);
                  toast.info(`${hall.name} - ${time}`, { autoClose: 750 });
                }}
              >
                {time}-
                {hall.name === 'Red'
                  ? 'Красный зал'
                  : hall.name === 'Green'
                    ? 'Зелёный зал'
                    : hall.name === 'Blue'
                      ? 'Синий зал'
                      : hall.name}
              </Button>
            </li>
          ))}
        </ol>
        <div className='hall-info'>
          <p className='hall-name'>
            {hallName === 'Red' ? 'Красный' : hallName === 'Green' ? 'Зелёный' : 'Синий'} Зал
          </p>
          <p className='hall-seats'>
            {hallName === 'Red' ? 36 : hallName === 'Green' ? 100 : hallName === 'Blue' ? 198 : 0}{' '}
            Мест
          </p>
        </div>
      </div>
      <SeatsPage
        hallName={hallName}
        places={places}
        time={time}
        tickets={tickets}
        setTic
        kets={setTickets}
      />
      <ToastContainer />
    </>
  );
};
