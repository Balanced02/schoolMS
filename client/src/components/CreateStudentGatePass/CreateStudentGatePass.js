import React from 'react';

import { Form, FormGroup, Label, Input, Button, Badge, Col } from 'reactstrap';

export default ({ data, edit, submit }) => {
  return (
    <Form>
      <FormGroup>
        <Label for="studentName">
          Student Name
          <span style={{ color: 'red' }}> *</span>
        </Label>
        <Input
          type="text"
          name="studentName"
          placeholder="Student's Name"
          value={data.studentName}
          onChange={edit}
        />
      </FormGroup>

      <FormGroup>
      <Col xs={12} sm={4}>
        <Label for="personName">
          Person Name
          <span style={{ color: 'red' }}> *</span>
        </Label>
        <Input
          type="text"
          name="personName"
          placeholder="Person's Name"
          value={data.personName}
          onChange={edit}
        />
        </Col>
        <Col xs={12} sm={4}>
         <Label for="contactNumbers">
          Contact Number
          <span style={{ color: 'red' }}> *</span>
        </Label>
        <Input
          type="text"
          name="contactNumber"
          placeholder="08036171715"
          value={data.contactNumber}
          onChange={edit}
        />
        </Col>
        <Col xs={12} sm={4}>
          <Label for="issueDate">
          Date
          <span style={{color: 'red'}}> *</span>
          </Label>
          <Input
          type="date"
          name="issueDate"
          value={data.issueDate}
          onChange={edit}
          />
        </Col>
      </FormGroup>
       <FormGroup>
        <Label for="reason">
          Reason
          <span style={{ color: 'red' }}> *</span>
        </Label>
        <Input
          type="textarea"
          name="reason"
          placeholder="Reason for the gate pass"
          value={data.reason}
          onChange={edit}
        />
      </FormGroup>
       <FormGroup>
        <Label for="employeeName">
          Employee Name
          <span style={{ color: 'red' }}> *</span>
        </Label>
        <Input
          type="text"
          name="employeeName"
          placeholder="Employee Name"
          value={data.employeeName}
          onChange={edit}
        />
      </FormGroup>
      <Button color="primary" onClick={submit}>
        Save
      </Button>
    </Form>
  );
};
