import React from 'react';
import { Table, Card, CardHeader, CardBlock, Button, InputGroup, Input, Form, FormGroup, CardBody } from 'reactstrap';
import moment from 'moment';


export default ({ edit, note, submit}) => {
  return (
    <Card>
      <CardHeader>
          <Input 
            type="text"
            onChange = {e => edit(e)}
            value = {note.body}
          />
          <Button color="primary" onClick={() => submit()}>Create</Button>
      </CardHeader>
    </Card>
  );
};
