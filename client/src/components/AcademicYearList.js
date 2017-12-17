import React from 'react';
import moment from 'moment';

import { CardHeader, Table, Card, CardBlock } from 'reactstrap';

export default ({ data, select }) => {
  return (
    <div className="container-fluid">
      <Card>
        <CardHeader>Academic Details</CardHeader>
        <CardBlock>
          {data.searching ? (
            <i className="fa fa-spinner fa-spin fa-2x" />
          ) : !data.searching && !data.searchResults.length ? (
            <h4 style={{ textAlign: 'center', marginTop: 20, alignSelf: 'stretch', flex: 1 }}>
              No Departments Found
            </h4>
          ) : (
            <Table responsive striped hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Start</th>
                  <th>End</th>
                  <th>Status></th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {data.searchResults.map((dat, i) => (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td> {moment(dat.startYear).format('MMM YYYY')} </td>
                    <td> {moment(dat.endYear).format('MMM YYYY')} </td>
                    <td>{dat.status}</td>
                    <td>
                      {' '}
                      <i
                        className="fa fa-pencil-square-o"
                        onClick={() => select(dat)}
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
