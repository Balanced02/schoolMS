import React from 'react';

import { CardHeader, Table, Card, CardBlock } from 'reactstrap';

export default ({ data, select }) => {
  return (
    <div className="container-fluid">
      <Card>
        <CardHeader>Category List</CardHeader>
        <CardBlock>
          {data.searching ? (
            <i className="fa fa-spinner fa-spin fa-2x" />
          ) : !data.searching && !data.searchResults.length ? (
            <h4 style={{ textAlign: 'center', marginTop: 20, alignSelf: 'stretch', flex: 1 }}>
              No Category Found
            </h4>
          ) : (
            <Table responsive striped hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Title</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {data.searchResults.map((leave, i) => (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td> {leave.category} </td>
                    <td>
                      {' '}
                      <i
                        className="fa fa-pencil-square-o"
                        onClick={() => select(leave)}
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
