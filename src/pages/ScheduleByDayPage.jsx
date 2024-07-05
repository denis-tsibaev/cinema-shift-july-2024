/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Button } from '../components/Button';
import { SeatsPage } from './SeatsPage';

export const ScheduleByDayPage = ({
  schedules,
  index,
  hallName,
  setHallName,
  places,
  setPlaces,
  time,
  setTime,
  tickets,
  setTickets,
  totalPrice,
  setTotalPrice
}) => {
  //   console.log('hallName', hallName);
  //   console.log('places', places);

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
                  console.log('places-array: ', schedules[index].seances[i].hall.places);
                  setHallName(schedules[index]?.seances[i]?.hall?.name);
                  setPlaces(schedules[index].seances[i]?.hall.places);
                  setTime(time);
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
        setTickets={setTickets}
        totalPrice={totalPrice}
        setTotalPrice={setTotalPrice}
      />
    </>
  );
};
