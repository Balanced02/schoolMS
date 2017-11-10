import React from 'react';

import { CardHeader, Table, Card, CardBlock } from 'reactstrap';

export default ({ data, select }) => {
  return (
    <div className="container-fluid">
      <Card>
        <CardHeader>Designation List</CardHeader>
        <CardBlock>
          {data.searching ? (
            <i className="fa fa-spinner fa-spin fa-2x" />
          ) : !data.searching && !data.searchResults.length ? (
            <h4 style={{ textAlign: 'center', marginTop: 20, alignSelf: 'stretch', flex: 1 }}>
              No User Categories Found
            </h4>
          ) : (
            <Table responsive striped hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Designation Name</th>
                  <th>User Type</th>
                  <th>Basic Salary</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {data.searchResults.map((user, i) => (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td> {user.category.toUpperCase()} </td>
                    <td>
                      {' '}
                      {user.userType === 'teacher'
                        ? 'TEACHING STAFF'
                        : user.userType === 'non-teaching'
                          ? 'NON-TEACHING STAFF'
                          : user.userType === 'admin' ? 'ADMIN' : ''}{' '}
                    </td>
                    <td> {user.salary} </td>
                    <td>
                      {' '}
                      <i
                        className="fa fa-pencil-square-o"
                        onClick={() => select(user)}
                        style={{ cursor: 'pointer' }}
                      />{' '}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </CardBlock>
      </Card>
    </div>
  );
};
