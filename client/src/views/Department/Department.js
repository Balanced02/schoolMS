import React, { Component } from 'react';
import {
  Card,
  Form,
  FormGroup,
  Input,
  Label,
  Button,
  Row,
  Col,
  CardBlock,
  CardHeader,
} from 'reactstrap';
import { connect } from 'react-redux';

import { callApi } from '../../utils';
import { showError, showInfo } from '../../actions/feedback';
import DepartmentList from '../../components/DepartmentList';

class Department extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        searchResults: [],
        searching: true,
      },
      department: { departmentTitle: '' },
    };
  }

  addDepartment() {
    if (this.state.department.departmentTitle === '') {
      this.props.dispatch(showError('Please fill correctly'));
    } else {
      callApi('/newDepartment', this.state.department, 'POST')
        .then(data => {
          this.props.dispatch(showInfo('Successfully Added!!!'));
          this.getDepartment();
        })
        .catch(err => this.props.dispatch(showError('Error')));
    }
  }

  getDepartment() {
    callApi('/getDepartments')
      .then(data => {
        this.setState({
          data: {
            searchResults: data,
            searching: false,
          },
        });
      })
      .catch(err => this.props.dispatch(showError('Error fetching departments')));
  }

  componentWillMount() {
    this.getDepartment();
  }

  select(data) {
    this.setState({
      department: {
        ...data,
      },
    });
  }

  handleInputChange(e) {
    let { name, value } = e.target;
    this.setState({
      department: {
        ...this.state.department,
        [name]: value,
      },
    });
  }

  render() {
    return (
      <div className="animated fadeIn container">
        <Card>
          <CardBlock>
            <Row>
              <Col xs="12" md="6">
                <Card>
                  <CardHeader>Add Department</CardHeader>
                  <CardBlock>
                    <FormGroup>
                      <Label>Department Title</Label>
                      <Input
                        type="text"
                        name="departmentTitle"
                        value={this.state.department.departmentTitle}
                        onChange={e => this.handleInputChange(e)}
                      />
                    </FormGroup>
                    <Button onClick={() => this.addDepartment()}>
                      {this.state.department._id ? 'Update' : 'Save'}
                    </Button>
                  </CardBlock>
                </Card>
              </Col>
              <Col xs="12" md="6">
                <DepartmentList data={this.state.data} select={data => this.select(data)} />
              </Col>
            </Row>
          </CardBlock>
        </Card>
      </div>
    );
  }
}

export default connect()(Department);
