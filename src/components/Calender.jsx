import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

function MyCalendar({ fromDate, toDate, setFromDate, setToDate }) {
  const [showCalendar, setShowCalendar] = useState(false);
  const [activeField, setActiveField] = useState(null);

  function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }

  function changeDate(date) {
    const formatted = formatDate(date);

    if (activeField === 'from') {
      setFromDate(formatted);
    }

    if (activeField === 'to') {
      setToDate(formatted);
    }
    setShowCalendar(false);
  }

  return (
    <div style={{ display: 'inline-block', marginLeft: '10px' }}>
      <button
        style={{
          padding: '8px 15px',
          margin: '5px',
          cursor: 'pointer',
        }}
        onClick={() => {
          setActiveField('from');
          setShowCalendar(true);
        }}
      >
        {fromDate ? fromDate : 'From'}
      </button>

      <button
        style={{
          padding: '8px 15px',
          margin: '5px',
          cursor: 'pointer',
        }}
        onClick={() => {
          setActiveField('to');
          setShowCalendar(true);
        }}
      >
        {toDate ? toDate : 'To'}
      </button>

      {showCalendar && (
        <div
          style={{
            position: 'absolute',
            zIndex: 9999,
            background: '#fff',
            color: '#000',
            padding: '10px',
            borderRadius: '10px',
          }}
        >
          <Calendar onChange={changeDate} />
        </div>
      )}
    </div>
  );
}

export default MyCalendar;
