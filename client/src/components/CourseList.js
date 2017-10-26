import React from 'react';
import ViewCourseModal from './ViewCourseModal';

import { CardHeader, Table, Card, CardBlock } from 'reactstrap';

export default ({ data, select, toggleModal }) => {
  return (
    <div className="container-fluid">
      <Card>
        <CardHeader>COURSE LIST</CardHeader>
        <CardBlock>
          {data.searching ? (
            <i className="fa fa-spinner fa-spin fa-2x" />
          ) : !data.searching && !data.courses.length ? (
            <h4 style={{ textAlign: 'center', marginTop: 20, alignSelf: 'stretch', flex: 1 }}>
              No Courses Found
            </h4>
          ) : (
            <Table responsive striped hover bordered>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Code</th>
                  <th>Title</th>
                  <th>Min. Attd.</th>
                  <th>Manage</th>
                </tr>
              </thead>
              <tbody>
                {data.courses.map((course, i) => (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td> {course.courseCode} </td>
                    <td> {course.courseName} </td>
                    <td> {course.minAttendance || ''} </td>
                    <td>
                      {' '}
                      <i
                        className="fa fa-pencil-square-o"
                        onClick={() => select(course)}
                        style={{ cursor: 'pointer' }}
                      />{' '}
                      <i
                        className="fa fa-eye"
                        style={{ color: 'green', cursor: 'pointer' }}
                        onClick={() => toggleModal(course)}
                      />{' '}
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
