import React from 'react';

import { Form, FormGroup, Label, Input, Button, Badge } from 'reactstrap';

export default ({ data, edit, submit }) => {
  return (
    <Form>
      <FormGroup>
        <Label for="className">
          Class
          <span style={{ color: 'red' }}> *</span>
        </Label>
        <Input
          type="text"
          name="className"
          placeholder="JSS 1"
          value={data.courseName}
          onChange={edit}
        />
      </FormGroup>
      <FormGroup>
        <Label for="courseName">
          Class Teacher
          <span style={{ color: 'red' }}> *</span>
        </Label>
        <Input
          type="select"
          name="teacher"
          placeholder="Course name"
          value={data.courseName}
          onChange={edit}
        >
          <option>Mr. Abdulkadir</option>
        </Input>
      </FormGroup>
      <Button color="primary" onClick={submit}>
        Save
      </Button>
    </Form>
  );
};
