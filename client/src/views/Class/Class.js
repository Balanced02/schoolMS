import React, { Component } from 'react';
import { Card, Form, FormGroup, Input, Label, Button } from 'reactstrap';

class Department extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [],
    };
  }

  render() {
    return (
      <div className="animated fadeIn container">
        <Card>
          <Form>
            <FormGroup>
              <Label for="courseName">
                Course Name
                <span style={{ color: 'red' }}> *</span>
              </Label>
              <Input type="text" placeholder="Course name" />
            </FormGroup>
            <Button color="primary">Save</Button>
          </Form>
        </Card>
      </div>
    );
  }
}

export default Department;
