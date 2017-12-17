import React from 'react';
import { Table, Card, CardHeader, CardBlock, CardText,  CardSubtitle, Row, Col, ListGroup, ListGroupItem, } from 'reactstrap';
import moment from 'moment';


export default ({data}) => {
 
  return(
     <Row>
          {data.searching ? (
          <Col>
            <i className="fa fa-spinner fa-spin fa-2x" />
          </Col>
          ) : !data.searching && !data.categories.length ? (
            <Col>
            <h4 style={{ textAlign: 'center', marginTop: 20, alignSelf: 'stretch', flex: 1 }}>
              No  Categories
            </h4>
            </Col>
          ) : (
            <Col>
                 <ListGroup>
                   {data.categories.map(function(studentCategory){
                        return <ListGroupItem key={studentCategory._id}>{studentCategory.category} | created on {moment(studentCategory.created).format('LL')}</ListGroupItem>;
                      })}
                 </ListGroup>
            </Col>
          )}
        </Row>
  
  );
  
};