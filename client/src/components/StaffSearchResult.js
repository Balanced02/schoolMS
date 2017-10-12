import React from 'react';
import moment from 'moment';

import { Row, Col, Table, Badge } from 'reactstrap';

export default () => {
  return (
    <Row>
      <Col md="12" xs="12">
        <Table hover responsive striped bordered size="lg">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Role</th>
              <th>Classes Taught</th>
              <th>Gender</th>
              <th>DOB</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ cursor: 'pointer' }}>
              <td> LS224 </td>
              <td> Umwevemvem Ugbenubem </td>
              <td> Head Teacher </td>
              <td> JSS 1, JSS 2, JSS 3 </td>
              <td> M </td>
              <td>13th October, 2019</td>
            </tr>
            <tr style={{ cursor: 'pointer' }}>
              <td> LS225 </td>
              <td> Olayiwola Ogbonna </td>
              <td> Class Teacher </td>
              <td> JSS 2, JSS 3, SSS 1 </td>
              <td> F </td>
              <td> 5th December, 2012 </td>
            </tr>
          </tbody>
        </Table>
      </Col>
    </Row>
  );
};
