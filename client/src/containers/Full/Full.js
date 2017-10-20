import React, { Component } from 'react';
import { Link, Switch, Route, Redirect } from 'react-router-dom';
import { Container } from 'reactstrap';
import { connect } from 'react-redux';

import Header from '../../components/Header/';
import Sidebar from '../../components/Sidebar/';
import Breadcrumb from '../../components/Breadcrumb/';
import Aside from '../../components/Aside/';
import Footer from '../../components/Footer/';
import PageLoading from '../../components/PageLoading';

import { callApi } from '../../utils';
import { login, logout } from '../../actions/auth';

import Dashboard from '../../views/Dashboard';
import TeacherDashboard from '../../views/TeacherDashboard';
import Staff from '../../views/Staff';
import Department from '../../views/Department';
import Course from '../../views/Course';
import Visitor from '../../views/Visitors';
import AddEmployee from '../../views/AddEmployee';
import NewIntake from '../../views/NewIntake';

class Full extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ready: this.props.authenticated,
      redirect: false,
      user: this.props.user,
    };
  }

  componentWillMount() {
    if (!this.props.authenticated) {
      callApi('/me')
        .then(response => {
          if (response.authenticated) {
            this.props.dispatch(login(response.user));
            this.setState({
              ready: true,
              redirect: false,
              user: response.user,
            });
          } else {
            this.setState({ redirect: true });
          }
        })
        .catch(err => {
          this.setState({ redirect: false });
        });
    } else {
      this.setState({ ready: true, user: this.props.user._doc });
    }
  }

  render() {
    return this.state.ready ? (
      this.state.user.userType === 'admin' ? (
        <div className="app">
          <Header user={this.state.user} />
          <div className="app-body">
            <Sidebar {...this.props} />
            <main className="main">
              <Breadcrumb />
              <Container fluid>
                <Switch>
                  <Route path="/dashboard" name="Dashboard" component={Dashboard} />
                  <Route path="/staff" name="Staff" component={Staff} />
                  <Route path="/department" name="Department" component={Department} />
                  <Route path="/visitors" name="Department" component={Visitor} />
                  <Route path="/addCourse" name="Course" component={Course} />
                  <Route path="/addEmployee" name="Add Employee" component={AddEmployee} />
                  <Route path="/newIntake" name="New Intake" component={NewIntake} />
                  <Redirect from="/" to="/dashboard" />
                </Switch>
              </Container>
            </main>
            <Aside />
          </div>
          <Footer />
        </div>
      ) : this.state.user.userType === 'teacher' ? (
        <div className="app">
          <Header user={this.state.user} />
          <div className="app-body">
            <Sidebar {...this.props} />
            <main className="main">
              <Breadcrumb />
              <Container fluid>
                <Switch>
                  <Route path="/dashboard" name="Dashboard" component={TeacherDashboard} />
                  <Redirect from="/" to="/dashboard" />
                </Switch>
              </Container>
            </main>
            <Aside />
          </div>
          <Footer />
        </div>
      ) : (
        <i />
      )
    ) : !this.state.redirect ? (
      <PageLoading />
    ) : (
      <Redirect to="/login" />
    );
  }
}

const mapStateToProps = state => {
  return {
    authenticated: state.auth.authenticated,
    user: state.auth.user || {},
  };
};

export default connect(mapStateToProps)(Full);
