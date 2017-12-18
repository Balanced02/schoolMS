import React from 'react';

import { Form, FormGroup, Label, Input, Button, Badge } from 'reactstrap';

export default ({ data, edit, submit, teachers, loading }) => {
  return (
    <Form>
      <FormGroup>
        <Label for="classTitle">
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
        <Label for="teacher">
          Class Teacher
          <span style={{ color: 'red' }}> *</span>
        </Label>
        <Input
          type="select"
          name="teacher"
          placeholder="Class Teacher"
          value={data.teacher}
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
        Save {loading ? <i className="fa fa-2x fa-spinner fa-spin" /> : <i />}
      </Button>
    </Form>
  );
};
