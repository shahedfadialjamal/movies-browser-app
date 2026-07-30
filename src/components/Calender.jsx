import { useState } from 'react';
import Calendar from 'react-calendar';

function MyCalendar({ setSelectedDate }) {
  const [show, setShow] = useState(false);
  const [date, setDate] = useState(new Date());

  function changeDate(newDate) {
    setDate(newDate);

    const formattedDate = newDate.toISOString().split('T')[0];

    setSelectedDate(formattedDate);
  }

  return (
    <div className="calendar-tab">
      <button onClick={() => setShow(!show)}>Calendar</button>

      {show && (
        <div className="calendar-popup">
          <Calendar value={date} onChange={changeDate} />
        </div>
      )}
    </div>
  );
}

export default MyCalendar;
