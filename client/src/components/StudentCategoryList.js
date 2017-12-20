import React from 'react';
import { Table, Card, CardHeader, CardBlock, CardText,  CardSubtitle, Row, Col, ListGroup, ListGroupItem, } from 'reactstrap';
import moment from 'moment';


export default ({data, searching}) => {
 
  return(
    <div>
    <Card>
      <CardHeader>
        <CardBlock>
          {data.searching ? (
        
            <i className="fa fa-spinner fa-spin fa-2x" />
        
          ) : !searching && !data.length ? (
            
            <h4 style={{ textAlign: 'center', marginTop: 20, alignSelf: 'stretch', flex: 1 }}>
              No  Categories
            </h4>
          
          ) : (
            
                 <ListGroup>
                   {data.map(function(studentCategory){
                        return <ListGroupItem key={studentCategory._id}>{studentCategory.category} | created on {moment(studentCategory.created).format('LL')}</ListGroupItem>;
                      })}
                 </ListGroup>
          )}
        </CardBlock>
      </CardHeader>
    </Card>
    </div>
  );
  
};