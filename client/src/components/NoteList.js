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
          ) : !data.searching && !data.notes.length ? (
            <Col>
            <h4 style={{ textAlign: 'center', marginTop: 20, alignSelf: 'stretch', flex: 1 }}>
              No  Notes Found
            </h4>
            </Col>
          ) : (
            <Col>
                 <ListGroup>
                   {data.notes.map(function(note){
                        return <ListGroupItem key={note._id}>{note.body} | created on {moment(note.created).format('LL')}</ListGroupItem>;
                      })}
                 </ListGroup>
            </Col>
          )}
        </Row>
  
  );
  
};