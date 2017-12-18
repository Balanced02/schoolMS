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
import EmployeeList from '../../views/EmployeeList';
import StudentList from '../../views/StudentList';
import Department from '../../views/Department';
import Course from '../../views/Course';
import Visitor from '../../views/Visitors';
import AddEmployee from '../../views/AddEmployee';
import NewIntake from '../../views/NewIntake';
import Leave from '../../views/LeaveApproval';
import LeaveApplication from '../../views/LeaveAplication';
import LeaveCategory from '../../views/LeaveCategory';
import AddDesignation from '../../views/AddDesignation';
import payHead from '../../views/PayHead';
import studentGatePass from '../../views/StudentGatePass';
import SDashboard from '../../views/SDashboard';
import InstitutionDetails from '../../views/InstitutionDetails';
import LibraryCategory from '../../views/LibraryCategory';
import ViewSchools from '../../views/ViewSchools';
import Profile from '../../views/Profile';
import CourseMaterial from '../../components/CourseMaterial.js';
import StudentCategory from '../../views/StudentCategory';
import AcademicYear from '../../views/AcademicYear';
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
                  <Route path="/employeeList" name="EmployeeList" component={EmployeeList} />
                  <Route path="/studentList" name="Student List" component={StudentList} />
                  <Route path="/studentGatePass" name="Student Pass" component={studentGatePass} />
                  <Route path="/department" name="Department" component={Department} />
                  <Route path="/visitors" name="Department" component={Visitor} />
                  <Route path="/addCourse" name="Course" component={Course} />
                  <Route path="/addEmployee" name="Add Employee" component={AddEmployee} />
                  <Route
                    path="/courseMaterials"
                    name="Course Materials"
                    component={CourseMaterial}
                  />
                  <Route path="/newIntake" name="New Intake" component={NewIntake} />
                  <Route path="/leaveApprovals" name="Leave Approvals" component={Leave} />
                  <Route path="/leaveCategory" name="Leave Category" component={LeaveCategory} />
                  <Route path="/addDesignation" name="Add Designation" component={AddDesignation} />
                  <Route path="/academicYear" name="Academic Year" component={AcademicYear} />
                  <Route path="/payHead" name="Pay Head" component={payHead} />
                  <Route
                    path="/studentCategory"
                    name="Student Category"
                    component={StudentCategory}
                  />
                  <Route path="/profile" name="Profile" component={Profile} />
                  <Route
                    path="/libraryCategory"
                    name="Library Category"
                    component={LibraryCategory}
                  />
                  <Route
                    path="/leaveApplication"
                    name="Leave Application"
                    component={LeaveApplication}
                  />
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
                  <Route path="/studentList" name="Student List" component={StudentList} />
                  <Route path="/profile" name="Profile" component={Profile} />
                  <Route path="/visitors" name="Department" component={Visitor} />
                  <Route
                    path="/leaveApplication"
                    name="Leave Application"
                    component={LeaveApplication}
                  />
                  <Redirect from="/" to="/dashboard" />
                </Switch>
              </Container>
            </main>
            <Aside />
          </div>
          <Footer />
        </div>
      ) : this.state.user.userType === 'super' ? (
        <div className="app">
          <Header user={this.state.user} />
          <div className="app-body">
            <Sidebar {...this.props} />
            <main className="main">
              <Breadcrumb />
              <Container fluid>
                <Switch>
                  <Route path="/dashboard" name="Dashboard" component={SDashboard} />
                  <Route path="/addSchool" name="Add School" component={InstitutionDetails} />
                  <Route path="/viewSchools" name="School Lists" component={ViewSchools} />
                  <Route path="/profile" name="Profile" component={Profile} />
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
