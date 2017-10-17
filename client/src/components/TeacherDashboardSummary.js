import React from 'react';

import { Row, Col, Card, CardBlock } from 'reactstrap';

export default ({ data }) => {
  return (
    <Row>
      <Col xs="12" sm="6" lg="3">
        <Card className="text-white bg-danger">
          <CardBlock
            className="card-body pb-0"
            style={{
              height: '100px',
            }}
          >
            <span className="fa fa-graduation-cap fa-4x float-right" />
            <h4 className="mb-0">
              {data.searching ? <i className="fa fa-spinner fa-spin" /> : data.totalStudents}{' '}
            </h4>{' '}
            <p> Class Students </p>
          </CardBlock>
        </Card>
      </Col>
      <Col xs="12" sm="6" lg="3">
        <Card className="text-white bg-warning">
          <CardBlock
            className="card-body pb-0"
            style={{
              height: '100px',
            }}
          >
            <span className="fa fa-pencil-square fa-4x float-right" />
            <h4 className="mb-0">
              <h4 className="mb-0">
                {data.searching ? <i className="fa fa-spinner fa-spin" /> : data.pendingReg}{' '}
              </h4>
            </h4>
            <p> Assigned Courses </p>
          </CardBlock>
        </Card>
      </Col>
      <Col xs="12" sm="6" lg="3">
        <Card className="text-white bg-info">
          <CardBlock
            className="card-body pb-0"
            style={{
              height: '100px',
            }}
          >
            <span className="fa fa-users fa-4x float-right" />
            <h4 className="mb-0">
              {data.searching ? <i className="fa fa-spinner fa-spin" /> : data.totalStaff}{' '}
            </h4>
            <p> Active Todo </p>
          </CardBlock>
        </Card>
      </Col>
      <Col xs="12" sm="6" lg="3">
        <Card className="text-white bg-primary">
          <CardBlock
            className="card-body pb-0"
            style={{
              height: '100px',
            }}
          >
            <span className="fa fa-envelope fa-4x float-right" />
            <h4 className="mb-0">
              {data.searching ? <i className="fa fa-spinner fa-spin" /> : 0}{' '}
            </h4>
            <p> Unread Messages </p>
          </CardBlock>
        </Card>
      </Col>
    </Row>
  );
};
