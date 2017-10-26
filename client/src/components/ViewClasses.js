import React from 'react';

import { CardHeader, Table, Card, CardBlock } from 'reactstrap';

export default ({ data, select }) => {
  return (
    <div className="container-fluid">
      <Card>
        <CardHeader>CLASS LIST</CardHeader>
        <CardBlock>
          {data.searching ? (
            <i className="fa fa-spinner fa-spin fa-2x" />
          ) : !data.searching && !data.classes.length ? (
            <h4 style={{ textAlign: 'center', marginTop: 20, alignSelf: 'stretch', flex: 1 }}>
              No Class Found
            </h4>
          ) : (
            <Table responsive striped hover bordered>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Class</th>
                  <th>Teacher</th>
                  <th>No.</th>
                  <th>Manage</th>
                </tr>
              </thead>
              <tbody>
                {data.classes.map((classInfo, i) => (
                  <tr key={i}>
                    <td> {i + 1} </td>
                    <td> {classInfo.classTitle} </td>
                    <td> {classInfo.teacher} </td>
                    <td> {classInfo.students} </td>
                    <td>
                      <i
                        className="fa fa-pencil-square-o"
                        onClick={() => select(classInfo)}
                        style={{ cursor: 'pointer' }}
                      />
                      <i className="fa fa-eye" style={{ color: 'green', cursor: 'pointer' }} />{' '}
                      <i
                        className="fa fa-trash"
                        id={'Popover' + i}
                        style={{ color: 'red', cursor: 'pointer' }}
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
