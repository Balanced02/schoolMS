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
              <th>S/N</th>
              <th>Roll No..</th>
              <th>Admission Number</th>
              <th>Student Name</th>
              <th>Admission Date</th>
              <th>Course</th>
              <th>Batch</th>
              <th>Manage</th>
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
              <h4 style={{ textAlign: 'center', marginTop: 20 }}>No Students</h4>
            ) : (
              data.map((student, i) => (
                <tr style={{ cursor: 'pointer' }}>
                  <td> {i + 1} </td>
                  <td> {student.fullName} </td>
                  <td> {student.classInfo} </td>
                  <td> {student.gender === 'M' ? 'Male' : student.gender === 'F' ? 'Female' : ''} </td>
                  <td> {moment(student.dob).format('MMM Do')} </td>
                  <td> {student.phoneNumber} </td>
                  <td> {student.email} </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      </Col>
    </Row>
  );
};
