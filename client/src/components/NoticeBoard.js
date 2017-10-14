import React from 'react';
import moment from 'moment';

import { CardHeader, Table } from 'reactstrap';

export default ({ data }) => {
  return (
    <div>
      <CardHeader>Notice Board</CardHeader>
      <Table responsive striped hover>
        <thead>
          <tr>
            <th>DATE</th>
            <th>NOTICE</th>
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
          ) : !data.searching && !data.notices.length ? (
            <h4 style={{ textAlign: 'center', marginTop: 20 }}>No Notices found</h4>
          ) : (
            data.notices.map((notice, i) => (
              <tr key={i}>
                <td> {moment(notice.date).format('Do MMM')} </td>
                <td> {notice.body} </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </div>
  );
};
