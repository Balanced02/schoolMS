import React from 'react';

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
            <i className="fa fa-spinner fa-spin fa-2x" />
          ) : !data.notice ? (
            <h4 style={{ textAlign: 'center', marginTop: 20 }}>No Notices found</h4>
          ) : (
            data.notices.map((notice, i) => (
              <tr key={i}>
                <td> {notice.date} </td>
                <td> {notice.body} </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </div>
  );
};
