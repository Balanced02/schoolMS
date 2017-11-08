import React from 'react';

import { CardHeader, Table, Card, CardBlock } from 'reactstrap';

export default ({ data }) => {
  return (
    <div>
      <Card>
        <CardHeader>Previous Applications</CardHeader>
        <CardBlock>
          <Table responsive striped hover bordered>
            <thead>
              <tr>
                <th>S/No.</th>
                <th>Category</th>
                <th>From</th>
                <th>To</th>
                <th>Status</th>
                <th>Manage</th>
              </tr>
            </thead>
            <tbody>
              {data.searching ? (
                <tr>
                  <td />
                  <td>
                    <i
                      className="fa fa-spinner fa-spin fa-2x"
                      style={{ flex: 1, textAlign: 'center' }}
                    />
                  </td>
                </tr>
              ) : !data.searching && !data.leaves.length ? (
                <h4 style={{ textAlign: 'center', marginTop: 20 }}>No Notices found</h4>
              ) : (
                data.leaves.map((leave, i) => (
                  <tr key={i}>
                    <td> {i + 1} </td>
                    <td> {leave.category} </td>
                    <td> {leave.startDate} </td>
                    <td> {leave.endDate} </td>
                    <td> {leave.status} </td>
                    <td>
                      {' '}
                      <i
                        className="fa fa-pencil-square-o"
                        onClick={() => select(leave)}
                        style={{ cursor: 'pointer' }}
                      />{' '}
                      <i
                        className="fa fa-eye"
                        style={{ color: 'green', cursor: 'pointer' }}
                        onClick={() => toggleModal(leave)}
                      />{' '}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>
        </CardBlock>
      </Card>
    </div>
  );
};
