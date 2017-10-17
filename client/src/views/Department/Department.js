import React, { Component } from 'react';
import { Card, Form, FormGroup, Input, Label, Button } from 'reactstrap';
import { connect } from 'react-redux';

import { callApi } from '../../utils';
import { showError, showInfo } from '../../actions/feedback';

class Department extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [],
    };
  }

  addDepartment() {
    this.props.dispatch(showInfo('Chill, working on this'));
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
            <Button color="primary" onClick={() => this.addDepartment()}>
              Save
            </Button>
          </Form>
        </Card>
      </div>
    );
  }
}

export default connect()(Department);
