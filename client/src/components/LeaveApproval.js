import React from 'react';

import { Card, Row, CardHeader, CardBlock, Col, Button, Badge } from 'reactstrap';

export default ({ data, select }) => {
  return (
    <div className="container">
      <CardBlock>
        <Row>
          {data.map(d => (
            <Col md={4} sm={12}>
              <Card>
                <CardHeader>
                  {d.category}{' '}
                  <Badge color={d.status === 'approved' ? 'success' : 'danger'} pill>
                    {d.status.toUpperCase()}
                  </Badge>{' '}
                </CardHeader>
                <CardBlock>{d.teacherName}</CardBlock>
                <Button outline color="primary" onClick={() => select(d)}>
                  {' '}
                  Details{' '}
                </Button>
              </Card>
            </Col>
          ))}
        </Row>
      </CardBlock>
    </div>
  );
};
