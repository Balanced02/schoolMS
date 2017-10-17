import React from 'react';
import { Table, Card, CardHeader, CardBlock } from 'reactstrap';
import moment from 'moment';

export default () => {
  return (
    <Card>
      <CardHeader> Time Table </CardHeader>
      <CardBlock>
        <Table hover bordered striped responsive>
          <thead>
            <tr>
              <th> Time </th>
              <th> Monday </th>
              <th> Tuesday </th>
              <th> Wednesday </th>
              <th> Thursday </th>
              <th> Friday </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th> 8:00am - 9:00am </th>
              <td> Mathematics - JSS 2A </td>
              <td> English Lang. - JSS 3B </td>
              <td> English Lang. - JSS 3B </td>
              <td> </td>
              <td> Inter. Science - JSS 2B </td>
            </tr>
          </tbody>
        </Table>
      </CardBlock>
    </Card>
  );
};
