import React from 'react';
import moment from 'moment';

import { Row, Col, Table } from 'reactstrap';

export default ({ visitors }) => {
  return (
    <Row>
      <Col md="12" xs="12">
        <Table hover responsive striped size="lg">
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Address</th>
              <th>Number</th>
              <th>Visiting</th>
              <th>Time In</th>
              <th>Time Out</th>
            </tr>
          </thead>
          <tbody>
            {visitors.map((visitor, i) => (
              <tr style={{ cursor: 'pointer' }}>
                <td> {i + 1} </td>
                <td> {visitor.visitorName} </td>
                <td> {visitor.address} </td>
                <td> {visitor.phoneNumber} </td>
                <td> {visitor.visiting} </td>
                <td> {moment(visitor.timeIn).format('Do MMM, h:mm a')} </td>
                <td> {visitor.timeOut ? moment(visitor.timeOut).format('Do MMM, h:mm a') : ''} </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Col>
    </Row>
  );
};
