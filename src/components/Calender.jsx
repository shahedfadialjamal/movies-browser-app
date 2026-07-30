import { useState } from 'react';
import Calendar from 'react-calendar';

function MyCalendar() {
  const [show, setShow] = useState(false);
  const [date, setDate] = useState(new Date());

  return (
    <div className="calendar-tab">
      <button
        className={show ? 'calendar-active' : ''}
        onClick={() => setShow(!show)}
      >
        Calendar
      </button>

      {show && (
        <div className="calendar-popup">
          <Calendar onChange={setDate} value={date} />
        </div>
      )}
    </div>
  );
}

export default MyCalendar;
