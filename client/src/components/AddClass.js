import React from 'react';

import { Form, FormGroup, Label, Input, Button, Badge } from 'reactstrap';

export default ({ data, edit, submit, teachers }) => {
  return (
    <Form>
      <FormGroup>
        <Label for="className">
          Class
          <span style={{ color: 'red' }}> *</span>
        </Label>
        <Input
          type="text"
          name="classTitle"
          placeholder="JSS 1A"
          value={data.classTitle}
          onChange={edit}
        />
      </FormGroup>
      <FormGroup>
        <Label for="maxStudents">
          Maximum No. of Students
          <span style={{ color: 'red' }}> *</span>
        </Label>
        <Input
          type="text"
          name="maxStudents"
          placeholder="30"
          value={data.maxStudents}
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
          <option selected disabled>
            Select One
          </option>
          {teachers.map((teacher, i) => (
            <option value={teacher.fullName} key={i}>
              {teacher.fullName}
            </option>
          ))}
        </Input>
      </FormGroup>
      <Button color="primary" onClick={submit}>
        Save
      </Button>
    </Form>
  );
};
