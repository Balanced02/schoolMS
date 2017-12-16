import React from 'react';

import { Form, FormGroup, Label, Input, Button, Badge } from 'reactstrap';

export default ({ data, edit, submit}) => {
  return (
    <Form>
      <FormGroup>
        <Label for="category">
          Student Category
          <span style={{ color: 'red' }}> *</span>
        </Label>
        <Input
          type="text"
          name="category"
          value={data.category}
          onChange={edit}
        />
      </FormGroup>
      <Button color="primary" onClick={submit}>
        Save
      </Button>
    </Form>
  );
};
