import React from 'react';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';

import { CardHeader, CardBlock, Card } from 'reactstrap';

export default ({ select, selectedDays }) => {
  return (
    <div>
      <Card>
        <CardHeader>Calendar</CardHeader>
        <CardBlock>
          <DayPicker
            onDayClick={day => select(day)}
            selectedDays={selectedDays.map(day => new Date(day))}
          />
        </CardBlock>
      </Card>
    </div>
  );
};
