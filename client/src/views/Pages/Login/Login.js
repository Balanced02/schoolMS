import React, { Component } from 'react';
import {
  Container,
  Row,
  Col,
  CardGroup,
  Card,
  CardBlock,
  Button,
  Input,
  InputGroup,
  InputGroupAddon,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { startLogin } from '../../../actions/auth';
import { showError, showInfo, startLoading, stopLoading } from '../../../actions/feedback';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
    };
  }

  render() {
    let { username, password } = this.state;
    let { dispatch, loading, history } = this.props;
    const login = () => {
      if (username && password) {
        console.log('Logging in');
        dispatch(startLogin({ username, password }));
        dispatch(showInfo('Logging you in...'))
      } else {
        dispatch(showError('Please provide your Username and Password'));
      }
    };

    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup className="mb-0">
                <Card className="p-4">
                  <CardBlock className="card-body">
                    <h1>Login</h1>
                    <p className="text-muted">Sign In to your account</p>
                    <InputGroup className="mb-3">
                      <InputGroupAddon>
                        <i className="icon-user" />
                      </InputGroupAddon>
                      <Input
                        type="text"
                        placeholder="Username"
                        onChange={e => this.setState({ username: e.target.value })}
                      />
                    </InputGroup>
                    <InputGroup className="mb-4">
                      <InputGroupAddon>
                        <i className="icon-lock" />
                      </InputGroupAddon>
                      <Input
                        type="password"
                        placeholder="Password"
                        onChange={e => this.setState({ password: e.target.value })}
                      />
                    </InputGroup>
                    <Row>
                      <Col xs="6">
                        <Button onClick={login} color="primary" className="px-4">
                          Login {loading ? <i className="fa fa-2x fa-spinner fa-spin" /> : <i />}
                        </Button>
                      </Col>
                    </Row>
                  </CardBlock>
                </Card>
                <Card
                  className="text-white bg-primary py-5 d-md-down-none"
                  style={{ width: 44 + '%' }}
                >
                  <CardBlock className="card-body text-center">
                    <div>
                      <h4>School Management System</h4>
                      <h5> - schms</h5>
                      <p>Full School Management System</p>
                      <Link to="/register">
                        <Button color="primary" className="mt-3" active>
                          Contact Us
                        </Button>
                      </Link>
                    </div>
                  </CardBlock>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.feedback.loading,
  };
};

export default connect(mapStateToProps)(Login);
