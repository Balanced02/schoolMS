import React from 'react';
<<<<<<< HEAD

import { CardHeader, Table, Card, CardBlock } from 'reactstrap';

export default ({ data}) => {
=======
import moment from 'moment';

import { CardHeader, Table, Card, CardBlock } from 'reactstrap';

export default ({ data }) => {
>>>>>>> 01ba8c60c39f7a915a54fbd7a8feeff51929de31
  return (
    <div className="container-fluid" style={{ paddingTop: 15 }}>
      <Card>
        <CardHeader>GATE PASS LIST</CardHeader>
        <CardBlock>
          {data.searching ? (
            <i className="fa fa-spinner fa-spin fa-2x" />
          ) : !data.searching && !data.studentGatePasses.length ? (
            <h4 style={{ textAlign: 'center', marginTop: 20, alignSelf: 'stretch', flex: 1 }}>
              No Gate Passes
            </h4>
          ) : (
            <Table responsive striped hover bordered>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Student Name</th>
                  <th>Contact Number</th>
                  <th>Person Name</th>
                  <th>Employee Name</th>
                  <th>Reason</th>
                  <th>Issue Date</th>
                </tr>
              </thead>
              <tbody>
<<<<<<< HEAD
              {data.studentGatePasses.map(function(gatePass,i){
                        return (
                         <tr key={gatePass._id}>
                    <td> {i + 1} </td>
                    <td> {gatePass.studentName} </td>
                    <td> {gatePass.contactNumber} </td>
                    <td> {gatePass.personName} </td>
                    <td> {gatePass.employeeName} </td>
                    <td> {gatePass.reason} </td>
                    <td> {gatePass.issueDate} </td>
                  </tr>
                        )
                      })}
=======
                {data.studentGatePasses.map(function(gatePass, i) {
                  return (
                    <tr key={gatePass._id}>
                      <td> {i + 1} </td>
                      <td> {gatePass.studentName} </td>
                      <td> {gatePass.contactNumber} </td>
                      <td> {gatePass.personName} </td>
                      <td> {gatePass.employeeName} </td>
                      <td> {gatePass.reason} </td>
                      <td> {moment(gatePass.issueDate).format('MMM Do YY')} </td>
                    </tr>
                  );
                })}
>>>>>>> 01ba8c60c39f7a915a54fbd7a8feeff51929de31
              </tbody>
            </Table>
          )}
        </CardBlock>
      </Card>
    </div>
  );
};
