import React from 'react';

import { Form, FormGroup, Label, Input, Button, Badge } from 'reactstrap';

export default ({ data, edit, submit }) => {
  return (
    <Form>
      <FormGroup>
        <Label for="courseName">
          Course Name
          <span style={{ color: 'red' }}> *</span>
        </Label>
        <Input
          type="text"
          name="courseName"
          placeholder="Course name"
          value={data.courseName}
          onChange={edit}
        />
      </FormGroup>
      <FormGroup>
        <Label for="courseCode">
          Code
          <span style={{ color: 'red' }}> *</span>
        </Label>
        <Input
          type="text"
          name="courseCode"
          placeholder="ABC 123"
          value={data.courseCode}
          onChange={edit}
        />
      </FormGroup>
      <FormGroup>
        <Label for="minAttendance">
          Minimum Attendance Percentage
          <span style={{ color: 'red' }}> *</span>
        </Label>
        <Input
          type="text"
          name="minAttendance"
          placeholder="70"
          value={data.minAttendance}
          onChange={edit}
        />
      </FormGroup>
      <FormGroup>
        <Label for="description">Description</Label>
        <Input type="textarea" name="description" value={data.description} onChange={edit} />
      </FormGroup>
      <Button color="primary" onClick={submit}>
        Save
      </Button>
    </Form>
  );
};
