import React from 'react';

import { CardHeader, Table, Card, CardBlock } from 'reactstrap';

export default ({ data, select }) => {
  return (
    <div className="container-fluid">
      <Card>
        <CardHeader>Pay Head List</CardHeader>
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
                  <th>Type</th>
                  <th>%</th>
                  <th>Method</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {data.searchResults.map((payHead, i) => (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td> {payHead.payHeadType.toUpperCase()} </td>
                    <td> {payHead.percentage + '%'} </td>
                    <td>{payHead.method.toUpperCase()}</td>
                    <td>
                      {' '}
                      <i
                        className="fa fa-pencil-square-o"
                        onClick={() => select(payHead)}
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
