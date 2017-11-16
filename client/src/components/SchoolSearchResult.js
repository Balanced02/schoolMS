import React from 'react';
import moment from 'moment';

import { Row, Col, Table } from 'reactstrap';

export default ({ data, searching }) => {
  return (
    <Row>
      <Col md="12" xs="12">
        <Table hover responsive striped size="lg">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Founded</th>
              <th>Phone No.</th>
              <th>E-mail</th>
              <th>Joined</th>
            </tr>
          </thead>
          <tbody>
            {searching ? (
              <tr>
                <td />
                <td />
                <td />
                <td>
                  <i
                    className="fa fa-spinner fa-spin fa-2x"
                    style={{ flex: 1, textAlign: 'center', margin: 10, width: '100%' }}
                  />
                </td>
              </tr>
            ) : !searching && !data.length ? (
              <h4 style={{ textAlign: 'center', marginTop: 20 }}>No Teachers</h4>
            ) : (
              data.map((schl, i) => (
                <tr style={{ cursor: 'pointer' }}>
                  <td> {i + 1} </td>
                  <td> {schl.schoolName} </td>
                  <td> {schl.founded} </td>
                  <td> {schl.phoneNumber} </td>
                  <td> {schl.email} </td>
                  <td> {moment(schl.created).format('MMM Do YY')} </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </Col>
    </Row>
  );
};
