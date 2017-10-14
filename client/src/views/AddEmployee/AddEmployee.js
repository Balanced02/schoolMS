import React, { Component } from 'react';
import { Form, FormGroup, Label, Input, Col, Card, Button } from 'reactstrap';
import { connect } from 'react-redux';
import { callApi } from '../../utils';
import { showError, showInfo } from '../../actions/feedback';

class Employee extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullName: '',
      username: '',
      email: '',
      userType: '',
      address: '',
      password: '',
      phoneNumber: '',
      password2: '',
      dob: '',
      gender: '',
    };
  }

  componentWillMount() {
    this.initialState = this.state;
  }

  handleInputchange(e) {
    let name = e.target.name;
    let value = e.target.value;
    this.setState({
      [name]: value,
    });
  }

  addNewStaff() {
    let filled = Object.values(this.state).every(val => val !== '');
    if (filled) {
      if (this.state.password !== this.state.password2) {
        this.props.dispatch(showError('Passwords do not match'));
        return;
      } else {
        callApi('/auth/register', { ...this.state }, 'POST')
          .then(staff => {
            this.props.dispatch(showInfo('Created Successfully'));
            this.setState(this.initialState);
          })
          .catch(err => this.props.dispatch(showError(err)));
      }
    }
    filled
      ? this.props.dispatch(showInfo('Good to go'))
      : this.props.dispatch(showError('Kindly Fill correctly'));
  }

  render() {
    return (
      <div className="container">
        <Card className="container" style={{ padding: 10 }}>
          <Form>
            <FormGroup row>
              <Label md={2}>Full Name</Label>
              <Col>
                <Input
                  type="text"
                  name="fullName"
                  placeholder="Full Name"
                  value={this.state.fullName}
                  onChange={e => this.handleInputchange(e)}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label md={2}>Username</Label>
              <Col md={4}>
                <Input
                  type="text"
                  name="username"
                  placeholder="Username"
                  value={this.state.username}
                  onChange={e => this.handleInputchange(e)}
                />
              </Col>
              <Label md={2}>E-mail</Label>
              <Col md={4}>
                <Input
                  type="email"
                  name="email"
                  value={this.state.email}
                  placeholder="E-mail"
                  onChange={e => this.handleInputchange(e)}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label md={2}>Password</Label>
              <Col md={4}>
                <Input
                  type="password"
                  name="password"
                  value={this.state.password}
                  placeholder="password"
                  onChange={e => this.handleInputchange(e)}
                />
              </Col>
              <Label md={2}>Re-type Password</Label>
              <Col md={4}>
                <Input
                  type="password"
                  name="password2"
                  value={this.state.password2}
                  placeholder="Re-type Password"
                  onChange={e => this.handleInputchange(e)}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label xs={12} md={2}>
                Date of Birth
              </Label>
              <Col xs={12} md={4}>
                <Input
                  type="date"
                  name="dob"
                  value={this.state.dob}
                  placeholder="date placeholder"
                  onChange={e => this.handleInputchange(e)}
                />
              </Col>
              <Label md={2}>Phone Number:</Label>
              <Col xs={12} md={4}>
                <Input
                  type="text"
                  name="phoneNumber"
                  value={this.state.phoneNumber}
                  placeholder="Phone Number"
                  onChange={e => this.handleInputchange(e)}
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label md={2}>User Type</Label>
              <Col md={4}>
                <Input type="select" name="userType" onChange={e => this.handleInputchange(e)}>
                  <option selected disabled>
                    {' '}
                    Select one{' '}
                  </option>
                  <option value="admin"> Admin </option>
                  <option value="teacher"> Teacher </option>
                  <option value="student"> Student </option>
                  <option value="libarian"> Libarian </option>
                  <option value="non-teaching"> Non-Teaching Staff </option>
                </Input>
              </Col>
              <Label md={2}>Gender</Label>
              <Col md={4}>
                <Input type="select" name="gender" onChange={e => this.handleInputchange(e)}>
                  <option value="1" disabled selected>
                    Gender
                  </option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </Input>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label md={2}>Address</Label>
              <Col md={10}>
                <Input
                  type="textarea"
                  value={this.state.address}
                  name="address"
                  placeholder="Address"
                  onChange={e => this.handleInputchange(e)}
                />
              </Col>
            </FormGroup>
          </Form>
          <Button onClick={() => this.addNewStaff()}>New Staff</Button>
        </Card>
      </div>
    );
  }
}

export default connect()(Employee);
