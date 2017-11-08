import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Container,
  Row,
  Col,
  Card,
  CardBlock,
  CardFooter,
  Button,
  Input,
  InputGroup,
  InputGroupAddon,
} from 'reactstrap';

import { startRegister } from '../../../actions/auth';
import { showError } from '../../../actions/feedback';

class Register extends Component {
  constructor() {
    super();
    this.state = {
      fullName: '',
      username: '',
      phoneNumber: '',
      password: '',
      cpassword: '',
    };
  }
  render() {
    let { fullName, username, phoneNumber, password, cpassword } = this.state;
    let { dispatch, loading } = this.props;
    const changeInput = (e, input) => {
      let obj = {};
      obj[input] = e.target.value;
      this.setState(obj);
      // console.log(this.state[input]);
    };
    const register = () => {
      if (fullName && username && phoneNumber && password && cpassword) {
        if (password !== cpassword) {
          dispatch(showError('Passwords do not Match!'));
          return;
        }
        dispatch(
          startRegister({
            fullName,
            username,
            phoneNumber,
            password,
          })
        );
      } else {
        dispatch(showError('Kindly provide value for all Inputs!'));
      }
    };
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="6">
              <Card className="mx-4">
                <CardBlock className="card-body p-4">
                  <h1>Register</h1>
                  <p className="text-muted">Create your account</p>
                  <InputGroup className="mb-3">
                    <InputGroupAddon>
                      <i className="icon-user" />
                    </InputGroupAddon>
                    <Input
                      type="text"
                      placeholder="Username"
                      value={username}
                      onChange={e => changeInput(e, 'username')}
                    />
                  </InputGroup>
                  <InputGroup className="mb-3">
                    <InputGroupAddon>
                      <i className="icon-user" />
                    </InputGroupAddon>
                    <Input
                      type="text"
                      placeholder="Full Name"
                      value={fullName}
                      onChange={e => changeInput(e, 'fullName')}
                    />
                  </InputGroup>
                  <InputGroup className="mb-3">
                    <InputGroupAddon>
                      <i className="icon-phone" />
                    </InputGroupAddon>
                    <Input
                      type="text"
                      placeholder="Phone Number"
                      value={phoneNumber}
                      onChange={e => changeInput(e, 'phoneNumber')}
                    />
                  </InputGroup>
                  <InputGroup className="mb-3">
                    <InputGroupAddon>
                      <i className="icon-lock" />
                    </InputGroupAddon>
                    <Input
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={e => changeInput(e, 'password')}
                    />
                  </InputGroup>
                  <InputGroup className="mb-4">
                    <InputGroupAddon>
                      <i className="icon-lock" />
                    </InputGroupAddon>
                    <Input
                      type="password"
                      placeholder="Repeat password"
                      value={cpassword}
                      onChange={e => changeInput(e, 'cpassword')}
                    />
                  </InputGroup>
                  <Button onClick={register} color="success" block>
                    {loading ? <i className="fa fa-2x fa-spinner fa-spin" /> : <i />}
                    Create Account
                  </Button>
                </CardBlock>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.feedback.loadin,
  };
};

export default connect(mapStateToProps)(Register);
