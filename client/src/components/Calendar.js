import React from 'react';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';

import { CardHeader, CardBlock } from 'reactstrap';

export default ({ select, selectedDays }) => {
  return (
    <div>
      <CardHeader>Calendar</CardHeader>
      <CardBlock>
        <DayPicker
          onDayClick={day => select(day)}
          selectedDays={selectedDays.map(day => new Date(day))}
        />
      </CardBlock>
    </div>
  );
};
