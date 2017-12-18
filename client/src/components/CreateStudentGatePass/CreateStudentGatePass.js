<<<<<<< HEAD
import React from 'react';

import { Form, FormGroup, Label, Input, Button, Badge, Col } from 'reactstrap';
=======
import React from "react";

import {
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Badge,
  Col,
  Row
} from "reactstrap";
>>>>>>> 01ba8c60c39f7a915a54fbd7a8feeff51929de31

export default ({ data, edit, submit }) => {
  return (
    <Form>
      <FormGroup>
        <Label for="studentName">
          Student Name
          <span style={{ color: "red" }}> *</span>
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
        <Row>
          <Col xs={12} sm={4}>
            <Label for="personName">
              Person Name
              <span style={{ color: "red" }}> *</span>
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
              <span style={{ color: "red" }}> *</span>
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
              <span style={{ color: "red" }}> *</span>
            </Label>
            <Input
              type="date"
              name="issueDate"
              value={data.issueDate}
              onChange={edit}
            />
          </Col>
        </Row>
      </FormGroup>
      <FormGroup>
        <Label for="reason">
          Reason
          <span style={{ color: "red" }}> *</span>
        </Label>
        <Input
          type="textarea"
          name="reason"
          placeholder="Reason for the gate pass"
          value={data.reason}
          onChange={edit}
        />
      </FormGroup>

      <Button color="primary" onClick={submit}>
        Save
      </Button>
    </Form>
  );
};
